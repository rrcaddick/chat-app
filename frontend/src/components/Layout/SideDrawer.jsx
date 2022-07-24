import { useForm } from "react-hook-form";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const SearchForm = styled.form`
  display: flex;
  padding-bottom: 2rem;
`;

const SideDrawer = ({ isOpen, onClose, onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <SearchForm onSubmit={handleSubmit(onSearch)}>
              <FormControl isInvalid={Boolean(errors?.search)} isRequired>
                <InputGroup>
                  <Input
                    px={3}
                    id="search"
                    placeholder="Search by name or email"
                    {...register("search", { required: "Please enter a search term" })}
                  />
                  <InputRightElement>
                    <Button type="submit" variant="ghost" colorScheme="blue" disabled={!isValid}>
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors?.search && <FormErrorMessage>{errors.search.message}</FormErrorMessage>}
              </FormControl>
            </SearchForm>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
