import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAdapter from "../Services/Adapters/authAdapter";
import tokenRequest from "../Services/Adapters/tokenInterceptor";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  isSuccess: {
    login: false,
    register: false,
    logout: false,
  },
  isError: {
    login: false,
    register: false,
  },
  validationErrors: null,
  message: "",
};

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    return await authAdapter.registerUser(userData);
  } catch (error) {
    const data = error?.response?.data;
    return thunkAPI.rejectWithValue(data);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    return await tokenRequest.loginUser(userData);
  } catch (error) {
    const message = error?.response?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    return await tokenRequest.logoutUser();
  } catch (error) {
    const message = error?.response?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: {
          login: false,
          register: false,
          logout: false,
        },
        isError: {
          login: false,
          register: false,
        },
        validationErrors: null,
        message: "",
      };
    },
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
        state.message = payload.message;
        state.validationErrors = payload?.validationErrors || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload: { name, email, profilePicture } }) => {
        state.isLoading = false;
        state.isSuccess.login = true;
        state.user = { name, email, profilePicture };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError.login = true;
        state.message = payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess.logout = true;
        state.user = null;
        state.isLoading = false;
        state.isSuccess = {
          login: false,
          register: false,
          logout: false,
        };
        state.isError = {
          login: false,
          register: false,
        };
        state.validationErrors = null;
        state.message = "";
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
