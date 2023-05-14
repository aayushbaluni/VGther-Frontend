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
import { useLocation, useNavigate } from 'react-router-dom';

export default function OtpBox() {

  const number=useLocation().state.phone;
  const type=useLocation().state.type;
  const name=useLocation().state.name;
    const [otp, setotp] = useState(new Array(6).fill(0));

    const navigation=useNavigate();
    useEffect(() => {
      
        const sendCode=async()=>{
          const {data}= await axios.post('https://v-gther-server-1-ik6fk8cnm-aayushbaluni.vercel.app/verify/getcode',{
            number
          });
          console.log(data);
        };
        sendCode();
    
     
    },[]);
  const  handleSubmit=async()=>{
      let code=otp[0];
      let i=0;
      for( i=1;i<6;i++){
        code+=otp[i];
      }
      console.log(code)
     try {
      const {data}=await axios.post('https://v-gther-server-1-ik6fk8cnm-aayushbaluni.vercel.app/verify/verifycode',{
        number,
       code

     });
     console.log(data);
     if(data!= 'approved'){
      if(data==='error')alert("Please try after some time");
       else alert('Wrong OTP');
     return;
     }

     if(type=='register'){
      try {
        const {data}=await axios.post('https://v-gther-server-1-ik6fk8cnm-aayushbaluni.vercel.app/user/register',{
        number:number,
        name:name                
      });
      
      console.log(data);
      
        try{
          localStorage.setItem("number",number);
          navigation('/');
        }
        catch(e){
          alert("Error Creating User.")
        }
      } catch (error) {
        alert("Error Saving User.")
      }
    }
    else{
      try {
        const {data}=await axios.post('https://v-gther-server-1-ik6fk8cnm-aayushbaluni.vercel.app/user/login',{
        number:number,           
      });
      
      console.log(data);
        try{
          localStorage.setItem("number",number);
          navigation('/');
        }
        catch(e){
          alert("Error Logging  User.")
        }
      } catch (error) {
        alert("Error Loggin in User.")
      }
    }

     } catch (error) {
      alert("Please try after some time...");
      console.log(error);
      return
     }
           
    }
    
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
        <PinInputField onChange={(e)=>{
          let newArr=[...otp];
          newArr[0]=e.target.value;
          setotp(newArr);
        }}  value={otp[0]}  marginRight={'4'}/>
        <PinInputField  onChange={(e)=>{
          let newArr=[...otp];
          newArr[1]=e.target.value;
          setotp(newArr);
        }}  value={otp[1]} marginRight={'4'}/>
        <PinInputField  onChange={(e)=>{
          let newArr=[...otp];
          newArr[2]=e.target.value;
          setotp(newArr);
        }}  value={otp[2]}  marginRight={'4'}/>
        <PinInputField  onChange={(e)=>{
          let newArr=[...otp];
          newArr[3]=e.target.value;
          setotp(newArr);
        }}  value={otp[3]} marginRight={'4'}/>
        <PinInputField  onChange={(e)=>{
          let newArr=[...otp];
          newArr[4]=e.target.value;
          setotp(newArr);
        }}  value={otp[4]} marginRight={'4'}/>
        <PinInputField  onChange={(e)=>{
          let newArr=[...otp];
          newArr[5]=e.target.value;
          setotp(newArr);
        }}  value={otp[5]} marginRight={'4'}/>
      </PinInput>

       </Box>
       <Button marginTop={'10'} variant={'ghost'} color={'gray'} onClick={handleSubmit}> Submit</Button>
      </Box>
    </Flex>
   </Box>
  );
}