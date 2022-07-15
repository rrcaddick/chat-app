import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAdapter from "../Services/Adapters/authAdapter";

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: { login: false, register: false, logout: false },
  isError: false,
  errors: {},
  message: "",
};

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    return await authAdapter.registerUser(userData);
  } catch (error) {
    const data = error?.response?.data;
    thunkAPI.rejectWithValue(data);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    return await authAdapter.loginUser(userData);
  } catch (error) {
    const data = error?.response?.data;
    thunkAPI.rejectWithValue(data);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    return await authAdapter.logoutUser();
  } catch (error) {
    const data = error?.response?.data;
    thunkAPI.rejectWithValue(data);
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
  try {
    return await authAdapter.refreshToken();
  } catch (error) {
    const data = error?.response?.data;
    thunkAPI.rejectWithValue(data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess.register = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess.login = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess.logout = true;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess.register = true;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
