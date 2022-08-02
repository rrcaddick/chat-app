import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageAdapter from "../Services/Adapters/messageAdapter";

const initialState = {
  messages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const apiHelper = async (data = undefined, apiFunction, thunkAPI) => {
  try {
    return await apiFunction(data);
  } catch (error) {
    const data = error?.response?.data;
    return thunkAPI.rejectWithValue(data);
  }
};

export const getMessages = createAsyncThunk("message/getMessages", async (chatId, thunkAPI) => {
  return await apiHelper(chatId, messageAdapter.getMessages, thunkAPI);
});

export const addMessage = createAsyncThunk("message/addMessage", async (messageData, thunkAPI) => {
  return await apiHelper(messageData, messageAdapter.addMessage, thunkAPI);
});

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: (state) => initialState,
    addReceivedMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = payload?.messages || [];
      })
      .addCase(getMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addMessage.pending, (state) => {})
      .addCase(addMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages.push(payload.latestMessage);
      })
      .addCase(addMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, addReceivedMessage } = messageSlice.actions;

export default messageSlice.reducer;
