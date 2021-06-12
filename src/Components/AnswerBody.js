import { Text, Stack } from '@chakra-ui/layout'
import { FaRegEdit} from "react-icons/fa"
import { Button, IconButton } from '@chakra-ui/button'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml, {  } from "draftjs-to-html"
import { useMutation } from '@apollo/client';
import parse from 'html-react-parser'
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

import AnswerHeader from './AnswerHeader'
import { POST_ANSWER } from '../Graphql/Mutations'


function AnswerBody(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [answer, setAnswer] = useState("")
    const [sendAnswer] = useMutation(POST_ANSWER);
    const userId = localStorage.get('userId');

    function onEditorStateChange (editorState){
        setEditorState(editorState)
        setAnswer(draftToHtml(convertToRaw(editorState.getCurrentContent())))
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
                        <Stack direction="column">
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

export default AnswerBody
