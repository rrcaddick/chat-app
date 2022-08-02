import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import messageReducer from "../features/messageSlice";
import chatMiddleware from "../Middleware/chatMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware]);
  },
});

export default store;
