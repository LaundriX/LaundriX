import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';

export default function Login() {
  return (
    <>
      <Navbar />
      <Flex
        justify="space-evenly"
        align="center"
        mt={['50px', '55px', '70px']}
        pt="10rem"
      >
        {/* Animation from Lottie */}
        <Box display={{ base: 'none', lg: 'block' }}>Animation</Box>
        <LoginForm />
      </Flex>
    </>
  );
}
