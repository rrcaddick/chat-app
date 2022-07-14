import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatAdapter from "../Services/Adapters/chatAdapter";

const initialState = {
  chats: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: {},
  message: "",
};

export const getChats = createAsyncThunk("chat/getsChats", async (_, thunkAPI) => {
  try {
    return await chatAdapter.getChats();
  } catch (error) {
    const data = error?.response?.data;
    thunkAPI.rejectWithValue(data);
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = payload?.chats || [];
      })
      .addCase(getChats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = chatSlice.actions;

export default chatSlice.reducer;
