import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export default function ErrorMessage({ message,error }) {
  return (
    <Box my={4}>
      <Alert status={error} borderRadius={4} height={"37px"}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
