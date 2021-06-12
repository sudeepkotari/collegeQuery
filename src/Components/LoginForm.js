import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Link, VStack } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/layout'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link as ReachLink, useHistory} from 'react-router-dom'
import * as yup from 'yup';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast'
import localStorage from 'local-storage';
import jwt_decode from "jwt-decode";

function LoginForm() {

    const initialValues = {
        email:'',
        password:''
    }
    
        const validationSchema = yup.object({
          email: yup
          .string()
          .email()
          .required("Email is a required field"),
        password: yup
          .string()
          .required("Please enter your password")
      })

      const [show, setShow] = useState(false)
      const handleClick = () => setShow(!show)
      const history = useHistory();
      const toast = useToast();

      const [message, setMessage] = useState({
        status:"info",
        title: "Enter valid credentials",
        description:"enter valid email address and password",
        duration:1
      })

      useEffect(() => {
        toast({
          title: message.title,
          description: message.description,
          status: message.status,
          duration: message.duration,
          isClosable: true,
        })
      }, [message,toast])

      function getUserId(accessToken) {
        const decoded = jwt_decode(accessToken);
        return decoded.aud;
      }
    
      const onSubmit = async(values, actions) => {
        try {
          const response = await axios.post('https://college-query.herokuapp.com/auth/login',
          {
              "email": values.email,
              "password": values.password
          })
          const { accessToken, refreshToken } = response.data;
          localStorage.set("accessToken", accessToken);
          localStorage.set("refreshToken", refreshToken);
          const userId = await getUserId( accessToken );
          localStorage.set("userId", userId);
          history.replace('/');
          actions.setSubmitting(false)
          } catch (error) {
            setMessage({
              status : "error",
              title : "invalid credentials",
              description: error.response.data.error.message,
              duration: 5000
            })
          }
      }
    
      
        return (
            <VStack p="4">
              <Formik
                initialValues={initialValues}
                validationSchema = {validationSchema}
                onSubmit={ onSubmit }
              >
                {(props) => (
                  <Form>
                    
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input 
                            {...field} 
                            placeholder="Enter email" 
                            id="email" 
                            variant="outline" 
                            type="email"
                          />
                          <FormErrorMessage mb={3}>{form.errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.password && form.touched.password}>
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
                                    <Button h="1.75rem" size="sm" onClick={handleClick} >
                                    {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                                </InputGroup>
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
    
                    <Button
                      mt={3}
                      mb={3}
                      colorScheme="orange"
                      isLoading={props.isSubmitting}
                      type="submit"
                      width="100%"
                    >
                      Log In
                    </Button>
                  </Form>
                )}
              </Formik>
              <Text>
                Dont have account..?
                <Link as={ReachLink} color="orange.400" to="/register">
                  Sign Up
                </Link>
              </Text>
            </VStack>  
        )
      }

export default LoginForm
