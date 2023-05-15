import React, { useState,useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
const userLogin=({email,password})=>{
    console.log(email + password)
}

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation=useNavigate();
  const handleSubmit = async () => {
    navigation('/verify',{
      state:{
        name:'',
        phone:password,
        type:"Login"
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
            <Box textAlign="center" justifyContent={'space-between'}>
              <Heading>LogIn</Heading>
            </Box>
            <Box my={4} textAlign="left" display={'flex'} flexDir={'column'} justifyContent={'center'} minH={'50%'}>
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
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
              <Box w={'100%'} paddingTop={'6'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                <Link to={'/signup'}>
                <Button variant={'unstyled'} >
                 <Text decoration={'underline'} > Not a User?  SignUp </Text>
                 </Button>
                 </Link>
                   </Box>
            </Box>
          </>
        
      </Box>
    </Flex>
   </Box>
  );
}