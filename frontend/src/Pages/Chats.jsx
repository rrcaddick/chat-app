import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserList } from "../features/userSlice";
import AppBar from "../components/Layout/AppBar";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../components/Layout/SideDrawer";

const Chats = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, []);

  const searchHandler = ({ search }) => {
    dispatch(getUserList(search));
  };

  return (
    <>
      <SideDrawer isOpen={isOpen} onClose={onClose} onSearch={searchHandler} />
      <AppBar onOpen={onOpen}></AppBar>;
    </>
  );
};

export default Chats;
