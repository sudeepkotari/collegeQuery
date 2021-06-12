import React, { useEffect } from 'react'
import localStorage from 'local-storage';
import { useHistory } from 'react-router';
import { Heading } from '@chakra-ui/layout';
import axios from 'axios';

function LogoutPage() {
    const histroy = useHistory();
    const logout = async () => {
        try {
            const refToken = localStorage.get('refreshToken');
            axios.delete('https://college-query.herokuapp.com/auth/logout',{
                data:{
                    "refreshToken": refToken 
                }
            })
            localStorage.remove('accessToken');
            localStorage.remove('refreshToken');
            localStorage.remove('userId');
            histroy.replace('/login');
        } catch (error) {
            console.log(error.response)
            localStorage.remove('accessToken');
            localStorage.remove('refreshToken');
            histroy.replace('/login');
        }

    }

    useEffect(() => {
        logout();
    })

    return (
        <div>
            <Heading> LogoutPage </Heading>
        </div>
    )
}

export default LogoutPage
