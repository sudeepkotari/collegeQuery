import { HStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { VStack } from "@chakra-ui/layout";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import { GET_POST } from "../Graphql/Queries";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../Components/Post";
import AddQuestion from "../Components/AddQuestion";

function HomePage() {
  const size = 5;
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const [getAllPosts, { data }] = useLazyQuery(GET_POST, {
    variables: {
      page,
      size,
    },
    fetchPolicy: "network-only",
  });
  function getData() {
    getAllPosts();
  }

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data.getAllPosts]);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VStack p="4" py="1" w="98vw" maxWidth="100%" overflow="hidden">
      <Header />
      <HStack
        w="90vw"
        display={{
          base: "initial",
          sm: "initial",
          md: "none",
        }}
      >
        <AddQuestion />
      </HStack>
      <HStack
        display={{
          base: "initial",
          sm: "initial",
          md: "none",
        }}
      >
        <SearchBar />
      </HStack>

      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(page + 1)}
        hasMore={true}
      >
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </InfiniteScroll>
    </VStack>
  );
}

export default HomePage;
