import React from 'react';
import { Text, Heading, Box, Image, Flex, chakra } from '@chakra-ui/react';
import LandingImg from '../../assets/LandingImg.svg';

const LandingButton = chakra('button', {
  baseStyle: {
    px: '3',
    mt: '2',
    py: '2',
    bg: '#584BAC',
    color: 'white',
    rounded: 'md',
    _hover: {
      bg: '#4c4196',
    },
    _active: {
      bg: '#3f3680',
      transform: 'scale(0.98)',
    },
  },
});
function HeroSection() {
  return (
    <>
      <Flex justifyContent="center" alignItems="center" gap>
        <Box
          maxW="32rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading color="#584BAC" mb={4} textAlign="center">
            Laundry and Dry Cleaning, Done.
          </Heading>
          <Text fontSize="xl" textAlign="center">
            LaundriX picks up, cleans and delivers. Amazingly awesome,
            ridiculously simple.
          </Text>

          <LandingButton>Click me</LandingButton>
        </Box>
        <Box>
          <Image src={LandingImg} />
        </Box>
      </Flex>
    </>
  );
}

export default HeroSection;
