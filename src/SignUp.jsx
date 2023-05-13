import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/react';

import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';
const userLogin=({email,password})=>{
    console.log(email + password)
}

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation=useNavigate();
  const handleSubmit = async () => {
    navigation('/verify',{
      state:{
        name:email,
        phone:password,
        type:'register'
      }
    })
   
  };


  return (
   <Box minH={'calc(100vh)' } bgColor={'black'} textColor={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
     <Flex width="full" align="center" justifyContent="center" minH={'calc(50vh)'}>
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        minH={'calc(50vh)'}
      >
       
          <>
            <Box textAlign="center">
              <Heading>SignUp</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="xyz"
                    size="lg"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Mobile Number  </FormLabel>
                  <InputGroup>
                    <Input
                      type='number'
                      placeholder="90790XXXXX"
                      size="lg"
                      onChange={event => setPassword(event.currentTarget.value)}
                    />
                  
                  </InputGroup>
                </FormControl>
                <Button
                 colorScheme='grey'
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                  
                >
                 
                    Proceed to Verify
                 
                </Button>
              </form>
            </Box>
          </>
      </Box>
    </Flex>
   </Box>
  );
}