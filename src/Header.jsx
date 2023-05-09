import { Box, Button, HStack, Heading, useMediaQuery,  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  
   } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
  return (
    <HStack h={'10vh'} w={'100%'} bgColor={'black'} padding={'10'} justifyContent={'space-between'} alignItems={'center'} borderBottom={'0.5px solid gray'} pos={'sticky'} top={'0'}>
        <Heading textColor={'white'} fontSize={'6vh'} w={['90%','50%']} fontFamily={'Castoro Titling'}>V-GTHER</Heading>
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
          <DrawerHeader fontFamily={'Castoro Titling'} color={'white'}>V-GTHER</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
            <Link to={'/'} ><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>Home</Button></Link>
        <Link to={'/'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>About</Button></Link>
        <Link to={'/'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>Events</Button></Link>
        <Link to={'/'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>ContactUs</Button></Link>

            </VStack>

            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
            <Link to={'/login'}><Button variant={'ghost'} textColor={'white'}  onClick={onClose} colorScheme='black'>Login</Button></Link>

            <Link to={'/'}><Button variant={'outline'} textColor={'white'}  onClick={onClose} colorScheme='black'>SignUp</Button></Link>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </Box>:<Box w={'50%'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} h={'100%'}>
        <Link to={'/'} ><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Home</Button></Link>
        <Link to={'/'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>About</Button></Link>
        <Link to={'/events'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>Events</Button></Link>
        <Link to={'/'}><Button variant={'ghost'} textColor={'white'} colorScheme='black'>ContactUs</Button></Link>
        <Link to={'/login'}><Button variant={'outline'} textColor={'white'} colorScheme='black'>Login/SignUp</Button></Link>


        </Box>
       }
    </HStack>
  )
}

export default Header