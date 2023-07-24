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
      <Box pt={{ base: '8rem', md: '4rem' }} pb={{ base: '2rem', md: '4rem' }}>
        <Center>
          <Divider
            maxWidth="960px"
            w="100%"
            color="#AFABAB"
            bgColor="#AFABAB"
            css="height:3px"
          />
        </Center>
        <Box py="1rem">
          <Heading textAlign="center">
            What we offer
          </Text>
          <Text
            textAlign="center"
            fontWeight="light"
            fontSize="xl"
            color="lxPurple"
          >
            Our services and prices
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'center' }}
        px={{ base: '0rem', md: '7rem' }}
        my={{ base: '1rem', md: '0rem' }}
      >
        {tasks}
      </Box>
    </>
  );
};

export default ServiceCard;
