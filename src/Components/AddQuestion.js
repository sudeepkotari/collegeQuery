import { Button } from '@chakra-ui/button'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml, {  } from "draftjs-to-html"
import { useMutation } from '@apollo/client';
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

import { ADD_QUESTION } from '../Graphql/Mutations'


function AddQuestion() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [question, setQuestion] = useState("")
    const [addQuestion] = useMutation(ADD_QUESTION);
    const userId = localStorage.get('userId');

    function onEditorStateChange (editorState){
        setEditorState(editorState)
        setQuestion(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    function post(){
        addQuestion({ variables: { 
            user: userId,
            question: question
         }})
        onClose()
    }

    return (
        <>
        <Button onClick={onOpen} size="sm" w="100%" variant="ghost">Add Question</Button>
        
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
                <Button onClick={ post } colorScheme="orange" mr={3}>
                Post
                </Button>
                <Button onClick={onClose} variant="ghost">Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default AddQuestion
