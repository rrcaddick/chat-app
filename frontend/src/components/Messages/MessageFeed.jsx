import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Scrollable from "react-scrollable-feed";
import Message from "./Message";
import Lottie from "lottie-react";
import TypingAnimation from "../../assets/Animations/typing-indicator.json";
import styled from "@emotion/styled";

const TypingIndicator = styled(Lottie)`
  height: 50%;
`;

const ScrollableFeed = styled(Scrollable)`
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00808071;
    border-radius: 20px;
  }
`;

const MessageFeed = () => {
  const { user } = useSelector((store) => store.auth);
  const { messages, chatIsTyping, typingUser } = useSelector((store) => store.message);

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
      {chatIsTyping && (
        <>
          <Box display="flex" justifyContent="flex-start" my={0.5} alignItems="center">
            <Tooltip label={typingUser.name}>
              <Avatar src={typingUser.profilePicture} name={typingUser.name} size="sm" mr={2} />
            </Tooltip>
            <TypingIndicator animationData={TypingAnimation} loop={true} />
          </Box>
        </>
      )}
    </ScrollableFeed>
  );
};

export default MessageFeed;
