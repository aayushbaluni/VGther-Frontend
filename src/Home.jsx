import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <>
    <Box minH={["",'calc(100vh)']} bgColor={'black'} >
      <video loop autoPlay muted >
        <source src={require('./assets/Bg.mp4')} type='video/mp4' />

      </video>

    </Box>
    <Box paddingTop={['10','calc(10vh)']} minH={'calc(60vh)'} w={'100%'}  bgColor={'black'} justifyContent={'start'} textAlign={'center'}>
        <Heading color={'white'} textTransform={'uppercase'}>We gather • we vibe together</Heading>
       <Stack direction={['column','row']} padding={["3",'5']} marginTop={'9'} marginLeft={['','9']} align={'center'} minH={'100%'} >
        <Box w={['100%','50%']}  alignItems={'center'} minH={'100%'} >
        <video loop autoPlay muted>
          <source src={require('./assets/intro.mp4') } type='video/mp4'/>
        </video>
        </Box>
        <Box w={['100%','50%']} justifyContent={'start'} >
        <Heading color={'white'} marginBottom={'8'}>WHY US</Heading>
       <Box padding={['5','10']}>
       <Text color={'white'} fontSize={['l','xl']} >
        We plan Artist Events for colleges at outskirts of metro cities, To bring happiness at their Doorsteps
        </Text>
       </Box>
        </Box>
       </Stack>
    </Box>
    </>
  )
}

export default Home