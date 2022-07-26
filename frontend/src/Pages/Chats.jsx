import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserList, reset } from "../features/userSlice";
import { addEditChat, getChats, setSelectedChat } from "../features/chatSlice";
import AppBar from "../components/Layout/AppBar";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../components/Layout/SideDrawer";
import ChatList from "../components/Chats/ChatList";
import ChatMessages from "../components/Chats/ChatMessages";

const Chats = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, []);

  const searchHandler = ({ search }) => {
    dispatch(getUserList(search));
  };

  const addEditChatHandler = (chatData) => {
    const userIds = chatData.users.map((user) => user._id);
    chatData = { ...chatData, users: userIds };
    dispatch(addEditChat(chatData));
    onClose();
  };

  const onCloseHandler = () => {
    dispatch(reset());
    onClose();
  };

  const selectChatHandler = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return (
    <>
      <SideDrawer isOpen={isOpen} onClose={onCloseHandler} onSearch={searchHandler} onChatSelect={addEditChatHandler} />
      <AppBar onOpen={onOpen}>
        <ChatList onSelect={selectChatHandler} onGroupCreate={addEditChatHandler} onSearch={searchHandler} />
        <ChatMessages />
      </AppBar>
    </>
  );
};

export default Chats;
