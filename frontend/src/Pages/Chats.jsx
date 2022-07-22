import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChats } from "../features/chatSlice";
import { Button } from "@chakra-ui/react";
import { logoutUser } from "../features/authSlice";

const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { chats } = useSelector((store) => store.chat);
  const {
    isSuccess: { logout: logoutSuccess },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getChats());

    if (logoutSuccess) {
      navigate("/");
    }
  }, [dispatch, logoutSuccess, navigate]);

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Navigate
      </Button>
      <Button
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Chats;
