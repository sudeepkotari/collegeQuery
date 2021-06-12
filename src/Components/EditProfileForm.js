import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { Field, Form, Formik } from 'formik'
import {  useState } from 'react'
import * as yup from 'yup';
import ImageUploader from "react-images-upload";
import ProgressBar from './ProgressBar'
import { UPDATE_USER } from '../Graphql/Mutations'
import { useMutation } from '@apollo/client';
import { Alert } from '@chakra-ui/alert';
import { AlertIcon } from '@chakra-ui/alert';
import localStorage from 'local-storage';
import { cloudStorage } from '../firebase/config'

function EditProfileForm(props) {
  const [updateUser] = useMutation(UPDATE_USER)
  const userId = localStorage.get('userId');
 
    
  let initialValues = {
    name:'',
    about:''
  }

    const validationSchema = yup.object({
      name:yup
      .string()
      .required("Please enter your name")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters"),
      about:yup
      .string()
      .min(3, "about must be at least 3 characters")
      .max(40, "about must be less than 40 characters")
     
  })


  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  const [message, setMessage] = useState();
  const [status, setStatus] = useState();

  function removeProfile(){
    const storageRef = cloudStorage.ref(userId);
    storageRef.delete().then(()=>{
      setMessage('profile photo removed')
      setStatus('success')

      updateUser({ variables: { 
        id:userId,
        profileUrl:""
     }})

    }).catch(()=>{
      setMessage('profile photo not uploaded')
      setStatus('error')
    })
  }
  
  

  const onSubmit = async(values, actions) => {
   
        await updateUser({ variables: { 
          id:userId,
          name: values.name,
          about: values.about
       }})

       actions.setSubmitting(false);
    
  }


    return (
      <VStack>
        {pictures[0] && <ProgressBar file={pictures[0]} setPictures={setPictures} userId={userId} />}
        <VStack p="4">
            <ImageUploader
                {...props}
                withIcon={false}
                onChange={onDrop}
                imgExtension={[".jpg", ".jpeg",".png"]}
                maxFileSize={5242880}
                singleImage={true}
                label={'Max file size: 5mb, accepted: jpg and png'}
                buttonText={"change profile photo"}
            />
          <Button size="sm" colorScheme="red" onClick={removeProfile}>Remove profile photo</Button>
          {message && <Alert status={status}>
                <AlertIcon />
                {message}
            </Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema = {validationSchema}
            onSubmit={ onSubmit }
          >
            {(props) => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input 
                        {...field}  
                        id="name" variant="outline" 
                        type="text"
                        placeholder="Enter name" 
                      />
                      <FormErrorMessage mb={3}>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="about">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.about && form.touched.about}>
                      <FormLabel htmlFor="about">About</FormLabel>
                      <Input 
                        {...field}  
                        id="about" variant="outline" 
                        type="text"
                        placeholder="About you" 
                      />
                      <FormErrorMessage mb={3}>{form.errors.about}</FormErrorMessage>
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
                  update
                </Button>
              </Form>
            )}
          </Formik>
        </VStack>
      </VStack>
    )
  }

export default EditProfileForm
