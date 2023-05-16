import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
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
          const response = await axios.post('https://v-gther-server-1.vercel.app/api/getall', isLogedin);
          const tickets = response.data.flatMap((v) => v.tickets);
          setDetails(tickets);
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
        Tickets Information
      </Heading>
      {isLoading ? (
        <Spinner size="lg" color="white" marginTop="10" />
      ) : details.length>0?(
        
        details.map((val, i) => <PaymentDetails key={i} val={val} />)
      ):<ErrorMessage message={"No Tickets found!!"} error={"warning"}/>}
    </Box>
  );
};

function PaymentDetails({ val }) {
  return (
    <Box
      w="80%"
      minH="30vh"
      border="1px solid white"
      borderRadius="25px"
      marginTop="10"
      display="flex"
      flexDir={['column-reverse', 'row']}
      alignItems="center"
      justifyContent="space-between"
      bgGradient="linear(to bottom right, black, gray)"
    >
      <Box w={['100%', '50%']} padding="10">
        <Text color="white" marginTop="-10" marginBottom="10" textDecor="underline">
          V-Gther
        </Text>
        <Heading textColor="white" fontSize="3vh">
          {val.name}
        </Heading>
        <Text textColor="white" marginTop="5" fontSize="1.9vh">
          {val.number}
        </Text>
        {val.refer==="NA"?"":
        <Text textColor="white" marginTop="5" fontSize="1.9vh">
        {val.refer}
      </Text>
        }
        
      </Box>
      <Box padding="5" paddingTop="10" h="20vh" w="100%" alignItems="center" justifyContent="center" display="flex" marginTop="15">
        <Box padding="5" bgColor="white">
          <QRCode value={val.ticket_number} size="15vh" bgColor="white" />
        </Box>
      </Box>
    </Box>
  );
}

export default MyTickets;
