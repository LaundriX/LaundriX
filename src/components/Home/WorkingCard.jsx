import React from 'react';
import { Box, Center, Divider, Text } from '@chakra-ui/react';
import Workings from '../../TempData/Workings';
import Working from './Working';

const WorkingCard = () => {
  const procedures = Workings.map((procedure) => {
    return <Working key={procedure.id} procedure={procedure} />;
  });
  return (
    <Box>
      <Box pt={{ base: '8rem', md: '6rem' }} pb={{ base: '2rem', md: '4rem' }}>
        <Center>
          <Divider
            w="100%"
            color="#AFABAB"
            bgColor="#AFABAB"
            css="height:3px"
          />
        </Center>
        <Box pt="6rem" mx="1rem">
          <Text fontSize="4xl" textAlign="center" fontWeight="semibold">
            How It Works
          </Text>
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontSize="xl"
            color="lxPurple"
          >
            We collect, clean and deliver you laundry and dry cleaning in 24
            hours
          </Text>
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="center"
          gap="3.5rem"
          px={{ base: '0rem', md: '1rem' }}
          my="1rem"
          pb="8rem"
        >
          {procedures}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkingCard;
