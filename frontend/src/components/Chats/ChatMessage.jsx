import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedChat } from "../../features/chatSlice";
import AddUpdateGroupChatModal from "../Modals/AddUpdateGroupChatModal";
import ProfileModal from "../Modals/ProfileModal";

const ChatMessage = ({ onSearch, onAddEditGroup }) => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  const clearSelectedChatHandler = () => {
    dispatch(clearSelectedChat());
  };

  if (!selectedChat)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
        <Text fontSize="3xl" pb={3}>
          Click on a user to start chatting
        </Text>
      </Box>
    );

  return (
    <>
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" pb={3} px={2}>
        <IconButton
          display={{ base: "block", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={clearSelectedChatHandler}
        />
        <Text fontSize={{ base: "28px", md: "30px" }}>{selectedChat.chatName}</Text>
        {selectedChat.isGroupChat ? (
          <AddUpdateGroupChatModal groupData={selectedChat} onSearch={onSearch} onAddEditGroup={onAddEditGroup} />
        ) : (
          <ProfileModal {...selectedChat.users.find((u) => u._id !== user._id)} />
        )}
      </Box>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        Messages
      </Box>
    </>
  );
};

export default ChatMessage;
