import { Box, Image, Button, HStack, Heading, useMediaQuery, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link as ScrollLink } from 'react-scroll';

const Header = (props) => {
  const { isLogedin } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <HStack zIndex={'5'} h={'10vh'} w={'100%'} bgColor={'black'} padding={'10'} justifyContent={'space-between'} alignItems={'center'} borderBottom={'0.5px solid gray'} position={'sticky'} top={'0'}>
      <Link to={'/'}>
        <Image w="100px" src={require('./assets/vGatherbackWhite.png')} alt="vGatherbackWhite" />
      </Link>
      {
        isMobile ? (
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
              <AiOutlineMenu size={['1rem', '3rem']} color='white' />
            </Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} bgColor='black'>
              <DrawerOverlay />
              <DrawerContent bgColor={'black'}>
                <DrawerCloseButton color={'white'} />
                <DrawerHeader fontFamily={'Castoro Titling'} color={'white'}>V-GTHR</DrawerHeader>
                <DrawerBody>
                  <VStack alignItems={'flex-start'}>
                    <ScrollLink to={'home'} smooth><Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme='black'>Home</Button></ScrollLink>
                    <ScrollLink to={'about'} smooth><Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme='black'>About</Button></ScrollLink>
                    <Link to={'/events'}><Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme='black'>Events</Button></Link>
                    <ScrollLink to={'contact'} smooth><Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme='black'>ContactUs</Button></ScrollLink>
                    {
                      isLogedin.mobile.number !== null ? <Link to={'/myTickets'}><Button variant={'ghost'} textColor={'white'} onClick={onClose} colorScheme='black'>My Tickets</Button></Link> : null
                    }
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        ) : (
          <Box w={'50%'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} h={'100%'}>
            <ScrollLink to={'home'} smooth><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Home</Button></ScrollLink>
            <ScrollLink to={'about'} smooth><Button variant={'ghost'} textColor={'white'} colorScheme='black'>About</Button></ScrollLink>
            <Link to={'/events'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Events</Button></Link>
            <ScrollLink to={'contact'} smooth><Button variant={'ghost'} textColor={'white'} colorScheme='black'>ContactUs</Button></ScrollLink>
            {
              isLogedin.mobile.number != null ? <Link to={'/myTickets'}> <Button variant={'ghost'} textColor={'white'} colorScheme='black'>My Tickets</Button></Link> : null
            }
          </Box>
        )
      }
    </HStack>
  )
}

export default Header;
