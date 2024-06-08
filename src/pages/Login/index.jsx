import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import login_animation from '../../../public/assets/login_Animation.json';
import Lottie from 'lottie-react';

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
        <Box display={{ base: 'none', lg: 'block' }}>
          <Lottie animationData={login_animation} style={{ height: '20rem' }} />
        </Box>
        <LoginForm />
      </Flex>
    </>
  );
}
