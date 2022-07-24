import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/Authentication/RequireAuth";
import Home from "../Pages/Home";
import Chats from "../Pages/Chats";
import styled from "@emotion/styled";
import BackgroundImage from "../assets/images/background.png";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${BackgroundImage});
  background-position: center;
  background-size: cover;
`;

const App = () => {
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
