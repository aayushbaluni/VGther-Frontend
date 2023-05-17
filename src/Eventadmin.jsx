import { Box,Flex,Image, Button, Center, HStack, Heading, Input, Text, useNumberInput } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Event = ({ isLogedin }) => {
  const [cntTicket, setcntTicket] = useState(1);
  const [draw, setDraw] = useState(false);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: cntTicket,
      min: 1,
      max: 100,
      precision: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <>
      <Box minH="calc(100vh)" bgColor="black" justifyContent="flex-start" alignItems="center" padding="4" display="flex" flexDir="column" id="event">
      
        <Heading textColor="white">Events</Heading>
        <Box marginTop={16} minH="calc(20vh)" w="calc(90vw)" border="1px solid white" borderRadius="25px" display="flex" justifyContent="center" alignItems="start" flexDir="column" padding="10">
        
      <Flex width={"100%"} flexDir={['column', 'row']} alignItems={['center', 'flex-start']} justifyContent="space-between">
        <Box padding="5">
          {/* <Text color="white" marginTop="-10" marginBottom="10" textDecor="underline">
            V-Gther
          </Text> */}
          <Heading textColor="white" fontSize="3vh">
            Venu: Arya Institute of Engineering and Technology
          </Heading>
          <Text textColor="white" marginTop="5" fontSize="1.9vh">
            Time: 6:00PM Onwards
          </Text>
        </Box>
        <Flex padding="5" justifyContent="center" alignItems="center">
          <Image w="150px" src={require('./assets/Eticket.png')} alt="ETicket" />
        </Flex>
      </Flex>


          <Box minH="calc(5vh)" w="100%" marginTop={['4']} display="flex" justifyContent="right" alignItems="center">
            <Box minW="calc(22vh)" paddingRight="0">
              <HStack>
                <Button {...dec} onChange={() => {
                  cntTicket > 1 ? setcntTicket(cntTicket - 1) : setcntTicket(cntTicket);
                }}>-</Button>
                <Input {...input} color="white" onChange={(e) => console.log(e.target.value)} disabled minW="14" style={{ width: "0px" }} />
                <Button {...inc} onClick={() => {
                  cntTicket < 100 ? setcntTicket(cntTicket + 1) : setcntTicket(cntTicket);
                }}>+</Button>
              </HStack>
            </Box>
            <Link to={`/detailsadmin`} state={cntTicket}>
              <Button variant="outline" isDisabled={isLogedin.mobile.number===null} color="white" fontSize="1.5vh" w={['calc(10vh)', 'calc(15vh)']}>
                Book Tickets
              </Button>
            </Link>
          </Box>
          
            </Box>
            {
        isLogedin.mobile.number === null ? <Text color={"white"} textAlign={"center"} padding={"10px"}>Please Sign in by clicking on the floating button</Text> : null
      }
        </Box>
        {/* isDisabled={isLogedin.mobile.number===null} */}
      
    </>
  );
};

export default Event;
