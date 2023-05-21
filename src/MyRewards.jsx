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
      <Heading textColor="white" textDecor="underline">
        Rewards Information
      </Heading>
      {isLoading ? (
        <Spinner size="lg" color="white" marginTop="10" />
      ) : details.length>0?(
        <>
        <Flex
      justifyContent="space-between"
      alignItems="center"
      padding={4}
      bgColor="blackAlpha.700"
      color="white"
      borderRadius="md"
    >
      <Box width={isMobile ? '100%' : '45%'}>
        <Text fontSize={isMobile ? '2xl' : '4xl'} fontWeight="bold">
          Number of Referrals
        </Text>
        <Text fontSize={isMobile ? '3xl' : '5xl'} fontWeight="bold" mt={2}>
          {details.length}
        </Text>
      </Box>
      <Box width={isMobile ? '100%' : '45%'}>
        <Text fontSize={isMobile ? '2xl' : '4xl'} fontWeight="bold">
          Amount Earned
        </Text>
        <Text fontSize={isMobile ? '3xl' : '5xl'} fontWeight="bold" mt={2}>
          {details.length*20}
        </Text>
      </Box>
    </Flex>
    <Text>Refered Persons:-</Text>
        {details.map((val, i) => <PaymentDetails key={i} val={val} />)}</>
      ):<ErrorMessage message={"No Tickets found!!"} error={"warning"}/>}
    </Box>
  );
};

function PaymentDetails({ val }) {
  return (
    <Text color="white" textDecor="underline">
          {val}
    </Text>
  );
}

export default MyTickets;
