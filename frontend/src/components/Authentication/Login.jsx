/* eslint-disable no-control-regex */
import { useState, useRef } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  FormErrorMessage,
  Button,
  Text,
  Divider,
  InputRightElement,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Login = ({ onLogin, isLoading }) => {
  const loginRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const {
    isError: { login: isError },
    message,
  } = useSelector((store) => store.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "rrcaddick@gmail.com",
      password: "Whatever123!",
    },
    mode: "all",
  });

  const emailValidator = {
    ...register("email", {
      required: "An email address is required to sign you up",
      pattern: {
        value:
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        message: "Please enter a valid email address",
      },
    }),
  };

  const passwordValidator = { ...register("password", { required: "A password is require to log you in" }) };

  const setGuestLoginHandler = () => {
    setValue("email", "guest@chatrbox.com");
    setValue("password", "Guest@123");
    loginRef.current.click();
  };

  const submitHandler = (userData) => {
    onLogin(userData);
  };

  return (
    <>
      {isError && (
        <Alert status="error" mb="1rem">
          <AlertIcon />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      <LoginForm noValidate onSubmit={handleSubmit(submitHandler)}>
        <FormControl isInvalid={Boolean(errors?.email)} isRequired>
          <Input variant="flushed" px={3} id="email" type="email" placeholder="Email Address" {...emailValidator} />
          {errors?.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.password)} isRequired>
          <InputGroup>
            <Input
              variant="flushed"
              px={3}
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...passwordValidator}
            />
            <InputRightElement>
              <Icon
                as={showPassword ? FaRegEyeSlash : FaRegEye}
                cursor="pointer"
                onClick={() => {
                  setShowPassword((state) => !state);
                }}
              />
            </InputRightElement>
          </InputGroup>
          {errors?.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <Box display="flex" flexDir="column" gap={3} mt={5}>
          <Button type="submit" colorScheme="blue" disabled={isLoading} ref={loginRef}>
            {isLoading ? <Spinner /> : "Login"}
          </Button>
          <Box position="relative" display="flex" justifyContent="center" alignItems="center" my={5}>
            <Text fontSize="lg" position="absolute" zIndex={10} background="white" px={3}>
              OR
            </Text>
            <Divider sx={{ borderColor: "#888" }} />
          </Box>
          <Button type="button" onClick={setGuestLoginHandler} colorScheme="red">
            Sign in as Guest
          </Button>
        </Box>
      </LoginForm>
    </>
  );
};

export default Login;
