import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Spinner,useMediaQuery,Flex } from '@chakra-ui/react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import ErrorMessage from './ErrorMessage';
import { useToast } from '@chakra-ui/react';

const MyTickets = ({ isLogedin }) => {
  const toast = useToast();
  const searchQuerry = useSearchParams()[0];
  const id = searchQuerry.get('id');
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    window.scroll(0,0)
    const fetchData = async () => {
      try {

        if (isLogedin.mobile.number === null) {
          navigation('/');
          toast({
            title: 'Login Required',
            description: 'Please login by clicking on the floating window',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        } else {
          const response = await axios.post('https://v-gther-server-1.vercel.app/api/getrewards', isLogedin);
          // const tickets = response.data.flatMap((v) => v.tickets);
          console.log(response.data.names)
          setDetails(response.data.names);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[isLogedin, navigation, toast]);

  return (
    <Box minH="100vh" bgColor="black" display="flex" flexDir="column" justifyContent="start" alignItems="center" padding="10">
      <Heading textColor="white" textDecor="underline" textAlign={"center"}>
        Rewards Information
      </Heading>
      {isLoading ? (
        <Spinner size="lg" color="white" marginTop="10" />
      ) : details!=undefined?(
        <>
        <Flex
      justifyContent="space-between"
      alignItems="center"
      padding={4}
      bgColor="blackAlpha.700"
      color="white"
      borderRadius="md"
    >
      <Box width={isMobile ? '100%' : '45%'} textAlign={"center"}>
        <Text fontSize={isMobile ? '1xl' : '4xl'} fontWeight="bold">
          Number of Referrals
        </Text>
        <Text fontSize={isMobile ? '1xl' : '5xl'} fontWeight="bold" mt={2}>
          {details.length}
        </Text>
      </Box>
      <Box width={isMobile ? '100%' : '45%'} textAlign={"center"}>
        <Text fontSize={isMobile ? '1xl' : '4xl'} fontWeight="bold">
          Amount Earned
        </Text>
        <Text fontSize={isMobile ? '1xl' : '5xl'} fontWeight="bold" mt={2}>
          {details.length*20}
        </Text>
      </Box>
    </Flex>
    <Text color="white" textDecor="underline">Refered Persons:-</Text>
        {details.map((val, i) => <PaymentDetails key={i} val={val} />)}
        
        <Text color="white" textAlign={"center"}>
          You can refer your friends by asking them to put your registered mobile number i.e {isLogedin.mobile.number.slice(2,12)} in refer box and you can withdraw your amount once you got 200 in your balance<br></br>
          To withdraw please fill out the contact us form and we will get in contact with you.
    </Text>
        </>
      ):<><ErrorMessage message={"No Referral Found"} error={"warning"}/><Text color="white" textAlign={"center"}>
      You can refer your friends by asking them to put your registered mobile number i.e {isLogedin.mobile.number.slice(2,12)} in refer box and you can withdraw your amount once you got 200 in your balance<br></br>
      To withdraw please fill out the contact us form and we will get in contact with you.
</Text></>}

    </Box>
  );
};

function PaymentDetails({ val }) {
  return (
    <Text color="white">
          {val}
    </Text>
  );
}

export default MyTickets;
