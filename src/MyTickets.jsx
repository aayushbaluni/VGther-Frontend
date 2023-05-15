import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';

import QRCode from 'react-qr-code';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import img1 from "./assets/vGatherbackWhite.png";
const MyTickets = ({isLogedin}) => {
  const searchQuerry=useSearchParams()[0];
  const id=searchQuerry.get('id');
  const [details, setdetails] = useState([])
  const navigation = useNavigate()
  // if(isLogedin.length>0){
      
  // }
  // else{
    
  //     navigation('/');
  //     // alert("PLease login by clicking on the floting window")
  // }
  useEffect(() => {
    var getData=async()=>{
      const num=isLogedin.mobile.number;
      const {data}=await axios.post("https://v-gther-server-1-ik6fk8cnm-aayushbaluni.vercel.app/api/getall",{
        number:num
      });
      const val=[];
     data.map((v,i)=>{
      v.tickets.map((a,ind)=>{
        val.push(a);
      })
     })
      console.log(val);
     setdetails(val);
    }
    if(isLogedin.mobile.number===null){
      navigation('/');
      alert("PLease login by clicking on the floting window")
    }
    else{ 
      getData();
    }
    
    
    
    
  },[]);

    return (
   <>
   <Box minH={'calc(100vh)'} w={'100%'} bgColor={'black'}  display={'flex'} flexDir={'column'} justifyContent={'start'} alignItems={'center'} padding={'10'}>
    <Heading textColor={'white'} textDecor={'underline'}>Tickets Information</Heading>
    {details.map((val,i)=><PaymentDetails val={val} />)}
   </Box>
   </>
  )
}


function PaymentDetails({val}){
 
  console.log(val);
  return <Box w={'80%'} minH={'calc(30vh)'} border={'1px solid white'} borderRadius={'25px'} marginTop={'10'}  display={'flex'} flexDir={['column-reverse','row']} alignItems={'center'} justifyContent={'space-between'} bgImage={'linear-gradient(to bottom right, black,gray)'}>
        <Box  w={['100%','50%']} padding={'10'}>
          <Text color={'white'} marginTop={'-10'} marginBottom={'10'} textDecor={'underline'}>V-Gther</Text>
          
          <Heading textColor={'white'} fontSize={'3vh'}> {val.name}</Heading>
          <Text textColor={'white'} marginTop={'5'}  fontSize={'1.9vh'}> {val.number}</Text>
        </Box>
        <br color='white'/>
        <Box  padding={'5'} paddingTop={'10'} h={'calc(20vh)'}  w={'100%'} alignItems={'center'} justifyContent={'center'}  display={'flex'}  marginTop={'15'}>
          <Box padding={'5' } bgColor={'white'}>
          <QRCode value={val.ticket_number} size={'15vh'} bgColor='white'/>
          </Box>
        </Box>

  </Box>
}
export default MyTickets