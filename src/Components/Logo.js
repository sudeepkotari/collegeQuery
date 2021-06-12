import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Heading } from '@chakra-ui/layout'

function Logo() {
    return (
        <Flex>
            <Heading
            fontSize={{ base: "20px", md: "30px", lg: "30px" }}
            bgGradient="linear(to-r, orange.500,yellow.200)"
            bgClip="text"
            >college</Heading>
              <Image 
              src={process.env.PUBLIC_URL + '/logo.png'}
              boxSize={{
                  base:"25px",
                  sm:"30px",
                  md:"40px"
              }}
              />
            <Heading
            fontSize={{ base: "20px", md: "30px", lg: "30px" }}
            bgGradient="linear(to-r, orange.500,red.500)"
            bgClip="text"
            >uery</Heading>
          </Flex>
    )
}

export default Logo
