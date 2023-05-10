import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  PinInput,
  PinInputField,
  Text,
  Button,
  Alert
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function OtpBox() {

  const number=useLocation().state.phone;
    const [otp, setotp] = useState(new Array(4).fill(0));
    useEffect(() => {
      
        const sendCode=async()=>{
          const {data}= await axios.post('https://v-gther-server-47gh.vercel.app/verify/getcode',{
            number
          });
          Alert(data);
        };
        sendCode();
    
     
    })
    
  return (
   <Box minH={'calc(100vh)' } bgColor={'black'} minW={'100%'} textColor={'white'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
     <Flex width="100%" align="center" justifyContent="center" alignItems={'center'}>
      <Box
        p={8}
        maxWidth="500px"
        minW={'50%'}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        alignItems={'center'}
        justifyContent={'center'}
        display={'flex'}
        flexDir={'column'}
      >
       <Heading textColor={'white'}> Generated OTP </Heading>
       <Text marginTop={'4'} textColor={'white'}>Enter the OTP recieved on Mobile Phone</Text>
       <Box marginTop={'10'} >
       <PinInput otp colorScheme='white' focusBorderColor='white' >
        <PinInputField onChange={(e)=>otp[0]=e.target.val}  value={otp[0]}  marginRight={'4'}/>
        <PinInputField  onChange={(e)=>otp[1]=e.target.val}  value={otp[1]} marginRight={'4'}/>
        <PinInputField  onChange={(e)=>otp[2]=e.target.val}  value={otp[2]}  marginRight={'4'}/>
        <PinInputField  onChange={(e)=>otp[3]=e.target.val}  value={otp[3]} marginRight={'4'}/>
      </PinInput>

       </Box>
       <Button marginTop={'10'} variant={'ghost'} color={'gray'}> Submit</Button>
      </Box>
    </Flex>
   </Box>
  );
}