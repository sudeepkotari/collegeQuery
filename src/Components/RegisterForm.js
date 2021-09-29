import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Link, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useToast } from "@chakra-ui/toast";

function RegisterForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter your name")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters"),
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const [message, setMessage] = useState({
    status: "info",
    title: "Enter valid credentials",
    description:
      "enter your correct name,valid email addres and strong password",
    duration: 1,
  });

  useEffect(() => {
    toast({
      title: message.title,
      description: message.description,
      status: message.status,
      duration: message.duration,
      isClosable: true,
    });
  }, [message, toast]);

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "https://college-query.herokuapp.com/auth/verify-email",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          about: " ",
          profileUrl: " ",
        }
      );
      actions.setSubmitting(false);
      setMessage({
        status: "success",
        title: response.data.message,
        description:
          "Please click on the link that has just been sent to your email account to verify your email and continue the registration process.",
        duration: 10000,
      });
    } catch (error) {
      setMessage({
        status: "error",
        title: "Email not sent!",
        description: error.response.data.error.message,
        duration: 5000,
      });
    }
  };

  return (
    <VStack p="4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    variant="outline"
                    type="text"
                    placeholder="Enter name"
                  />
                  <FormErrorMessage mb={3}>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    variant="outline"
                    type="email"
                    placeholder="Enter email"
                  />
                  <FormErrorMessage mb={3}>
                    {form.errors.email}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...field}
                      id="password"
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage width="100%" maxW="290px">
                    {form.errors.password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mb={4}
              mt={3}
              width="100%"
              colorScheme="orange"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Text>
        Already have account..?
        <Link as={ReachLink} color="orange.400" to="/login">
          Sign In
        </Link>
      </Text>
    </VStack>
  );
}

export default RegisterForm;
