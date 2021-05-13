import { VStack } from '@chakra-ui/layout'
import React from 'react'
import Header from '../Components/Header'

function Profile() {
    return (
        <VStack px="4" py="1">
            <Header/>
            <p>this is Profile page</p>
        </VStack>
    )
}

export default Profile
