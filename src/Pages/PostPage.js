import { useLazyQuery } from '@apollo/client'
import { Box, HStack, VStack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { GET_SINGLE_POST } from '../Graphql/Queries'
import AddQuestion from '../Components/AddQuestion'
import Header from '../Components/Header'
import SearchBar from '../Components/SearchBar'
import PostHeader from '../Components/PostHeader'
import AnswerBody from '../Components/AnswerBody'

function PostPage() {

    useEffect(() => {
        getPost({variables: { id: postId},})
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const { postId } = useParams();
    const [getPost, { data }] = useLazyQuery(GET_SINGLE_POST);

    return (
        <VStack p="4" py="1" w="98vw" maxWidth="100%" overflow="hidden">
        <Header/>
        <HStack w="90vw"
        display={{
            base:"initial",
            sm:"initial",
            md:"none"
        }}
        >
            <AddQuestion/>
        </HStack>
        <HStack
        display={{
            base:"initial",
            sm:"initial",
            md:"none"
        }}
        >
            <SearchBar/>
        </HStack>
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
            { data ? <PostHeader post = { data.getPost }/> : "" }
            { data ? <AnswerBody post = { data.getPost }/> : "" }
        </Box>
        
    </VStack>
    )
}

export default PostPage
