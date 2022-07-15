import { useState, forwardRef } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  FormErrorMessage,
  FormLabel,
  Button,
  Text,
  HStack,
  InputRightElement,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaRegEyeSlash, FaRegEye, FaPhotoVideo } from "react-icons/fa";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UploadInput = forwardRef((props, ref) => {
  const Input = styled.input`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    ::-webkit-file-upload-button {
      cursor: pointer;
    }
  `;
  return <Input type="file" {...props} ref={ref} />;
});

const Signup = () => {
  const [fileName, setFileName] = useState(null);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: null,
    },
    mode: "all",
  });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
  };

  const nameValidator = {
    ...register("name", {
      required: "Please enter your full name",
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: "Name should not contain numbers or special characters. (Sorry Elon!)",
      },
    }),
  };

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

  const passwordValidator = {
    ...register("password", {
      required: "A password is required to access your account",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password should be least 8 characters, with at least 1 lowercase, capital, number and special character",
      },
    }),
  };

  const confirmPasswordValidator = {
    ...register("confirmPassword", {
      required: "Please confirm your password",
      validate: (confirmPassword) => {
        if (confirmPassword !== getValues("password")) return "Your passwords do not match";
      },
    }),
  };

  const submitHandler = (userData) => {
    console.log(userData);
  };

  return (
    <SignupForm noValidate onSubmit={handleSubmit(submitHandler)}>
      <FormControl isInvalid={Boolean(errors?.name)} isRequired>
        <Input variant="flushed" px={3} id="name" type="text" placeholder="Full Name" {...nameValidator} />
        {errors?.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
      </FormControl>

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
            type={showPassword.password ? "text" : "password"}
            {...passwordValidator}
          />
          <InputRightElement>
            <Icon
              as={showPassword.password ? FaRegEyeSlash : FaRegEye}
              cursor="pointer"
              onClick={() => {
                setShowPassword((state) => ({ ...state, password: !state.password }));
              }}
            />
          </InputRightElement>
        </InputGroup>
        {errors?.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.confirmPassword)} isRequired>
        <InputGroup>
          <Input
            variant="flushed"
            px={3}
            id="confirmPassword"
            placeholder="Confirm your password"
            type={showPassword.confirmPassword ? "text" : "password"}
            {...confirmPasswordValidator}
          />
          <InputRightElement>
            <Icon
              as={showPassword.confirmPassword ? FaRegEyeSlash : FaRegEye}
              cursor="pointer"
              onClick={() => {
                setShowPassword((state) => ({ ...state, confirmPassword: !state.confirmPassword }));
              }}
            />
          </InputRightElement>
        </InputGroup>
        {errors?.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.profilePicture)} my={5}>
        <FormLabel>Choose your profile picture:</FormLabel>
        <HStack>
          <Button colorScheme="green" display="flex" position="relative" borderRadius="50%">
            <Icon as={FaPhotoVideo} />
            <UploadInput id="profilePicture" {...register("profilePicture")} onChange={onFileChange} />
          </Button>
          <Text>{fileName}</Text>
        </HStack>
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Sign Up
      </Button>
    </SignupForm>
  );
};

export default Signup;
