import { Box, Button, HStack, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box minH={['0','calc(50vh)']} w={'100%'} bgColor={'black'} padding={'10'} display={'flex'} flexDir={['column','row']}>
       <Box minH={['0','calc(40vh)']} display={'flex'} flexDir={'column'} w={['100%','50%']}>
       <Heading color={'white'} fontSize={'6vh'}>V-Gthr</Heading>
        <Text marginBottom={'10'} color={'white'} >We Gather We Wibe Together</Text>
      <Link href='https://merchant.razorpay.com/policy/Lp7kCx8I3hWJRn/privacy' isExternal ><Button variant={'link'} color={'white'}>Privacy Policy</Button></Link>
      <Link href='https://merchant.razorpay.com/policy/Lp7kCx8I3hWJRn/terms' isExternal ><Button variant={'link'} color={'white'}>Terms and Conditions</Button></Link>
      
       </Box>
      <Box w={['100%','50%']} minH={['calc(10vh)','calc(40vh)']} alignItems={'center'} display={'flex'} flexDir={'column'}></Box>
        <Heading color={'white'} >Socials</Heading>
       
             </Box>
  )
}

export default Footer