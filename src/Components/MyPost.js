import { Box } from "@chakra-ui/layout";
import MyPostBody from "./MyPostBody";
import PostHeader from "./PostHeader";

function MyPost(props) {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      w={{
        base: "95vw",
        sm: "95vw",
        md: "60vw",
      }}
      my="1"
    >
      <PostHeader post={props.post} />
      <MyPostBody post={props.post} />
    </Box>
  );
}

export default MyPost;
