import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ _id, name, profilePicture, email, onChatSelect }) => {
  return (
    <Box
      onClick={() => {
        onChatSelect(_id);
      }}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      width="100%"
      display="flex"
      gap={4}
      alignItems="center"
      color="black"
      px={3}
      py={2}
      borderRadius="lg"
    >
      <Avatar size="sm" name={name} src={profilePicture} />
      <Box>
        <Text>{name}</Text>
        <Text fontSize="xs">
          <strong>Email: </strong>
          {email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
