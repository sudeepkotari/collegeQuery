import React from 'react'
import { HStack, Stack, Spacer, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'

function AnswerHeader(props) {
    return (
        <HStack w="100%" px="4" py="1">
            <Avatar src={props.post.user.profileUrl}
            w={{
              base:"30px",
              md:"40px"
            }}
            h={{
              base:"30px",
              md:"40px"
            }} />
            <Stack spacing="0">
              <Text as="b">{ props.post.user.name }</Text>
              <Text fontSize="xs">{props.post.user.about}</Text>
            </Stack>
            <Spacer/>
            <Text color="gray.500" fontSize="xs">2 minutes ago</Text>
        </HStack>
    )
}

export default AnswerHeader
