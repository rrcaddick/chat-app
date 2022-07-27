import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import UserListItem from "../User/UserListItem";
import UserBadgeItem from "../User/UserBadgeItem";
import { reset as resetUsers } from "../../features/userSlice";

const GroupChatForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddUpdateGroupChatModal = ({ groupData, onAddEditGroup, onSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading } = useSelector((store) => store.user);
  const { user } = useSelector((store) => store.auth);
  const [groupChatUsers, setGroupChatUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);

  const isAdminUser = user._id === groupData?.groupAdmin;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { groupName: "" } });

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const searchHandler = (e) => {
    if (e.target.value.trim() === "") return;
    onSearch({ search: e.target.value });
  };

  const searchDebounce = useCallback(debounce(searchHandler), [debounce, searchHandler]);

  const selectHandler = ({ users }) => {
    setGroupChatUsers((state) => {
      const newUserList = [...state, users[0]];
      newUserList.length < 2 ? setUsersError("At least 2 users are required to create a group") : setUsersError(null);
      return newUserList;
    });
  };

  const onModalOpenHandler = () => {
    setUsersError("");
    if (groupData) {
      setGroupChatUsers(groupData.users.filter((u) => u._id !== user._id));
      setValue("groupName", groupData.chatName);
    }
    onOpen();
  };

  const onModalCloseHandler = () => {
    onClose();
    dispatch(resetUsers());
    setGroupChatUsers([]);
    reset();
  };

  const onSubmitHandler = ({ groupName }) => {
    if (groupChatUsers.length < 2) return setUsersError("At least 2 users are required to create a group");

    const updatedGroupData = {
      _id: groupData?._id || null,
      users: groupChatUsers,
      chatName: groupName,
      isGroupChat: true,
    };
    onAddEditGroup(updatedGroupData);
    onModalCloseHandler();
  };

  const onLeaveGroupHandler = () => {};

  return (
    <>
      {groupData ? (
        <IconButton icon={<ViewIcon />} onClick={onModalOpenHandler} />
      ) : (
        <Button
          onClick={onModalOpenHandler}
          display="flex"
          fontSize={{ base: "10px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          Group Chat
        </Button>
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onModalCloseHandler}>
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" gap={5} py={2}>
          <ModalHeader fontSize="35px">{groupData ? groupData.chatName : "Create Group Chat"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" width="100%">
            <GroupChatForm onSubmit={handleSubmit(onSubmitHandler)}>
              <FormControl isInvalid={Boolean(errors?.groupName)} isRequired>
                <Input
                  px={3}
                  placeholder="Group Name"
                  {...register("groupName", { required: "Please provide a group name" })}
                />
                {errors?.groupName && <FormErrorMessage>{errors.groupName.message}</FormErrorMessage>}
              </FormControl>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                {groupChatUsers.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    {...user}
                    isAdminUser={isAdminUser}
                    onRemove={() => {
                      setGroupChatUsers((state) => {
                        const newUserList = state.filter((x) => x._id !== user._id);
                        if (newUserList.length < 2) setUsersError("At least 2 users are required to create a group");
                        return newUserList;
                      });
                    }}
                  />
                ))}
              </Box>
              {isAdminUser && (
                <>
                  <FormControl isInvalid={Boolean(usersError)}>
                    <Input px={3} placeholder="Search users to add" onChange={searchDebounce} />
                    {Boolean(usersError) && <FormErrorMessage>{usersError}</FormErrorMessage>}
                  </FormControl>
                  {isLoading && <Spinner size="xl" alignSelf="center" mt={2} />}
                  {!isLoading && (
                    <Stack
                      overflowY="scroll"
                      maxHeight="10rem"
                      sx={{
                        "::-webkit-scrollbar": { width: "0px" },
                        "::-webkit-scrollbar-thumb": { background: "rgba(136, 136, 136, 0.281)" },
                        "::-webkit-scrollbar-thumb:hover": { background: "#555" },
                      }}
                    >
                      {users
                        .filter((user) => !groupChatUsers.find((x) => x._id === user._id))
                        .map((user) => (
                          <UserListItem key={user._id} {...user} onSelect={selectHandler} />
                        ))}
                    </Stack>
                  )}
                </>
              )}

              <ModalFooter gap={2} px={0}>
                {groupData && (
                  <Button onClick={onLeaveGroupHandler} colorScheme="red">
                    Leave Group
                  </Button>
                )}
                <Button type="submit" disabled={usersError} colorScheme="blue">
                  {groupData ? "Update" : "Create"} Group Chat
                </Button>
              </ModalFooter>
            </GroupChatForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddUpdateGroupChatModal;
