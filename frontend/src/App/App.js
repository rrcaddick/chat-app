import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/Authentication/RequireAuth";
import Home from "../Pages/Home";
import Chats from "../Pages/Chats";
import styled from "@emotion/styled";
import BackgroundImage from "../assets/images/background.png";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${BackgroundImage});
  background-position: center;
  background-size: cover;
  flex-grow: 1;
  overflow: hidden;
`;

const App = () => {
  const dispatch = useDispatch();

  // Set up socket listeners
  useEffect(() => {
    dispatch({ type: "CHAT_SOCKET_CONNECT" });
    return () => {
      dispatch({ type: "CHAT_SOCKET_DISCONNECT" });
    };
  }, [dispatch]);

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/chats"
          element={
            <RequireAuth>
              <Chats />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </AppContainer>
  );
};

export default App;
