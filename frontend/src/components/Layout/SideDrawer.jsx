import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import UserListItem from "../User/UserListItem";

const SearchForm = styled.form`
  display: flex;
  padding-bottom: 2rem;
`;

const SideDrawer = ({ isOpen, onClose, onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  const { users, isLoading } = useSelector((store) => store.user);

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <SearchForm onSubmit={handleSubmit(onSearch)}>
              <FormControl>
                <InputGroup>
                  <Input
                    px={3}
                    id="search"
                    placeholder="Search by name or email"
                    {...register("search", { required: true })}
                  />
                  <InputRightElement>
                    <Button type="submit" variant="ghost" colorScheme="blue" disabled={!isValid}>
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </SearchForm>
            {isLoading && (
              <Box display="flex" justifyContent="center">
                <Spinner size="xl" />
              </Box>
            )}
            {!isLoading && (
              <Stack>
                {users.map((user) => (
                  <UserListItem key={user._id} {...user} onClick={() => {}} />
                ))}
              </Stack>
            )}
            {!isLoading && users.length === 0 && <Text>No users found...</Text>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
