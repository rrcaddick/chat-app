import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatMessages = ({ onSearch, onAddEditGroup, onDeleteLeaveChat, onSendMessage }) => {
  const { selectedChat } = useSelector((store) => store.chat);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      flex={{ base: "1", md: "6.5" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <ChatMessage
        {...selectedChat}
        onSearch={onSearch}
        onAddEditGroup={onAddEditGroup}
        onDeleteLeaveChat={onDeleteLeaveChat}
        onSendMessage={onSendMessage}
      />
    </Box>
  );
};

export default ChatMessages;
