import {
  Box,
  Button,

  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import axios from "axios";


export default function Contact() {
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(){
    const {data}=await axios.post("http://localhost:80",{
        name:name,
        email:email,
        message:message
      });
    console.log(data);
    // if(response.status!==200){
    //   setError("Failed to Send Message","error")
    // }
    // else{
    //   setError("Message Sent","success")
    //   console.log(response.status)
      
    // }
    
  }
  return (
              <Box

              width={isMobile?"19rem":"25rem"}
                bg={useColorModeValue('black', 'black')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('white', 'black')}
                shadow="base">
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>

                    <InputGroup>
                      <InputLeftElement children={<BsPerson />} />
                      <Input type="text" name="name" placeholder="Your Name" onChange={event => setName(event.currentTarget.value)} />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>

                    <InputGroup>
                      <InputLeftElement children={<MdOutlineEmail />} />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={event => setEmail(event.currentTarget.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>

                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={6}
                      resize="none"
                      onChange={event => setMessage(event.currentTarget.value)}
                    />
                  </FormControl>

                  <Button
                    // colorScheme="blue"
                    bg="greay.400"
                    // color="white"
                    variant={'ghost'} textColor={'white'} colorScheme='black'
                    _hover={{
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                      border: '2px solid #6EE7B7',
                      borderRadius: '4px',
                    }}
                    onClick={handleSubmit}
                    isFullWidth>
                    Send Message
                  </Button>
                  {error && <ErrorMessage message={error} />}
                </VStack>
              </Box>
           

  );
}