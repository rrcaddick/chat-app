import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChats } from "../features/chatSlice";

const Chats = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((store) => store.chat);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return <div>{chats}</div>;
};

export default Chats;
