import { Box, Button, Center, HStack, Heading, Input, Text, useNumberInput } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Event = () => {
    const [cntTicket, setcntTicket] = useState(1);
    const [draw, setDraw] = useState(false)
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: cntTicket,
      min: 1,
      max: 100,
      precision: 1,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <>
    <Box minH={'calc(100vh)'}  bgColor={'black'} justifyContent={'flex-start'} alignItems={'center'} padding={'4'} display={'flex'} flexDir={'column'} id='event'>
        <Heading textColor={'white'}>Events</Heading>
    <Box marginTop={16} minH={'calc(20vh)'} w={'calc(90vw)'} border={'1px solid white'} borderRadius={'25px '} display={'flex'} justifyContent={'center'} alignItems={'start'}  flexDir={'column'}padding={'10'}>
        <Heading textColor={'white'} fontSize={'3vh'} >Event Name</Heading>
        <Text color={'white'}>Venue:</Text>
        <Text color={'white'}>Time:</Text>
    <Box minH={'calc(5vh)'} w={'100%'} marginTop={['4']} display={'flex'}justifyContent={'flex-end'} alignItems={'center'} >
    <Box minw={'calc(25vh)'} paddingRight={'0'}>
         <HStack  paddingRight={'10'}>
        
        <Button {...dec} onChange={()=>{
            cntTicket>1?setcntTicket(cntTicket-1):setcntTicket(cntTicket);
        }}>-</Button>
        <Input {...input} color={'white'} onChange={(e)=>console.log(e.target.value)} disabled minW={'20'} style={{width:"0px", padding:"24px",fontSize:"20px"}}/>
        <Button {...inc} onClick={()=>{
            cntTicket<100?setcntTicket(cntTicket+1):setcntTicket(cntTicket);
        }}>+</Button>
      </HStack>
     </Box>
        <Link to={`/details`} state={cntTicket}><Button variant={'outline'} color='white' fontSize={'1.5vh'} w={['calc(10vh)','calc(15vh)']}  > Book Tickets</Button></Link>
    </Box>
    </Box>
   
    </Box>
    </>
  )
}


export default Event