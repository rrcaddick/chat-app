import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import ProfileModal from "../Modals/ProfileModal";

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  gap: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
`;

const AppBar = ({ onOpen, children }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p="5px 15px"
        borderWidth="5px"
        flexShrink="0"
      >
        <Tooltip label="Search a user to chat with" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: "none", md: "block" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Chat R Box</Text>
        <Box display="flex" alignItems="center" gap={3}>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.profilePicture}></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <ProfileModal {...user}>Profile</ProfileModal>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <MainContent>{children}</MainContent>
    </>
  );
};

export default AppBar;
