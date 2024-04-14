import React from 'react';
import Services from '../../TempData/Services';
import Service from './Service';
import { Box, Center, Divider, Text } from '@chakra-ui/react';

const ServiceCard = () => {
  const tasks = Services.map((task) => {
    return <Service key={task.id} task={task} />;
  });
  return (
    <>
      <Box
        pt={{ base: '8rem', md: '2rem' }}
        pb={{ base: '2rem', md: '4rem' }}
        mx="1rem"
      >
        <Center>
          <Divider
            w="100%"
            color="#AFABAB"
            bgColor="#AFABAB"
            css="height:3px"
          />
        </Center>
        <Box pt="6rem">
          <Text fontSize="4xl" textAlign="center" fontWeight="semibold">
            What We Offer
          </Text>
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontSize="xl"
            color="lxPurple"
          >
            Our services and prices
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="center"
        gap="3.5rem"
        justifyContent="center"
        px={{ base: '0rem', md: '9rem' }}
        my={{ base: '1rem', md: '0rem' }}
      >
        {tasks}
      </Box>
    </>
  );
};

export default ServiceCard;
