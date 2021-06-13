import { HStack, Text } from '@chakra-ui/layout'
import parse from 'html-react-parser'
import { useHistory } from 'react-router';


function Result(props) {
    const history = useHistory();

    function showPost(){
        history.push(`/post/${props.result._id}`)
    }
    return (
        <HStack w="100%" cursor="pointer" onClick={ showPost }> 
            <Text><>{ parse(props.result.question) }</></Text>
        </HStack>
    )
}

export default Result
