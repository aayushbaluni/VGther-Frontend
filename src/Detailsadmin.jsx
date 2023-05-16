import { Checkbox,Box, Button, Center,Spinner, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import axios  from 'axios'
import { useToast } from '@chakra-ui/react';

const Details = ({isLogedin}) => {
  const toast = useToast();
    const navigation = useNavigate();
    useEffect(() => {
      window.scroll(0,0)
          if (isLogedin.mobile.number === null) {
            navigation('/eventsadmin');
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
const number=new Array(location.state).fill(0);
const [code,setCode] = useState('NA');
const [ticket, setTicket] = useState("")
const [isChecked, setIsChecked] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
const HandleChange=async(e)=>{
    e.preventDefault();
    setTicket("");
    setIsLoading(true)
    const num=number[0];
    let values = document.querySelectorAll("#capture")
    let l = values.length;
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
            checkoutHandler(times*300,notes,num)
        }
        else
        checkoutHandler(times*350,notes,num)
    }
}
const checkoutHandler=async(amount,notes,num)=>{
    const {data}=await axios.post('https://v-gther-server-1.vercel.app/api/checkout',{
        amount,
        notes
    });
    console.log("yup");
   const order=data.order;
    console.log(data);
   axios.post("https://v-gther-server-1.vercel.app/api/paymentverificationadmin",{isLogedin,razorpay_order_id:order.id,referer:code,amount:order.amount/100,parent_number:`91${num}`}).then((response) =>{
    setIsLoading(false) 
   if(response.data.status===200){
      console.log(response.data.ticket_id);
      setTicket(response.data.ticket_id)
    }
    else if(response.data.status===404){
      toast({
        title: 'Login Expired',
        description: 'Please Login and try again',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: 'Error Occured',
        description: 'Please Try again later',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });

    }
    
   
   
   })
  
    
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
          {
            isLoading?
            <Spinner size="lg" color="white" marginTop="10" />:""
          }
          
          {ticket.length>0?<ErrorMessage alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']}  message={`Ticket Generated with Ticket ID:- ${ticket}`} error={"success"}/>:""}
          {ticket.length>0?<Link to={`/eventsadmin`}>
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