import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./App/store";
import { initAxiosInterceptors } from "./Services/Adapters/tokenInterceptor";
import { connectSocket } from "./Services/Socket/connectSocket";

connectSocket();
initAxiosInterceptors(store);
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
