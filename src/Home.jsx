import { Box } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <>
    <Box minH={'calc(100vh)'} bgColor={'black'} >
      <video loop autoPlay muted >
        <source src={require('./assets/Bg.mp4')} type='video/mp4' />

      </video>

    </Box>
    </>
  )
}

export default Home