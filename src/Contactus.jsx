import { Box, Heading, Text } from "@chakra-ui/react";

function ContactUs() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white',padding:"40px" }}>
    <Box>
      <Heading>Contact Us</Heading>
      <Text>
        Address: Sitapura Industrial Area, Jaipur, Rajasthan
      </Text>
      <Text>
        Name: V-GTHR
      </Text>
      <Text>
        Contact Information: 
        Phone: +91 9079907146
        Email: contact@vgthr.com
      </Text>
    </Box>
    </div>

  );
}

export default ContactUs;
