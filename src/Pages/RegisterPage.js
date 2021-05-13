import React from 'react'
import RegisterForm from '../Components/RegisterForm'
import Logo from '../Components/Logo'
import { IconButton } from '@chakra-ui/button'
import { FaSun, FaMoon} from "react-icons/fa"
import { useColorMode } from '@chakra-ui/color-mode'
import { VStack } from '@chakra-ui/layout'


function RegisterPage() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <VStack p={4}>
            <IconButton 
                    aria-label="color mode" 
                    icon={ colorMode==="light" ? <FaSun/> : <FaMoon/>} 
                    rounded="full"
                    alignSelf="flex-end"
                    onClick={toggleColorMode}
                    w={{
                        base:"20px",
                        sm:"40px"
                    }}
                    h={{
                        base:"20px",
                        sm:"40px"
                    }}
                    />
            <Logo/>
            <RegisterForm/>
        </VStack>
    )
}

export default RegisterPage
