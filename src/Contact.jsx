import {
  Box,
  Button,
  Spinner,
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
import { useToast } from '@chakra-ui/react';

export default function Contact() {
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(){
    setIsLoading(true)
    const {data}=await axios.post("https://v-gther-server-1.vercel.app/user/message",{
        name:name,
        email:email,
        message:message
      });
    console.log(data);
    setIsLoading(false)
    if(data=="ok"){
      setName('')
      setEmail('')
      setMessage('')
      try{
        document.querySelectorAll("input, textarea").forEach((x) => x.value = '');
      }
      catch(x){}
      toast({
        title: 'Success',
        description: 'Message Sent Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: 'Error',
        description: 'Message send failed',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      
    }
    
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
                  {
            isLoading?
            <><Spinner alignItems={'center'} alignSelf={'center'} size="lg" color="white" marginTop="10" /><br></br></>:""
          }
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
                </VStack>
              </Box>
           

  );
}