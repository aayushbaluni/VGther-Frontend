import { Box, Heading, Text, Link } from "@chakra-ui/react";

function Cancellation() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white',padding:"40px" }}>
    <Box>
      <Heading as="h1" fontSize="26px" color="#000000" mt={4}>
        RETURN POLICY
      </Heading>
      <Text fontSize="14px" color="#595959" fontWeight="bold" mt={2}>
        Last updated May 16, 2023
      </Text>

      <Text fontSize="15px" lineHeight="1.5" mt={4}>
        All sales are final, and no refund will be issued.
      </Text>

      <Heading as="h2" fontSize="19px" color="#000000" mt={6}>
        QUESTIONS
      </Heading>

      <Text fontSize="15px" color="#595959" lineHeight="1.5" mt={4}>
        If you have any questions concerning our return policy, please contact us at:
      </Text>

      <Text fontSize="15px" lineHeight="1.5" fontWeight="bold">
        contact@vgthr.com
      </Text>

      <Text fontSize="14px" fontFamily="Arial" color="#595959" mt={4}>
        This return policy was created using Termly's{" "}
        <Link color="#3030F1" href="https://termly.io/products/refund-return-policy-generator/" target="_blank" rel="noopener noreferrer">
          Return and Refund Policy Generator
        </Link>
        .
      </Text>
    </Box>
    </div>
  );
}

export default Cancellation;
