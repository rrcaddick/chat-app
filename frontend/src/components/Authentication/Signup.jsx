/* eslint-disable no-control-regex */
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
  Spinner,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaRegEyeSlash, FaRegEye, FaPhotoVideo } from "react-icons/fa";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { validate } from "uuid";

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

const Signup = ({ onSignup, isLoading, errors: { isError, validationErrors, message } }) => {
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    setError,
    trigger,
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
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const file = e.target.files[0];

    if (!allowedTypes.includes(file?.type)) {
      return setError("profilePicture", {
        type: "custom",
        message: "Profile picture is not in an accepted format. Accepted formats: jpeg, jpg, png, webp",
      });
    }

    setValue("profilePicture", file);
    trigger("profilePicture");
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
    onSignup(userData);
  };

  return (
    <SignupForm noValidate onSubmit={handleSubmit(submitHandler)}>
      <FormControl isInvalid={Boolean(errors?.name || validationErrors?.name)} isRequired>
        <Input variant="flushed" px={3} id="name" type="text" placeholder="Full Name" {...nameValidator} />
        {(errors?.name || validationErrors?.name) && (
          <FormErrorMessage>{errors?.name?.message || validationErrors?.name}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.email || validationErrors?.email)} isRequired>
        <Input variant="flushed" px={3} id="email" type="email" placeholder="Email Address" {...emailValidator} />
        {(errors?.email || validationErrors?.email) && (
          <FormErrorMessage>{errors?.email?.message || validationErrors?.email}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.password || validationErrors?.password)} isRequired>
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
        {(errors?.password || validationErrors?.password) && (
          <FormErrorMessage>{errors?.password?.message || validationErrors?.password}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.confirmPassword || validationErrors?.confirmPassword)} isRequired>
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
        {(errors?.confirmPassword || validationErrors?.confirmPassword) && (
          <FormErrorMessage>{errors?.confirmPassword?.message || validationErrors?.confirmPassword}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(errors?.profilePicture || validationErrors?.profilePicture)} my={5}>
        <FormLabel>Choose your profile picture:</FormLabel>
        <HStack>
          <Button colorScheme="green" display="flex" position="relative" borderRadius="50%">
            <Icon as={FaPhotoVideo} />
            <UploadInput
              id="profilePicture"
              {...register("profilePicture", {
                validate: (profilePicture) => {
                  if (!profilePicture?.name) return "Please provide a profile picture";
                },
              })}
              onChange={onFileChange}
            />
          </Button>
          <Text>{getValues("profilePicture")?.name}</Text>
        </HStack>
        {(errors?.profilePicture || validationErrors?.profilePicture) && (
          <FormErrorMessage>{errors?.profilePicture?.message || validationErrors?.profilePicture}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit" colorScheme="blue" disabled={isLoading} display="flex" justify="center" align="center">
        {isLoading ? <Spinner /> : "Sign Up"}
      </Button>
    </SignupForm>
  );
};

export default Signup;
