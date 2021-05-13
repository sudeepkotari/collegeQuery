import { HStack } from '@chakra-ui/layout'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconButton } from '@chakra-ui/button'
import { AiOutlineHome } from "react-icons/ai"
import { FaRegEdit} from "react-icons/fa"
import { Avatar } from '@chakra-ui/avatar'
import { Spacer } from '@chakra-ui/layout'
import { useColorMode } from '@chakra-ui/color-mode'
import { FaSun, FaMoon} from "react-icons/fa"
import { Flex } from '@chakra-ui/layout'
import Logo from './Logo'

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack pr="4" pl="4" w="100vw">
          <Logo/>
          <Spacer/>
            <NavLink  activeClassName="active_class" exact to="/"><IconButton 
            bg="none"
            icon={<AiOutlineHome/>}
            w={{
                base:"30px",
                md:"60px"
            }}
            h={{
              base:"30px",
              md:"60px"
            }}
            aria-label="home"
            sx={{
                ".active_class &": {
                  bg: "orange",
                },
              }}
            /></NavLink>

            <NavLink activeClassName="active_class" to="/questions"><IconButton
            icon={<FaRegEdit/>}
            bg="none"
            w={{
                base:"30px",
                md:"60px"
            }}

            h={{
              base:"30px",
              md:"60px"
            }}
            aria-label="questions"
            sx={{
                ".active_class &": {
                  bg: "orange",
                }
              }}
            /></NavLink>
            <Spacer/>

            <NavLink to="/profile" position="absolute"><Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            w={{
              base:"30px",
              md:"50px"
            }}
            h={{
              base:"30px",
              md:"50px"
            }} /></NavLink>

                <Flex>
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
                </Flex>
        </HStack>
    )
}

export default NavBar

