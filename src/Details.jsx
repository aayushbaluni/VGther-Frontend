import { Checkbox,Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

import axios  from 'axios'


const Details = ({isLogedin}) => {
    const navigation = useNavigate();
    useEffect(() => {
    if(isLogedin.mobile.number!==null){
        }
        else{ 
            navigation('/');
            alert("PLease login by clicking on the floting window")
        }
    },[navigation]);
    const [notes, setnotes] = useState([]);
const  location=useLocation();
const times=location.state;
const name= Array(location.state).fill('');
const codes= Array(location.state).fill('');
const number=new Array(location.state).fill(0);


const [key, setkey] = useState("")
const getKey=async()=>{
    const {data} =await axios.post("https://v-gther-server-1.vercel.app/api/key");
    setkey(data.key);
    console.log(key)
}

const HandleChange=async()=>{
    const num=isLogedin.mobile.number  ;
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
    if(times%5===0){
        checkoutHandler(times*300)
    }
    else
    checkoutHandler(times*350)
}
const checkoutHandler=async(amount)=>{
    const num=isLogedin.mobile.number;

    getKey();
    const {data}=await axios.post('https://v-gther-server-1.vercel.app/api/checkout',{
        amount,
        notes
    });
   const order=data.order;
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
        callback_url:`https://v-gther-server-1.vercel.app/api/paymentverification?parent_number=${num}&referer=${codes[1]}`,
        
        profile:{
            name:name[0],
            email:name[1],
            contact:isLogedin.mobile.number.toString().slice(2,12)   
        },
        notes:{
            "address":"Jaipur Rajasthan 302015"
        },
        theme:{
            "color":"#121212"
        }

    };
    const razor=new window.Razorpay(options);
    razor.open();
    
}
const [haveCoupon, setHaveCoupon] = useState(false);
const [haveReferralCode, setHaveReferralCode] = useState(false);
const verifyReferal = ()=>{

}
const handleCouponChange = (event) => {
  setHaveCoupon(event.target.checked);
};

const handleReferralCodeChange = (event) => {
  setHaveReferralCode(event.target.checked);
};
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
            <Box display="flex" alignItems="center" marginTop={4}>
            <Checkbox colorScheme="white" defaultIsChecked onChange={handleCouponChange}>
              I have a coupon
            </Checkbox>
            {haveCoupon && (
              <>
                <Input marginLeft={2} variant={'outline'} color={'white'} placeholder='Enter Coupon' focusBorderColor='white' textColor={'white'} w={['60%', '30%']} />
                <Button marginLeft={2} colorScheme='teal' variant="ghost">
                  Apply
                </Button>
              </>
            )}
          </Box>
          <Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox colorScheme="white" defaultIsChecked onChange={handleReferralCodeChange}>
              I have a referral code
            </Checkbox>
            {haveReferralCode && (
              <>
                <Input marginLeft={2} variant={'outline'} color={'white'} placeholder='Enter Referral Code' onChange={(e)=>codes[1]=e.target.value} focusBorderColor='white' textColor={'white'} w={['60%', '30%']} />
                <Button marginLeft={2} colorScheme='teal' variant="ghost" onClick={verifyReferal}>
                  Apply
                </Button>
              </>
            )}
          </Box>
          <Box display="flex" alignItems="center" marginTop={4}>
            <Checkbox colorScheme="white" defaultIsChecked>
              I agree to the terms and conditions
            </Checkbox>
          </Box>
            <Button alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']} onClick={HandleChange}> Proceed For Payment of Rs. {times%5==0?300*times:350*times} </Button>
        </Box>


    </Box>

  )
}

export default Details