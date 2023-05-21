import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Button,
  HStack,
  Heading,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react';

const Header = (props) => {
  const { isLogedin } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const [test,setTest] = useState('');
  const testRef = useRef(null);

const scrollToSection = async (sectionId) => {
    
    const element = document.getElementById(sectionId);
    if (element) {
      if(isMobile){
        element.scrollIntoView();
      }
      else
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setTest(sectionId)
      // Navigate to a specific page
      navigate('/');
    }
  };
  useEffect(() => {
    console.log(test);
    if (test.length > 0) {
      try {
        console.log(test);
        let a = document.getElementById(test).scrollIntoView();
        console.log(a);
      } catch (err) {
        console.log(err);
      }
      setTest('');
    }
  }, [test]);
  
  return (
    <HStack
      zIndex={'5'}
      h={'10vh'}
      w={'100%'}
      bgColor={'black'}
      padding={'10'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderBottom={'0.5px solid gray'}
      position={'sticky'}
      top={'0'}
    >
      <Link to={'/#home'}>
        <Image w="100px" src={require('./assets/vGatherbackWhite.png')} alt="vGatherbackWhite" />
      </Link>
      {isMobile ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'}>
          <Button
            zIndex={'overlay'}
            pos={'fixed'}
            top={'4'}
            right={'4'}
            variant={'unstyled'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={onOpen}
          >
            <AiOutlineMenu size={['1rem', '3rem']} color="white" />
          </Button>

          <Drawer isOpen={isOpen} placement="right" onClose={onClose} bgColor="black">
            <DrawerOverlay />
            <DrawerContent bgColor={'black'}>
              <DrawerCloseButton color={'white'} />
              <DrawerHeader fontFamily={'Castoro Titling'} color={'white'}>
                V-GTHR
              </DrawerHeader>
              <DrawerBody>
                <VStack alignItems={'flex-start'}>
                  <Button
                    variant={'ghost'}
                    textColor={'white'}
                    onClick={() => {
                      // onClose();
                      scrollToSection('home');
                      onClose()
                    }}
                    colorScheme="black"
                  >
                    Home
                  </Button>
                  <Button
                    variant={'ghost'}
                    textColor={'white'}
                    onClick={() => {
                      // onClose();
                      scrollToSection('about');
                      onClose()
                    }}
                    colorScheme="black"
                  >
                    About
                  </Button>
                  <Button
                    variant={'ghost'}
                    textColor={'white'}
                    onClick={() => {
                      onClose();
                      navigate('/events');
                    }}
                    colorScheme="black"
                  >
                    Events
                  </Button>
                  <Button
                    variant={'ghost'}
                    textColor={'white'}
                    onClick={() => {
                      // onClose();
                      scrollToSection('contact');
                      onClose()
                    }}
                    colorScheme="black"
                  >
                    ContactUs
                  </Button>
                  {isLogedin.mobile.number !== null ? (
                    <>
                    <Link to={'/myTickets'}>
                      <Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme="black">
                        My Tickets
                      </Button>
                    </Link>
                    <Link to={'/myRewards'}>
                    <Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme="black">
                      My Rewards
                    </Button>
                  </Link>
                    </>
                    
                  ) : (
                    <></>
                  )}
                </VStack>

                <HStack pos={'absolute'} bottom={'10'} left={'0'} w={'full'} justifyContent={'space-evenly'}></HStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      ) : (
        <Box w={'50%'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} h={'100%'}>
          <Button variant={'ghost'} textColor={'white'} colorScheme="black" onClick={() => scrollToSection('home')}>
            Home
          </Button>
          <Button variant={'ghost'} textColor={'white'} colorScheme="black" onClick={() => scrollToSection('about')}>
            About
          </Button>
          <Button variant={'ghost'} textColor={'white'} colorScheme="black" onClick={() => navigate('/events')}>
            Events
          </Button>
          <Button variant={'ghost'} textColor={'white'} colorScheme="black" onClick={() => scrollToSection('contact')}>
            ContactUs
          </Button>
          {isLogedin.mobile.number != null ? (
            <>
            <Link to={'/myTickets'}>
              {' '}
              <Button variant={'ghost'} textColor={'white'} colorScheme="black">
                My Tickets
              </Button>
            </Link>
            <Link to={'/myRewards'}>
            {' '}
            <Button variant={'ghost'} textColor={'white'} colorScheme="black">
              My Rewards
            </Button>
          </Link>
          </>
          ) : (
            <></>
          )}
        </Box>
      )}
    </HStack>
  );
};

export default Header;
