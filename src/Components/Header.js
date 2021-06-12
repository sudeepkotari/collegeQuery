import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import axios from 'axios'
import localStorage from 'local-storage';
import { useHistory } from 'react-router-dom'


function Header() {
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
            await axios.get('https://college-query.herokuapp.com/',
            { 
                headers: {"Authorization": `Bearer ${accessToken}`} 
            })
        } catch (error) {
            if(!error.response){
                return;
            }

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
            const response = await axios.post('http://localhost:3001/auth/refresh-token',
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
        <>
            <NavBar/>
        </>
    )
}

export default Header
