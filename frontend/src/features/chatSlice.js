import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatAdapter from "../Services/Adapters/chatAdapter";

const initialState = {
  chats: [],
  selectedChat: null,
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

export const addEditChat = createAsyncThunk("chat/addEditChat", async (chatData, thunkAPI) => {
  try {
    return await chatAdapter.addEditChat(chatData);
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
    setSelectedChat: (state, { payload }) => {
      state.selectedChat = payload;
    },
    clearSelectedChat: (state) => {
      state.selectedChat = null;
    },
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
      })
      .addCase(addEditChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEditChat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedChat = payload?.chat || [];
        state.chats = state.chats.filter((chat) => chat._id !== payload.chat._id);
        state.chats = [payload.chat, ...state.chats];
      })
      .addCase(addEditChat.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, setSelectedChat, clearSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
