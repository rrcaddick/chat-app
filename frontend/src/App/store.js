import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
