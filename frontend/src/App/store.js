import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
});

export default store;
