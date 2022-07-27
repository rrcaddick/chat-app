import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, reset as resetUsers } from "../features/userSlice";
import { addEditChat, deleteLeaveChat, getChats, setSelectedChat } from "../features/chatSlice";
import { getMessages, addMessage } from "../features/messageSlice";
import AppBar from "../components/Layout/AppBar";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../components/Layout/SideDrawer";
import ChatList from "../components/Chats/ChatList";
import ChatMessages from "../components/Chats/ChatMessages";

const Chats = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {}, []);

  const searchHandler = ({ search }) => {
    dispatch(getUserList(search));
  };

  const addEditChatHandler = (chatData) => {
    const userIds = chatData.users.map((u) => u._id);
    chatData = { ...chatData, users: userIds };
    dispatch(addEditChat(chatData));
    dispatch(resetUsers());
    onClose();
  };

  const deleteLeaveChatHandler = () => {
    const userIds = selectedChat.users.map((u) => u._id).filter((u) => u !== user._id);
    const data = { id: selectedChat._id, chatData: { users: userIds, isGroupChat: selectedChat.isGroupChat } };
    dispatch(deleteLeaveChat(data));
    dispatch(resetUsers());
    onClose();
  };

  const onCloseHandler = () => {
    dispatch(resetUsers());
    onClose();
  };

  const selectChatHandler = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  const sendMessageHandler = ({ message }) => {
    const messageData = { chatId: selectedChat._id, content: message };
    dispatch(addMessage(messageData));
  };

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    if (selectedChat) dispatch(getMessages(selectedChat._id));
  }, [dispatch, selectedChat]);

  return (
    <>
      <SideDrawer
        isOpen={isOpen}
        onClose={onCloseHandler}
        onSearch={searchHandler}
        onAddEditChat={addEditChatHandler}
      />
      <AppBar onOpen={onOpen}>
        <ChatList onSelect={selectChatHandler} onAddEditGroup={addEditChatHandler} onSearch={searchHandler} />
        <ChatMessages
          onSearch={searchHandler}
          onAddEditGroup={addEditChatHandler}
          onDeleteLeaveChat={deleteLeaveChatHandler}
          onSendMessage={sendMessageHandler}
        />
      </AppBar>
    </>
  );
};

export default Chats;
