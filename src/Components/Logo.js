import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Heading } from '@chakra-ui/layout'

function Logo() {
    return (
        <Flex>
            <Heading
            fontSize={{ base: "10px", md: "20px", lg: "30px" }}
            bgGradient="linear(to-r, orange.500,yellow.200)"
            bgClip="text"
            >college</Heading>
              <Image 
              src="logo.png"
              boxSize={{
                  base:"15px",
                  sm:"20px",
                  md:"40px"
              }}
              />
            <Heading
            fontSize={{ base: "10px", md: "20px", lg: "30px" }}
            bgGradient="linear(to-r, orange.500,red.500)"
            bgClip="text"
            >uery</Heading>
          </Flex>
    )
}

export default Logo
