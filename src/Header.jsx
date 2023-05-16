import { Box,Image, Button, HStack, Heading, useMediaQuery,  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  
   } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import { HashLink } from 'react-router-hash-link'
const Header = (props) => {
  const { isLogedin } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
  console.log(isLogedin);

  // useEffect(() => {
  //   const saved=localStorage.getItem('number');
  //   if(saved){
  //     setLogin(true);
  //   }
  // }, )
  
  return (
    <HStack zIndex={'5'} h={'10vh'} w={'100%'} bgColor={'black'} padding={'10'} justifyContent={'space-between'} alignItems={'center'} borderBottom={'0.5px solid gray'} position={'sticky'} top={'0'}>
        {/* <Heading textColor={'white'} fontSize={'6vh'} w={['90%','50%']} fontFamily={'Castoro Titling'}>V-GTHR</Heading> */}
        <Link href="#">
        <Image w="100px" src={require('./assets/vGatherbackWhite.png')} alt="vGatherbackWhite" />
      </Link>
       {
        isMobile?<Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'}>
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
        <AiOutlineMenu  size={['1rem','3rem'] } color='white' />
      </Button>

       <Drawer isOpen={isOpen} placement="right" onClose={onClose} bgColor='black'>
        <DrawerOverlay />
        <DrawerContent   bgColor={'black'}>
          <DrawerCloseButton color={'white'}/> 
          <DrawerHeader fontFamily={'Castoro Titling'} color={'white'}>V-GTHR</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
            <HashLink smooth to={'/#home'} ><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>Home</Button></HashLink>
        <HashLink smooth to={'/#about'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>About</Button></HashLink >
        <Link to={'/events'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>Events</Button></Link>
        <HashLink to={'/#contact'} smooth><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>ContactUs</Button></HashLink>
        {
          isLogedin.mobile.number !== null? <Link to={'/myTickets'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>My Tickets</Button></Link>:<></>
        }

            </VStack>

            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
              </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </Box>:<Box w={'50%'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} h={'100%'}>
        <HashLink smooth to={'/#home'} ><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Home</Button></HashLink>
        <HashLink smooth to={'/#about'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>About</Button></HashLink>
        <HashLink to={'/events'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Events</Button></HashLink>
        <HashLink to={'/#contact'} smooth><Button variant={'ghost'} textColor={'white'} colorScheme='black'>ContactUs</Button></HashLink>
      { isLogedin.mobile.number!=null?<Link to={'/myTickets'}> <Button variant={'ghost'} textColor={'white'} colorScheme='black'>My Tickets</Button></Link>:<></>}

        </Box>
       }
    </HStack>
  )
}

export default Header