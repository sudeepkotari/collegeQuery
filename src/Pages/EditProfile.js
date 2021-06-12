import React from 'react'
import { VStack } from '@chakra-ui/layout'
import EditProfileForm from '../Components/EditProfileForm'
import Header from '../Components/Header'


function EditProfile() {
    
    return (
        <VStack p={4}>
            <Header/>
            <EditProfileForm/>
        </VStack>
    )
}

export default EditProfile
