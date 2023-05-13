import { Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

import axios  from 'axios'


const Details = () => {
    

    const [notes, setnotes] = useState([]);
const  location=useLocation();
const times=location.state;
const name= Array(location.state).fill('');
const number=new Array(location.state).fill(0);


const [key, setkey] = useState("")
const getKey=async()=>{

    const {data} =await axios.post("https://v-gther-server-47gh.vercel.app/api/key");
    setkey(data.key);
    console.log(key)
}

const HandleChange=async()=>{
    const num=await localStorage.getItem("number")  ;
    console.log(num);
    if(notes.length==0){

    
    for (let i = 0; i < name.length; i++) {
       
       var temp={
        name:name[i],
        number:number[i],
        parent_number:num.toString(),
       };
       if(i==0){
        notes[i]=temp;
    }
     else  notes.push(temp);
    }
}
    console.log(notes)
    checkoutHandler(times*350)
}
const checkoutHandler=async(amount)=>{
    const num=await localStorage.getItem("number")  ;

    getKey();
    const {data}=await axios.post('https://v-gther-server-47gh.vercel.app/api/checkout',{
        amount,
        notes
    });
   const  order=data.order;
    console.log(data);
    console.log(window)
    const options={
        key:key,
        amount:order.amount,
        currency:"INR",
        name:"V-GTHER",
        description:"For Ticket Booking",
        image:"",
        order_id:order.id,
        callback_url:`https://v-gther-server-47gh.vercel.app/api/paymentverification?parent_number=${num}`,
        
        profile:{
            name:"Ayush Baluni",
            email:"abaluni6@gmail.com",
            contact:"9079073202"   
        },
        notes:{
            "address":"RazorPay Coorporate Office"
        },
        theme:{
            "color":"#121212"
        }

    };
    const razor=new window.Razorpay(options);
    razor.open();
    
}

  return (
    <Box minH={'calc(100vh)'} w={'100%'} bgColor={'black'} display={'flex'} flexDir={'column'} justifyContent={'start'} alignItems={'center'} padding={10}>
        <Heading textColor={'white'}  fontSize={'3vh'} textDecor={'underline'}>Enter Details of Onbording Peoples</Heading>
        <Text color={'white'} fontSize={'1.8vh'} paddingTop={'2'}>Please Make sure that the details are same as on id's </Text>
        <Box minH={'calc(80vh)'} marginTop={10} w={'90%'}>
            {
              name.map((item,i) =>
                <Box minH={'calc(30vh)'} w={'100%'} border={'1px solid white'} display={'flex'}  flexDir={'column'} borderRadius={'23px'} padding={'10'} marginBottom={'10'}>
                    <Text textColor={'white'}>Person {i+1}</Text>
                    <Input marginTop={'10'}  variant={'outline'} color={'white'} placeholder='Enter Name' focusBorderColor='white' textColor={'white'}  w={['80%','30%']} onChange={(e)=>name[i]=e.target.value}/>
                    <Input marginTop={'10'}  variant={'outline'} color={'white'} placeholder='Enter Phone Number' focusBorderColor='white' textColor={'white'}  w={['80%','30%']} onChange={(e)=>number[i]=e.target.value}/>

                </Box>
              )
            }
            <Button alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']} onClick={HandleChange}> Proceed For Payment of Rs. {350*times} </Button>
        </Box>


    </Box>
  )
}

export default Details