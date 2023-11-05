import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';

export default function Signup() {
  return (
    <>
      <Navbar />
      <Flex
        justify="space-evenly"
        align="center"
        mt={['50px', '55px', '70px']}
        pt="4rem"
      >
        {/* Animation from Lottie */}
        <Box display={{ base: 'none', lg: 'block' }}>Animation</Box>
        <SignupForm />
      </Flex>
    </>
  );
}
