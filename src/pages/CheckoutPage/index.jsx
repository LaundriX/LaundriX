import React from 'react';
import Navbar from '../../components/Navbar';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box mt="75px">CheckOutPage</Box>
      <Button
        onClick={() => {
          navigate('/OrderConfirmationPage');
        }}
      >
        Pay and Confirm
      </Button>
    </>
  );
};
export default CheckoutPage;
