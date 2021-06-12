import { Text, Stack, HStack } from '@chakra-ui/layout'
import { FaRegEdit} from "react-icons/fa"
import { Button, IconButton } from '@chakra-ui/button'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml, {  } from "draftjs-to-html"
import { useMutation } from '@apollo/client';
import parse from 'html-react-parser'
import { DeleteIcon } from '@chakra-ui/icons'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
  } from "@chakra-ui/react"
import localStorage from 'local-storage';
import { useMyPostContext } from '../Contexts/MyPostContext'
import AnswerHeader from './AnswerHeader'
import { DELETE_POST, POST_ANSWER } from '../Graphql/Mutations'


function MyPostBody(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [answer, setAnswer] = useState("")
    const [sendAnswer] = useMutation(POST_ANSWER);
    const [deletePost] = useMutation(DELETE_POST);
    const userId = localStorage.get('userId');
    const { removePost } = useMyPostContext();

    function onEditorStateChange (editorState){
        setEditorState(editorState)
        setAnswer(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    function remove(){
        const id = props.post.id;
        deletePost({ variables: {
            id
        }})
        removePost(id)
    }

    function postAnswer(){

        sendAnswer({ variables: { 
            id: props.post.id,
            answer: answer,
            user: userId
         }})

        onClose()
    }

    return (
            <Stack 
            direction="column"
            px="4"
            py="4"
            >
                <Text as="b">{ parse(props.post.question) }</Text>
                <HStack>
                <IconButton
                icon={<FaRegEdit/>}
                bg="none"
                w={{
                    base:"20px",
                    md:"40px"
                }}

                h={{
                base:"20px",
                md:"40px"
                }}
                onClick={onOpen}
                color="blue.500"
                aria-label="write answer"
                />
                <IconButton
                icon={<DeleteIcon/>}
                bg="none"
                w={{
                    base:"20px",
                    md:"40px"
                }}

                h={{
                base:"20px",
                md:"40px"
                }}
                onClick={remove}
                color="red.500"
                aria-label="write answer"
                />

                </HStack>
                <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader p={2}></ModalHeader>
                    <ModalBody>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={ postAnswer } colorScheme="orange" mr={3}>
                        Post
                        </Button>
                        <Button onClick={onClose} variant="ghost">Close</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

                { 
                    props.post.answers.map(( post, index)=> (
                        <Stack direction="column" key={index}>
                            <AnswerHeader post = { post }/>
                            <Text px="6">
                            <>
                                { parse(post.answer) }
                            </>
                            </Text>
                         </Stack>
                    ))
                }
                
            </Stack>
    )
}

export default MyPostBody
