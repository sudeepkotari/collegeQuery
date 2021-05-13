import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import localStorage from 'local-storage';
import { VStack } from '@chakra-ui/layout'
import Header from '../Components/Header'

function HomePage() {

    const history = useHistory();

    useEffect(() => {
        requestLogin();
    })
    
    const requestLogin = async ()=> {
        try {
            const accessToken = localStorage.get('accessToken');
            const refreshToken = localStorage.get('refreshToken');
            if(!accessToken || !refreshToken) 
            {
                history.replace('/login');
                return;
            }
            await axios.get('https://college-query.herokuapp.com',
            { 
                headers: {"Authorization": `Bearer ${accessToken}`} 
            })
        } catch (error) {
            if(error.response.data.error.message === "jwt expired")
            {
                const refreshToken = localStorage.get('refreshToken');

                    const response = await refreshTokens(refreshToken);
                    if(!response)
                    {
                        localStorage.remove('accessToken');
                        localStorage.remove('refreshToken');
                        history.replace('/login');
                        return;
                    }else
                    {
                        requestLogin();
                    }
            }else{
                localStorage.remove('accessToken');
                localStorage.remove('refreshToken');
                history.replace('/login');
            }
        }
    }

    const refreshTokens = async (refToken) => {
        try {
            const response = await axios.post('https://college-query.herokuapp.com/auth/refresh-token',
            {
                "refreshToken": refToken 
            })
            const { accessToken, refreshToken } = response.data;
            localStorage.set("accessToken", accessToken);
            localStorage.set("refreshToken", refreshToken);
            return response;
        } catch (error) {
            return;
        }
    }

    return (
        <VStack px="4" py="1">
            <Header/>
            <Heading
            fontSize={{ base: "24px", md: "40px", lg: "56px" }}
            >this is page is under development</Heading>
            <Link to="/logout"><Button>logOut</Button></Link>
        </VStack>
    )
}

export default HomePage
