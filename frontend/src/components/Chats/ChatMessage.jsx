import { ArrowBackIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { clearSelectedChat } from "../../features/chatSlice";
import { toggleUserIsTyping } from "../../features/messageSlice";
import AddUpdateGroupChatModal from "../Modals/AddUpdateGroupChatModal";
import ProfileModal from "../Modals/ProfileModal";
import MessageFeed from "../Messages/MessageFeed";
import { useDebounce } from "../../Hooks/useDebounce";

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
  gap: 1rem;
`;

const ChatMessage = ({ onSearch, onAddEditGroup, onDeleteLeaveChat, onSendMessage }) => {
  const dispatch = useDispatch();
  const { debounce, cancelDebounce } = useDebounce();
  const { selectedChat } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const { isLoading, userIsTyping } = useSelector((store) => store.message);

  const messageRef = useRef();

  const clearSelectedChatHandler = () => {
    dispatch(clearSelectedChat());
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const messageData = { message: messageRef.current.value };
    cancelDebounce({ executeDebounceFn: true });
    onSendMessage(messageData);
    messageRef.current.value = "";
  };

  console.log("Rendered");

  const typingHandler = () => {
    if (!userIsTyping) dispatch(toggleUserIsTyping(true));
    debounce(() => {
      dispatch(toggleUserIsTyping(true));
    }, 1500);
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
          <AddUpdateGroupChatModal
            groupData={selectedChat}
            onSearch={onSearch}
            onAddEditGroup={onAddEditGroup}
            onDeleteLeaveChat={onDeleteLeaveChat}
          />
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
        {isLoading && <Spinner size="xl" borderWidth="5px" w={20} h={20} m="auto" alignSelf="center" />}
        {!isLoading && (
          <Box>
            <MessageFeed />
          </Box>
        )}
        <MessageForm onSubmit={sendMessageHandler} noValidate>
          <FormControl>
            <InputGroup border="teal">
              <Input
                ref={messageRef}
                bg="white"
                px={3}
                py={6}
                placeholder="Send a message..."
                onChange={typingHandler}
              />
              <InputRightElement h="full" w="auto">
                <Button
                  h="full"
                  type="submit"
                  leftIcon={<EmailIcon />}
                  colorScheme="teal"
                  variant="solid"
                  borderLeftRadius="0"
                  disabled={messageRef.current === ""}
                >
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </MessageForm>
      </Box>
    </>
  );
};

export default ChatMessage;
