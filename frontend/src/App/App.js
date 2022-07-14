import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Chats from "../Pages/Chats";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </>
  );
};

export default App;
