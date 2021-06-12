import { HStack, VStack } from '@chakra-ui/layout'
import { GET_QUESTIONS } from '../Graphql/Queries'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../Components/Header'
import SearchBar from '../Components/SearchBar'
import Post from '../Components/Post';
import AddQuestion from '../Components/AddQuestion';

function Questions() {
    const size = 5;
    const [page, setPage] = useState(1)
    const [questions, setQuestions] = useState([])
    const [getQuestions, { data }] = useLazyQuery(GET_QUESTIONS,
        {
            variables: { 
                page,
                size
            },
            fetchPolicy: "network-only"
        });

    function getData(){
        getQuestions()
    }

    useEffect(()=>{
        getData()
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(data){
            setQuestions([...questions,...data.getQuestions])
        }
    },[data])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <VStack px="4" py="1">
            <Header/>
            <HStack w="98vw"
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
            <InfiniteScroll
            dataLength={questions.length}
            next={()=> setPage(page+1)}
            hasMore={true}
            >
                {
                    questions.map((post, index) => (
                    <Post key={ index } post={post}/>
                    ))
                }
            </InfiniteScroll>
        </VStack>
    )
}

export default Questions
