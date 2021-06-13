import { HStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
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
import SearchBar from './SearchBar'
import AddQuestion from './AddQuestion'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../Graphql/Queries'
import localStorage from 'local-storage';

function NavBar() {
  const [profileUrl, serProfileUrl] = useState(" ")

const userId = localStorage.get('userId');

const [getUser, { data }] = useLazyQuery(GET_USER,
    {variables: 
        { 
            id: userId 
        },
        fetchPolicy: "network-only"
    })

useEffect(() => {
    getUser();
},[])// eslint-disable-line react-hooks/exhaustive-deps

useEffect(()=>{
    if(data){
      serProfileUrl(data.getUser.profileUrl)
    }
},[data])
  
  const { colorMode, toggleColorMode } = useColorMode();
  const [navBarBackGround, setnavBarBackGround] = useState("")

  useEffect(() => {
    colorMode === "light" ? setnavBarBackGround("white") : setnavBarBackGround("#1a202c");
  }, [colorMode])

    return (
        <HStack pr="4" pl="4" w="98vw" top="0" pos="sticky" bg={ navBarBackGround } zIndex="1">
          <Spacer/>
          <Logo/>
          <Spacer/>
            <NavLink  activeClassName="active_class" exact to="/"><IconButton 
            bg="none"
            icon={ <AiOutlineHome/> }
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
          <HStack
            display={{
                base:"none",
                sm:"none",
                md:"initial"
            }}
          >
            <SearchBar/>
          </HStack>
          <HStack
            display={{
                base:"none",
                sm:"none",
                md:"initial"
            }}
          >
            <AddQuestion/>
          </HStack>
            <Spacer/>

            <NavLink to="/profile" position="absolute"><Avatar src={profileUrl}
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

