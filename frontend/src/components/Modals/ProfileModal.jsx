import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const ProfileModal = ({ name, profilePicture, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text width="100%" height="100%" onClick={onOpen}>
        Profile
      </Text>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" gap={5} py={2}>
          <ModalHeader fontSize="35px">{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" flexDir="column">
            <Image borderRadius="full" boxSize="200px" src={profilePicture} alt={name} />
          </ModalBody>
          <Text fontSize="20px">Email: {email}</Text>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfileModal;
