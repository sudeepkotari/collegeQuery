import { HStack, VStack } from '@chakra-ui/layout'
import { useEffect } from 'react';
import { GET_POSTS_BY_USER } from '../Graphql/Queries';
import localStorage from 'local-storage';
import { useLazyQuery } from '@apollo/client';
import AddQuestion from '../Components/AddQuestion'
import Header from '../Components/Header'
import MyPost from '../Components/MyPost';
import SearchBar from '../Components/SearchBar'
import UserInfo from '../Components/UserInfo'
import { useMyPostContext } from '../Contexts/MyPostContext'

function ProfilePage() {

    const { myPosts, setMyPosts } = useMyPostContext();
    const userId = localStorage.get('userId');
    const [ getData,{ data  }]= useLazyQuery(GET_POSTS_BY_USER,
        {variables: 
            { 
                id: userId 
            },
            fetchPolicy: "network-only"
        });

    useEffect(() => {
        getData();
    },[])// eslint-disable-line react-hooks/exhaustive-deps
        
    useEffect(() => {
    if(data){
        setMyPosts(data.getPostsByUser)
    }
    }, [data])// eslint-disable-line react-hooks/exhaustive-deps



    return (
        <VStack px="4" py="1">
            <Header/>
            <HStack w="100vw"
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
            <UserInfo/>
            { myPosts ?
                    myPosts.map((post, index) => (
                    <MyPost key={ index } post={post} />
                    ))
                : "" }
        </VStack>
    )
}

export default ProfilePage
