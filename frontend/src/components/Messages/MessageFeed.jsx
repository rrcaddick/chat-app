import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import Message from "./Message";

const MessageFeed = () => {
  const { user } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.message);

  const senderIsUser = (message) => {
    if (!message) return;
    return message.sender._id === user._id;
  };

  const displayAvatar = (currMessage, i) => {
    return messages[i + 1]?.sender._id !== currMessage.sender._id && currMessage.sender._id !== user._id;
  };

  const displaySender = (currMessage, i) => {
    if (i === 0 && currMessage.sender._id !== user._id) return true;
    return messages[i - 1]?.sender._id !== currMessage.sender._id && currMessage.sender._id !== user._id;
  };

  const displayDate = (currMessage, i) => {
    return (
      i === 0 || new Date(messages[i - 1].createdAt).toDateString() !== new Date(currMessage.createdAt).toDateString()
    );
  };

  const dateString = (date) => {
    const dateObj = new Date(date);
    if (dateObj.toDateString() === new Date().toDateString()) return "Today";
    return new Date(date).toLocaleDateString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <ScrollableFeed>
      {messages.map((message, i) => (
        <Box key={message._id} display="flex" flexDir="column">
          {displayDate(message, i) && (
            <Box display="flex" justifyContent="center" my={2}>
              <Text bg="#24232396" color="white" px={2} py={0.5} fontSize="11px" borderRadius="md">
                {dateString(message.createdAt)}
              </Text>
            </Box>
          )}
          <Message
            message={message}
            displayAvatar={displayAvatar(message, i)}
            displaySender={displaySender(message, i)}
            senderIsUser={senderIsUser(message)}
          />
        </Box>
      ))}
    </ScrollableFeed>
  );
};

export default MessageFeed;
