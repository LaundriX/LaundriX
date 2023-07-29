import React from 'react';
import Hero from './Hero';
import ServiceCard from './ServiceCard';
import { Box } from '@chakra-ui/react';
import WorkingCard from './WorkingCard';
const Main = () => {
  return (
    <Box pt="4rem">
      <Hero />
      <ServiceCard />
      <WorkingCard />
    </Box>
  );
};

export default Main;
