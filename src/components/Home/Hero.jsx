import React from 'react';
import { Text, Heading, Box, Image, Flex, Button } from '@chakra-ui/react';
import Landing from '/assets/LandingImg.svg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        mt="5rem"
        direction={{ base: 'column', lg: 'row' }}
        px="1rem"
        mx="1rem"
      >
        <Box
          maxW="32rem"
          minW={{ base: 'auto', md: '29rem' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          order={{ base: '1', md: '0' }}
        >
          <Heading color="lxPurple" mb="2rem" textAlign="center" size="2xl">
            Laundry and Dry Cleaning, Done.
          </Heading>
          <Text fontSize="xl" textAlign="center" mb="1rem">
            LaundriX picks up, cleans and delivers. Amazingly awesome,
            ridiculously simple.
          </Text>

          <Button
            backgroundColor="#584BAC"
            color="white"
            _hover={{ bg: '#4c4196' }}
            onClick={() => {
              navigate('/OrderList');
            }}
          >
            Place Order
          </Button>
        </Box>
        <Box>
          <Image src={Landing} alt="Landing Image" />
        </Box>
      </Flex>
    </>
  );
};

export default Hero;
