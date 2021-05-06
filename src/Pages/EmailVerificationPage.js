import { Heading } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button } from '@chakra-ui/button';
import { Alert } from '@chakra-ui/alert';
import { AlertIcon } from '@chakra-ui/alert';
import { Stack } from '@chakra-ui/layout';
import localStorage from 'local-storage';

function EmailVerificationPage() {
    const { emailVerificationToken } = useParams();
    const history = useHistory();
    const [message, setMessage] = useState('email verification is processing!');
    const [status, setStatus] = useState('info');
    

    useEffect(() => {
        axios.post('https://college-query.herokuapp.com/auth/register',
        {
            "emailVerificationToken": emailVerificationToken 
        })
        .then((response)=>{
            const { accessToken, refreshToken } = response.data;
            localStorage.set("accessToken", accessToken);
            localStorage.set("refreshToken", refreshToken);
            setMessage('Account verified successfully. Continue!');
            setStatus('success');
            
        })
        .catch((error)=>{
            setMessage(error.response.data.error.message);
            setStatus('error')
        })
        
    },[emailVerificationToken])
    
    return (
        <Stack height="100vh" alignItems="center" background="gray.100" justifyContent="center">
            <Heading></Heading>
            <Alert status={status} width="400px">
                <AlertIcon />
                {message}
            </Alert>
            
            
                <Button onClick={( ) => history.replace('/')} colorScheme="blue">Home</Button>
        </Stack>
    )
}

export default EmailVerificationPage
