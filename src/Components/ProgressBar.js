import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { Progress } from "@chakra-ui/react"
import { UPDATE_USER } from '../Graphql/Mutations'
import { useMutation } from '@apollo/client';

function ProgressBar({file, setPictures, userId}) {
    const [updateUser] = useMutation(UPDATE_USER)
    const picture = file[0];
    const { url, progress } = useStorage(picture, userId);
    useEffect(()=>{
        if(url){
            setPictures([]);
            updateUser({ variables: { 
                id:userId,
                profileUrl:url
             }})

        }
    },[url])// eslint-disable-line react-hooks/exhaustive-deps
    return (
           <Progress size="sm" colorScheme="pink" value={progress} w="lg"/> 
    )
}

export default ProgressBar
