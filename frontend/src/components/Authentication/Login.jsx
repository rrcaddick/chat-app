/* eslint-disable no-control-regex */
import { useState } from "react";
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
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
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

  const submitHandler = (userData) => {
    onLogin(userData);
  };

  return (
    <SignupForm noValidate onSubmit={handleSubmit(submitHandler)}>
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
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" my={5}>
          <Text fontSize="lg" position="absolute" zIndex={10} background="white" px={3}>
            OR
          </Text>
          <Divider />
        </Box>
        <Button type="submit" colorScheme="red">
          Sign in as Guest
        </Button>
      </Box>
    </SignupForm>
  );
};

export default Login;
