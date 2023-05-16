import { Checkbox,Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

import axios  from 'axios'

import { useToast } from '@chakra-ui/react';
const Details = ({isLogedin}) => {
    
    window.scroll(0,0)
    const toast = useToast();
    const navigation = useNavigate();
    useEffect(() => {
        //isLogedin.mobile.number===null
    if(true){
        
        navigation('/');
          toast({
            title: 'Not Authorized',
            description: 'Not Authorized',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
    }
    },[isLogedin, navigation, toast]);
    const [notes, setnotes] = useState([]);
const  location=useLocation();
const times=location.state;
const name= Array(location.state).fill('');
const number=new Array(location.state).fill(0);
const [code,setCode] = useState('NA');
const [key, setkey] = useState("")
const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
const getKey=async()=>{
    const {data} =await axios.post("https://v-gther-server-1.vercel.app/api/key");
    setkey(data.key);
    console.log(key)
}

const HandleChange=async(e)=>{
    e.preventDefault();
    
    const num=919413465367;
    console.log(num);
    let values = document.querySelectorAll("#capture")
    let l = values.length;
    console.log(values);
    var jSon = [];
    for (var i = 0; i < l - 1;) {
        jSon.push(
            {
                name: values[i].value,
                number: parseInt(values[i + 1].value),
                parent_number:num.toString()
            }
        )
        i += 2
    }
    console.log(jSon);
    console.log(l);
    setnotes(jSon);
    if(notes.length!==0){
        console.log(notes)
        if(times%5===0){
            checkoutHandler(times*300)
        }
        else
        checkoutHandler(times*350)
    }
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
        callback_url:`https://v-gther-server-1.vercel.app/api/paymentverification?parent_number=${num}&referer=${code}`,
        
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
var code = document.getElementById("refer").value
setCode(code);
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
        <form onSubmit={HandleChange} className='invoice-form'>
            {
              name.map((item,i) =>
                <Box minH={'calc(30vh)'} w={'100%'} border={'1px solid white'} display={'flex'}  flexDir={'column'} borderRadius={'23px'} padding={'10'} marginBottom={'10'}>
                    <Text textColor={'white'}>Person {i+1}</Text>
                    <Input id="capture" type="text" marginTop={'10'} required  variant={'outline'} color={'white'} placeholder='Enter Name' focusBorderColor='white' textColor={'white'}  w={['80%','30%']}/>
                    <Input id="capture" type="tel" pattern="[0-9]{10}" marginTop={'10'} required  variant={'outline'} color={'white'} placeholder='Enter Phone Number' focusBorderColor='white' textColor={'white'}  w={['80%','30%']}/>
                </Box>
              )
            }
<Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox colorScheme="white" color="white" defaultIsChecked onChange={handleReferralCodeChange}>
              I have a referral code
            </Checkbox>
            {haveReferralCode && (
              <>
                <Input isDisabled={code!=="NA"} marginLeft={2} id="refer" variant={'outline'} color={'white'} placeholder='Enter Referral Code' focusBorderColor='white' textColor={'white'} w={['60%', '30%']} />
                
                {code!="NA"?<ErrorMessage message={"Applied"} error={"success"}/>:<Button marginLeft={2} colorScheme='teal' variant="ghost" onClick={verifyReferal}>
                  Apply
                </Button>}
              </>
            )}
          </Box>
          
<Box display="flex" alignItems="center" marginTop={4}>
          <Checkbox
      colorScheme="white"
      defaultIsChecked={isChecked}
      color="white"
      onChange={handleCheckboxChange}
    >
      I agree to the website terms and conditions
    </Checkbox>
          </Box>

            <Button type="submit" alignItems={'center'} alignSelf={'center'} isDisabled={!isChecked} marginLeft={['auto','40%']} > Proceed For Payment of Rs. {times%5==0?300*times:350*times} </Button>
            </form>
            {/* <Box display="flex" alignItems="center" marginTop={4}>
            <Checkbox colorScheme="white" color="white" defaultIsChecked onChange={handleCouponChange}>
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
          </Box> */} 
        </Box>


    </Box>

  )
}

export default Details