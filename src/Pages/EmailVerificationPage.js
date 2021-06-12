import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button } from '@chakra-ui/button';
import { Alert } from '@chakra-ui/alert';
import { AlertIcon } from '@chakra-ui/alert';
import { Stack } from '@chakra-ui/layout';
import localStorage from 'local-storage';
import jwt_decode from "jwt-decode";

function EmailVerificationPage() {
    const { emailVerificationToken } = useParams();
    const history = useHistory();
    const [message, setMessage] = useState('email verification is processing!');
    const [status, setStatus] = useState('info');

    function getUserId(accessToken) {
        const decoded = jwt_decode(accessToken);
        console.log(decoded.aud)
        return decoded.aud;
      }
    

    useEffect(() => {
        axios.post('https://college-query.herokuapp.com/auth/register',
        {
            "emailVerificationToken": emailVerificationToken 
        })
        .then((response)=>{
            const { accessToken, refreshToken } = response.data;
            localStorage.set("accessToken", accessToken);
            localStorage.set("refreshToken", refreshToken);
            const userId = getUserId( accessToken );
            localStorage.set("userId", userId);
            setMessage('Account verified successfully. Continue!');
            setStatus('success');
            
        })
        .catch((error)=>{
            setMessage(error.response.data.error.message);
            setStatus('error')
        })
        
    },[emailVerificationToken])
    
    return (
        <Stack height="100vh" alignItems="center" justifyContent="center" p={4}>
            <Stack p={4}>
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
