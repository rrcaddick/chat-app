import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";

const Message = ({ message, senderIsUser, displayAvatar, displaySender }) => {
  return (
    <Box display="flex" justifyContent={senderIsUser ? "flex-end" : "flex-start"} alignItems="center" flexShrink={1}>
      <Tooltip label={message.sender.name}>
        <Avatar
          src={message.sender.profilePicture}
          name={message.sender.name}
          size="sm"
          visibility={!displayAvatar ? "hidden" : "visible"}
          mr={2}
        />
      </Tooltip>

      <Box
        display="flex"
        flexDir={senderIsUser ? "column" : "row"}
        bg={senderIsUser ? "#b9f5d0" : "#bee3f7"}
        borderRadius={10}
        py={1}
        px={15}
      >
        <Box mr={senderIsUser ? 0 : 2} gap={1}>
          {displaySender && (
            <Text fontWeight="bold" fontSize="12px" color="orange.400">
              {message.sender.name}
            </Text>
          )}
          <Text whiteSpace="pre-wrap">{message.content}</Text>
        </Box>
        <Text alignSelf="flex-end" fontSize="10px" flexShrink="0">
          {new Date(message.createdAt)
            .toLocaleDateString("default", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .slice(-8)}
        </Text>
      </Box>
    </Box>
  );
};

export default Message;
