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
        <Stack height="100vh" alignItems="center" background="gray.100" justifyContent="center" p={4}>
            <Stack p={4}>
            <Heading></Heading>
            <Alert status={status}>
                <AlertIcon />
                {message}
            </Alert>
            </Stack>
            <Button onClick={( ) => history.replace('/')} colorScheme="orange">Home</Button>
        </Stack>
    )
}

export default EmailVerificationPage
