import React, { useState } from 'react'
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
  } from "@chakra-ui/react"
import { useLazyQuery } from '@apollo/client'

import { SEARCH_QUESTIONS } from '../Graphql/Queries'
import Result from './Result'

function SearchBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState("")
    const [ searchQuestions, { data }] = useLazyQuery(SEARCH_QUESTIONS);
    const [results, setResults] = useState([])

    function getSearchResult(event) {
        setValue(event.target.value)
        searchQuestions({ variables: { question: value}})
        data === undefined ? setResults([]) : setResults(data.getSearchResult)
    }

    return (
        <>
        <InputGroup 
        width="300px"
        >
            <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
            />
            <Input 
                type="text"
                variant="flushed"
                placeholder="Search here..."
                focusBorderColor="orange.400"
                onClick={onOpen}
                onChange={onOpen}
            />
        </InputGroup>
        <Modal isOpen={isOpen} size="md" onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
            <Input 
                type="text"
                value={value}
                variant="flushed"
                placeholder="Search questions..."
                focusBorderColor="orange.400"
                onChange={getSearchResult}
            />
            </ModalHeader>
            <ModalBody maxHeight="60">
               {
                   results.map((result, index)=> (
                       <Result result={result} key={index}/>
                    ))
               }
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default SearchBar
