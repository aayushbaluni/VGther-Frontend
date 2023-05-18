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
const [collegeStudents, setCollegeStudents] = useState([]);
const [amount , setAmount] = useState(0);


const handleCollegeSelect = (index) => {
  if(isChecked)
  setIsChecked(false);

  setCollegeStudents((prevStudents) => {
    const updatedStudents = [...prevStudents];
    updatedStudents[index] = !updatedStudents[index];
    return updatedStudents;
  });
};
  const handleCheckboxChange = () => {
    var amount=0;
    for(var i=0;i<name.length;i++){
      if(collegeStudents[i]){
        amount+=350;
      }
      else{
        amount+=500;
      }
    }
    setAmount(amount)
    setIsChecked(!isChecked);
  };
  function handleDownload() {
    // Get the canvas element
    const canvas = document.querySelectorAll("canvas");

    // Get the data URL of the canvas image
    const dataURL = canvas[0].toDataURL();
    // Create a download link
    const link = document.createElement('a');
    link.download = 'qrcode-vgthr.jpeg';
    link.href = dataURL;

    link.click();
  }
const HandleChange=async(e)=>{
    e.preventDefault();
    setTicket("");
    setIsLoading(true)
    
    let values = document.querySelectorAll("#capture")
    let l = values.length;
    var num=parseInt(document.querySelectorAll("#capture")[1].value);
    console.log(num);
    var jSon = [];
    var kkk=0;
    for (var i = 0; i < l - 1;) {
      if(collegeStudents[kkk]){
        jSon.push(
            {
                name: values[i].value,
                number: parseInt(values[i + 1].value),
                college_id: values[i + 2].value,
                parent_number:num.toString()
            }
        )
        i += 3
        }
        else{
          jSon.push(
            {
                name: values[i].value,
                number: parseInt(values[i + 1].value),
                college_id: "NA",
                parent_number:num.toString()
            }
        )
        i += 2
        }
        kkk+=1
        
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
    parent_number: `${isLogedin.mobile.number}`
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
axios.post("https://v-gther-server-1.vercel.app/user/coupon",{
    code:code
  }).then((response) =>{
    if(response.data.status==200){
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
  })


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
        {name.map((item, i) => (
          <Box
            key={i}
            minH={'calc(30vh)'}
            w={'100%'}
            border={'1px solid white'}
            display={'flex'}
            flexDir={'column'}
            borderRadius={'23px'}
            padding={'10'}
            marginBottom={'10'}
          >
            <Text textColor={'white'}>Person {i + 1}</Text>
            <Input
              id="capture"
              type="text"
              marginTop={'10'}
              required
              variant={'outline'}
              color={'white'}
              placeholder="Enter Name"
              focusBorderColor="white"
              textColor={'white'}
              w={['80%', '30%']}
            />
            <Input
              id="capture"
              type="tel"
              pattern="[0-9]{10}"
              marginTop={'10'}
              required
              variant={'outline'}
              color={'white'}
              placeholder="Enter Phone Number"
              focusBorderColor="white"
              textColor={'white'}
              w={['80%', '30%']}
            />
            <Checkbox
              colorScheme="white"
              defaultIsChecked={collegeStudents[i]}
              color="white"
              onChange={() => handleCollegeSelect(i)}
            >
              This person is an Arya college student
            </Checkbox>
            {collegeStudents[i] && (
              <Input
                id="capture"
                type="text"
                marginTop={'10'}
                required
                variant={'outline'}
                color={'white'}
                placeholder="Enter College Id"
                focusBorderColor="white"
                textColor={'white'}
                w={['80%', '30%']}
              />
            )}
          </Box>
        ))}
<Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox colorScheme="white" color="white" isDisabled={code!=="NA"} defaultIsChecked onChange={handleReferralCodeChange}>
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
      isChecked={isChecked}
      color="white"
      onChange={handleCheckboxChange}
    >
      I agree to the website terms and conditions
    </Checkbox>
          </Box>
          
          {
          //times%5==0?300*times:350*times
          isChecked&&ticket.length<=0?<Flex padding="5" justifyContent="center" alignItems="center" flexDirection={"column"}>
          <QRCode value={`upi://pay?pa=BHARATPE09912886953@yesbankltd&pn=BharatPe Merchant&am=${code=="NA"?times%5==0?amount-50*times:amount:times%5==0?amount-70*times:amount-20*times}&cu=INR&tn=Pay to VGTHR`} />
          <Text color={'white'} textAlign={"center"}>Kindly pay through the above qr code and paste the UPI Reference No/UTR ID in the below box </Text>
                  <Button
                    // colorScheme="blue"
                    bg="greay.400"
                    // color="white"
                    variant={'ghost'} textColor={'white'} colorScheme='black'
                    onClick={handleDownload}
                    isFullWidth>
                    Download QrCode
                  </Button>
          <Input id="txid" type="text" marginTop={'10'} required  variant={'outline'} color={'white'} placeholder='Enter UPI Reference No/UTR ID' focusBorderColor='white' textColor={'white'}  w={['80%','30%']}/>
          {ticket.length>0?<Link to={`/events`}>
          <Button alignItems={'center'} alignSelf={'center'} marginLeft={['auto','40%']} > Go Back </Button>
            </Link>:<><Button type="submit" alignItems={'center'} alignSelf={'center'} marginTop={"10px"} isDisabled={!isChecked} > Buy Ticket of Rs. {code=="NA"?times%5==0?amount-50*times:amount:times%5==0?amount-70*times:amount-20*times} </Button>{
            isLoading?
            <><Spinner alignItems={'center'} alignSelf={'center'} size="lg" color="white" marginTop="10" /><br></br></>:""
          }</>}
        </Flex>:""}
          {ticket.length>0?<ErrorMessage alignItems={'center'} alignSelf={'center'}  message={`Ticket Generated with Ticket ID:- ${ticket}`} error={"success"}/>:""}
          
          
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