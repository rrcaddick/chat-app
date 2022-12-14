import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels, useToast } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { registerUser, loginUser, reset } from "../features/authSlice";

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const {
    isLoading,
    isSuccess: { register: isSuccessRegister, login: isSuccessLogin },
    isError,
    validationErrors,
    message,
  } = useSelector((state) => state.auth);
  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (userData) => {
    dispatch(loginUser(userData));
  };
  const signupHandler = (userData) => {
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isSuccessRegister) {
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setTabIndex(0);
    }
    if (isSuccessLogin) {
      navigate("/chats");
    }

    dispatch(reset());
  }, [isSuccessRegister, isSuccessLogin, navigate, dispatch, toast]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        width="100%"
        margin="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl">Chat-R-Box</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs
          index={tabIndex}
          onChange={(index) => {
            setTabIndex(index);
          }}
          isFitted
          variant="soft-rounded"
        >
          <TabList mb="1rem">
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login onLogin={loginHandler} isLoading={isLoading} />
            </TabPanel>
            <TabPanel>
              <Signup onSignup={signupHandler} isLoading={isLoading} errors={{ isError, validationErrors, message }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
