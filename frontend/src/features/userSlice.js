import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAdapter from "../Services/Adapters/userAdapter";

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUserList = createAsyncThunk("user/getUserList", async (search, thunkAPI) => {
  try {
    return await userAdapter.getUserList(search);
  } catch (error) {
    const message = error?.response?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, { payload: { users } }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.users = users;
      })
      .addCase(getUserList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
