import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Contact from "./Contact"
import "./assets/style.css"
const Home = () => {
  window.scroll(0,0)
  return (
    <>
    <Box minH={["",'calc(100vh)']} bgColor={'black'} id='home' >
      <video loop autoPlay muted >
        <source src={require('./assets/Bg.mp4')} type='video/mp4' />
      </video>

    </Box>
    <Box paddingTop={['10','calc(10vh)']} minH={'calc(60vh)'} w={'100%'}  bgColor={'black'} justifyContent={'start'} textAlign={'center'} id='about'>
        <Heading id="h1" color={'white'} textTransform={'uppercase'}>We gather • we vibe together</Heading>
       <Stack direction={['column','row']} padding={["3",'5']} marginTop={'9'} marginLeft={['','9']} align={'center'} minH={'100%'} >
        <Box w={['100%','50%']}  alignItems={'center'} minH={'100%'} >
        <video loop autoPlay muted>
          <source src={require('./assets/intro.mp4') } type='video/mp4'/>
        </video>
        </Box>
        <Box w={['100%','50%']} justifyContent={'start'} >
        <Heading color={'white'} marginBottom={'8'}>WHY US</Heading>
       <Box padding={['5','10']}>
       <Text color={'white'} fontSize={['l','xl']} letterSpacing={'wide'} textAlign={'center'}  >
       Choose V-GTHR for your college events and let us take care of the rest. With our
passion for creating extraordinary experiences and our commitment to excellence, we
guarantee an event that will leave a lasting impression. Get ready to embark on a
journey filled with music, laughter, and unforgettable moments - because with V-GTHR,
the stage is set, and the spotlight is on you!
        </Text>
       </Box>
        </Box>
       </Stack>
    </Box>
    <Box bgColor={'black'} justifyContent={'start'} textAlign={'center'} w={'100%'} padding={'10'} id='contact'>
      <Heading color={'white'}  textTransform={'uppercase'} textDecor={'underline'}>Reach Out to US</Heading>
      <Text color={'white'} padding={"5"}>Fill out the contact form and we'll respond promptly.</Text>
      <Box width={'100%'} display={'flex'} flexDir={['column','row']} alignItems={'center'} justifyContent={'space-around'} padding={'10'} >
      <Contact/>
      </Box>
    </Box>
    </>
  )
}

export default Home