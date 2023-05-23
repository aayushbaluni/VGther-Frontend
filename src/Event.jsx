import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
Box,
Flex,
Image,
Button,
Heading,
Text,
Input,
useNumberInput,
} from '@chakra-ui/react';

const Event = ({ isLogedin }) => {
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

  useEffect(() => {
    if (!hasScrolledToTop) {
      window.scroll(0, 0);
      setHasScrolledToTop(true);
    }
  }, [hasScrolledToTop]);

const [cntTicket, setCntTicket] = useState(1);

const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
useNumberInput({
step: 1,
defaultValue: cntTicket,
min: 1,
max: 100,
precision: 1,
});

const handleDecrement = () => {
if (cntTicket > 1) {
setCntTicket((prevCount) => prevCount - 1);
}
};

const handleIncrement = () => {
if (cntTicket < 100) {
setCntTicket((prevCount) => prevCount + 1);
}
};

return (
<Box
   minH="calc(100vh)"
   bgColor="black"
   justifyContent="flex-start"
   alignItems="center"
   padding="4"
   display="flex"
   flexDir="column"
   id="event"
 >
<Heading textColor="white">Events</Heading>
<Box
     marginTop={16}
     minH="calc(20vh)"
     w="calc(90vw)"
     border="1px solid white"
     borderRadius="25px"
     display="flex"
     justifyContent="center"
     alignItems="start"
     flexDir="column"
     padding="10"
   >
    <Image
w="auto"
alignContent={"center"}
src={require('./assets/banner.jpeg')}
alt="Banner"
/>
<Flex
width="100%"
flexDir={['column', 'row']}
alignItems={['center', 'flex-start']}
justifyContent="space-between"
>
<Box padding="5">
<Heading textColor="white" fontSize="3vh">
Venue: Arya Institute of Engineering and Technology
</Heading>
<Text textColor="white" marginTop="5" fontSize="1.9vh">
Time: 7:00PM Onwards
</Text>
</Box>
<Flex padding="5" justifyContent="center" alignItems="center">
<a
           href="https://www.instagram.com/trapperxofficial/"
           target="_blank"
           rel="noopener noreferrer"
         >
<Image
w="150px"
src={require('./assets/Eticket.png')}
alt="ETicket"
/>
</a>
</Flex>
</Flex>
    <Box
      minH="calc(5vh)"
      w="100%"
      marginTop={['4']}
      display="flex"
      justifyContent="right"
      alignItems="center"
    >
      <Box minW="calc(22vh)" paddingRight="0">
        <Flex>
          <Button
            {...getDecrementButtonProps()}
            onClick={handleDecrement}
          >
            -
          </Button>
          {/* <input
            {...getInputProps()}
            style={{ color: 'white', width: '0px' }}
            onChange={(e) => console.log(e.target.value)}
          /> */}
          <Input {...getInputProps()} color="white" onChange={(e) => console.log(e.target.value)} disabled minW="14" style={{ width: "0px" }} />
          <Button
            {...getIncrementButtonProps()}
            onClick={handleIncrement}
          >
            +
          </Button>
        </Flex>
      </Box>
      <Link
        to="/"
        state={cntTicket}
        style={{ textDecoration: 'none' }}
      >
              <Button variant="outline" isDisabled={true} color="white" fontSize="1.5vh" w={['calc(10vh)', 'calc(15vh)']}>
                Book Tickets
              </Button>
            </Link>
          </Box>
          
            </Box>
            <Text color={"white"} textAlign={"center"} padding={"10px"}>Ticket window is Closed</Text>
            {
        isLogedin.mobile.number === null ? <Text color={"white"} textAlign={"center"} padding={"10px"}>Please Sign in by clicking on the floating button. Even after login if the button doesnt become active kindly refresh the page signout and try again</Text> : null
      }
        </Box>

  );
};
//details
//isLogedin.mobile.number===null
//isLogedin.mobile.number===null
export default Event;
