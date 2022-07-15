import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./App/store";
import { initAxiosInterceptors } from "./Services/Adapters/tokenInterceptor";

initAxiosInterceptors(store);

const theme = extendTheme({
  styles: {
    global: (props) => ({
      html: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontSize: "62.5%",
      },
      body: {
        fontSize: "1.6rem",
        fontFamily: "work sans",
      },
      a: {
        textDecoration: "none",
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
