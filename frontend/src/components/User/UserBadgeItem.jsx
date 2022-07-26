import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const UserBadgeItem = ({ name, email, onSelect }) => {
  return (
    <Box px={2} py={1} borderRadius="lg" m={1} mb={2} variant="solid" fontSize={12} background="purple" color="white">
      {name}
      <CloseIcon cursor="pointer" pl={1} onClick={onSelect} />
    </Box>
  );
};

export default UserBadgeItem;
