import React from 'react';
import Hero from './Hero';
import ServiceCard from './ServiceCard';
import { Box } from '@chakra-ui/react';
import WorkingCard from './WorkingCard';

const main = () => {
  return (
    <Box pt="4rem">
      <Hero />
      <ServiceCard />
      <WorkingCard />
    </Box>
  );
};

export default main;
