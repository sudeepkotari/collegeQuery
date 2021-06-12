import { Box } from '@chakra-ui/layout'
import React from 'react'
import PostBody from './PostBody'
import PostHeader from './PostHeader'

function Post(props) {
    return (
        <Box
        border="1px" 
        borderColor="gray.200"
        w={{
            base:"95vw",
            sm:"95vw",
            md:"60vw"
        }}
        my="1"
        >
            <PostHeader post={  props.post  }/>
            <PostBody post={ props.post }/>
        </Box>
    )
}

export default Post
