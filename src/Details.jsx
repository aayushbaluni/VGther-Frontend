import { Checkbox,Box,Flex,Image, Button, Center,Spinner, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import axios  from 'axios'
import { QRCode } from 'react-qrcode-logo';
import { useToast } from '@chakra-ui/react';

const Details = ({isLogedin}) => {
  const toast = useToast();
    const navigation = useNavigate();
    useEffect(() => {
      window.scroll(0,0)
          if (isLogedin.mobile.number === null) {
            navigation('/events');
            toast({
              title: 'Login Required',
              description: 'Please login by clicking on the floating window',
              status: 'warning',
              duration: 5000,
              isClosable: true,
            });
          }
       
    },[isLogedin, navigation, toast]);
const  location=useLocation();
const times=location.state;
const name= Array(location.state).fill('');
const [code,setCode] = useState('NA');
const [ticket, setTicket] = useState("")
const [isChecked, setIsChecked] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const refCodes = ['7IHZ', 'Y8BK', 'A49L', 'LMZH', 'LRVV', 'ZC88', 'L0BJ', 'SPZW', 'SNGH', '09AG', '3PBY', 'IEN0', '8N6J']

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
const HandleChange=async(e)=>{
    e.preventDefault();
    setTicket("");
    setIsLoading(true)
    
    let values = document.querySelectorAll("#capture")
    let l = values.length;
    var num=parseInt(document.querySelectorAll("#capture")[1].value);
    console.log(num);
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
    var notes = jSon;
    if(notes.length!==0){
        console.log(notes)
        if(times%5===0){
            checkoutHandler(times*300,notes)
        }
        else
        checkoutHandler(times*350,notes)
    }
}
const checkoutHandler=async(amount,notes)=>{
  try{

  
    const {data}=await axios.post('https://v-gther-server-1.vercel.app/api/checkout',{
        amount,
        notes
    });
    console.log("yup");
    console.log(notes[0].parent_number);
   const order=data.order;
   var txid = document.getElementById("txid").value
   axios.post("https://v-gther-server-1.vercel.app/api/paymentverification",{
    razorpay_order_id: order.id,
    referer: code,
    razorpay_payment_id: txid,
    parent_number: `91${notes[0].parent_number}`
  }).then((response) =>{
   setIsLoading(false) 
   if(response.data.status===200){
      console.log(response.data.ticket_id);
      setTicket(response.data.ticket_id)
    }
    else if(response.data.status===403){
      toast({
        title: 'Amount Didnt Match',
        description: 'You didnt paid the exact amount shown on the page',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    else if(response.data.status===401){
      toast({
        title: 'Ticket Already Exists',
        description: 'Ticket with this payment id already exists',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    else if(response.data.status===402){
      toast({
        title: 'No Payment received',
        description: 'Please pay the respected amount to the given qr code first',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: 'Error Occured',
        description: 'Please Try again later or contact the support team',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });

    }
    
   
   
   })
  
  }
  catch(err){
    setIsLoading(false)
    toast({
      title: 'Error',
      description: 'Error occurred kindly resubmit the request',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  } 
}
const [haveCoupon, setHaveCoupon] = useState(false);
const [haveReferralCode, setHaveReferralCode] = useState(false);
const verifyReferal = ()=>{
var code = document.getElementById("refer").value
if(refCodes.includes(code)){
  setCode(code);
}
else{
  toast({
    title: 'Invalid referal code',
    description: 'Please enter correct referal code',
    status: 'warning',
    duration: 5000,
    isClosable: true,
  });
}

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
          {
            isLoading?
            <><Spinner alignItems={'center'} alignSelf={'center'} size="lg" color="white" marginTop="10" /><br></br></>:""
          }
          {isChecked&&ticket.length<=0?<Flex padding="5" justifyContent="center" alignItems="center" flexDirection={"column"}>
          <QRCode value={`upi://pay?pa=BHARATPE09912886953@yesbankltd&pn=BharatPe Merchant&am=${times%5==0?300*times:350*times}&cu=INR&tn=Pay to VGTHR`} />
          <Input id="txid" type="text" marginTop={'10'} required  variant={'outline'} color={'white'} placeholder='Enter TransactionId/RefId' focusBorderColor='white' textColor={'white'}  w={['80%','30%']}/>
        </Flex>:""}
          {ticket.length>0?<ErrorMessage alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']}  message={`Ticket Generated with Ticket ID:- ${ticket}`} error={"success"}/>:""}
          
          {ticket.length>0?<Link to={`/events`}>
          <Button alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']} > Go Back </Button>
            </Link>:<Button type="submit" alignItems={'center'} alignSelf={'center'} isDisabled={!isChecked} marginLeft={['auto','40%']} > Buy Ticket of Rs. {times%5==0?300*times:350*times} </Button>}
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