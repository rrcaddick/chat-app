import { ArrowBackIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputGroup,
  InputRightAddon,
  Spinner,
  Text,
  Textarea,
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
  flex-shrink: 0;
`;

const ChatMessage = ({ onSearch, onAddEditGroup, onDeleteLeaveChat, onSendMessage }) => {
  const dispatch = useDispatch();
  const { debounce, cancelDebounce } = useDebounce();
  const { selectedChat } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const { isLoading, userIsTyping } = useSelector((store) => store.message);

  const messageRef = useRef();
  const submitRef = useRef();

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
        borderRadius="lg"
        flexGrow="1"
        overflow="hidden"
        gap={5}
      >
        {isLoading && <Spinner size="xl" borderWidth="5px" w={20} h={20} m="auto" alignSelf="center" />}
        {!isLoading && <MessageFeed />}
        <MessageForm onSubmit={sendMessageHandler} noValidate>
          <FormControl>
            <InputGroup border="teal">
              <Textarea
                rows={1}
                ref={messageRef}
                bg="white"
                px={3}
                placeholder="Send a message..."
                onChange={typingHandler}
                focusBorderColor="teal"
                borderRight="none"
                borderRightRadius="0"
                resize="none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitRef.current.click();
                  }
                }}
                _hover={{ border: "1px solid teal", borderRight: "none" }}
                sx={{
                  "::-webkit-scrollbar": { width: "5px" },
                  "::-webkit-scrollbar-thumb": {
                    background: "#00808071",
                    borderRadius: "xl",
                  },
                }}
              />
              <InputRightAddon h="full" w="auto" p={0} overflow="hidden">
                <Button
                  type="submit"
                  ref={submitRef}
                  leftIcon={<EmailIcon />}
                  colorScheme="teal"
                  variant="solid"
                  borderRadius="0"
                  ml="2px"
                  disabled={messageRef?.current?.value === ""}
                >
                  Send
                </Button>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        </MessageForm>
      </Box>
    </>
  );
};

export default ChatMessage;
