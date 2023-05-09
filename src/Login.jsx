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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation=useNavigate();
  const handleSubmit = async () => {
    navigation('/verify',{
      state:{
        name:email,
        phone:password
      }
    })
   
  };


  return (
   <Box minH={'calc(100vh)' } bgColor={'black'} textColor={'white'} justifyContent={'center'} alignItems={'center'}>
     <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>{email} logged in!</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Sign out
            </Button>
          </Box>
        ) : (
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
        )}
      </Box>
    </Flex>
   </Box>
  );
}