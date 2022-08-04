import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";

const Message = ({ message, senderIsUser, displayAvatar, displaySender }) => {
  return (
    <Box
      display="flex"
      justifyContent={senderIsUser ? "flex-end" : "flex-start"}
      marginRight={senderIsUser ? 0 : 2}
      marginLeft={senderIsUser ? 2 : 0}
      alignItems="center"
      flexShrink={1}
    >
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
        borderTopRightRadius={senderIsUser ? "0" : "10"}
        borderTopLeftRadius={senderIsUser ? "10" : "0"}
        py={1}
        px={15}
        mr="10px"
        position="relative"
        sx={{
          _before: {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderWidth: "5px",
            borderColor: senderIsUser ? "#b9f5d0" : "#bee3f7",
            borderBottomColor: "transparent",
            borderLeftColor: !senderIsUser && "transparent",
            borderRightColor: senderIsUser && "transparent",
            left: !senderIsUser && "0",
            right: senderIsUser && "0",
            top: "0",
            transform: senderIsUser ? "translateX(100%)" : "translateX(-100%)",
          },
        }}
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
