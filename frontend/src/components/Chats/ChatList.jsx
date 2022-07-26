import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AddGroupChatModal from "../Modals/AddGroupChatModal";

const ChatList = ({ onSelect, onGroupCreate, onSearch }) => {
  const { chats, selectedChat, isLoading } = useSelector((store) => store.chat);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      width={{ base: "100%", md: "35%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "18px", md: "24px" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        My Chats
        <AddGroupChatModal onGroupCreate={onGroupCreate} onSearch={onSearch} />
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {isLoading && <Spinner alignSelf="center" size="lg" />}

        <Stack
          overflowY="scroll"
          sx={{
            "::-webkit-scrollbar": { width: "0px" },
            "::-webkit-scrollbar-thumb": { background: "rgba(136, 136, 136, 0.281)" },
            "::-webkit-scrollbar-thumb:hover": { background: "#555" },
          }}
        >
          {!isLoading &&
            chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => {
                  onSelect(chat);
                }}
                cursor="pointer"
                bg={selectedChat._id === chat._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat._id === chat._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>{chat.chatName}</Text>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatList;
