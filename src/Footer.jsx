import { Stack, HStack, Divider, Image, IconButton, LinkProps,useMediaQuery } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub, FaInstagram, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom'
const links = [{id:'Contact Us',href:"/contactus"}, {id:'Join Events',href:"/events"}, {id:'Careers',href:"#"}, {id:'Cancellation/Refund Policy',href:"/legal/cancellation"}, {id:'Terms of use',href:"/legal/terms"}, {id:'Privacy policy',href:"/legal/privacy"}];

const accounts = [
  {
    url: 'https://instagram.com/v-ghtr',
    label: 'Instagram Account',
    type: 'blue',
    icon: <FaInstagram />
  },
  {
    url: 'mailto:contact@vgthr.com',
    label: 'Mail Us',
    type: 'blue',
    icon: <FaMailBulk />
  },
  {
    url: 'https://github.com/v-gthr',
    label: 'Github Account',
    type: 'blue',
    icon: <FaGithub />
  }
];

const Footer = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)")
  return (
    <Stack
      // maxW="5xl"
      marginInline="auto"
      p={8}
      spacing={{ base: 8, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      bgColor={'black'}
    
      
    >
      <Link href="#">
        <Image w="100px" src={require('./assets/vGatherbackWhite.png')} alt="vGatherbackWhite" />
      </Link>

      
      {/* Mobile and Tablet Screens */}
      {isMobile?
      <Stack d={{ base: 'flex', md: 'none' }} alignItems="center">
        <HStack alignItems="center">
          <CustomLink to={links[0].href}>{links[0].id}</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink to={links[1].href}>{links[1].id}</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink to={links[2].href}>{links[2].id}</CustomLink>
        </HStack>
        <HStack alignItems="center">
          <CustomLink to={links[3].href}>{links[3].id}</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink to={links[4].href}>{links[4].id}</CustomLink>
        </HStack>
        <CustomLink to={links[5].href}>{links[5].id}</CustomLink>
      </Stack>:<HStack spacing={4} alignItems="center" d={{ base: 'none', md: 'flex' }}>
        {links.map((link, index) => (
          <CustomLink key={index} to={link.href}>{link.id}</CustomLink>
        ))}
      </HStack>
}
      <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
      {accounts.map((sc, index) => (
  <a href={sc.url} target="_blank" rel="noopener noreferrer" key={index}>
    <IconButton
    variant={'ghost'} 
    textColor={'white'} 
    colorScheme='black'
      aria-label={sc.label}
      // colorScheme={sc.type}
      icon={sc.icon}
      rounded="md"
    />
  </a>
))}

      </Stack>
    </Stack>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link style={{color:"white"}} color={'white'} fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;