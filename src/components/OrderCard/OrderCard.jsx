import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { LuIndianRupee, LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
import PriceCard from '../PriceCard';
import useOrderStore from '../Store/OrderStore';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const OrderCard = (props) => {
  OrderCard.propTypes = {
    index: PropTypes.number,
  };
  const navigate = useNavigate();

  const { Orders, incrementQuantity, decrementQuantity, Total, isAuth } =
    useOrderStore((state) => ({
      Orders: state.Orders,
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
      Total: state.Total,
      isAuth: state.isAuth,
    }));

  const toast = useToast();

  const card = Orders[0][props.index].map((value, index) => {
    return (
      <Flex
        key={index}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        borderRadius="0.5rem"
        mb={{ base: '1.5rem', xs: '2rem', sm: '3rem' }}
        width={{ base: '17rem', xs: '20rem', sm: '27rem', md: '30rem' }}
        height={{ base: '5rem', sm: '6.5rem' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex>
          <Box>
            <Image
              width={{ base: '2.5rem', xs: '3rem', sm: '4rem', md: '5rem' }}
              ml={2}
              mr={{ base: '1.5rem', sm: '2rem' }}
              src={`/assets/${value.image}`}
            />
          </Box>
          <Flex flexDirection="column">
            <Heading size={{ base: 'xs', xs: 'sm', sm: 'medium', md: 'md' }}>
              {value.item}
            </Heading>
            <Flex
              alignItems="center"
              fontSize={{ base: 'small', xs: 'sm', sm: 'medium', md: 'lg' }}
              mt={{ base: '0.2rem', sm: '0.7rem' }}
            >
              <LuIndianRupee color="#CE1567" />
              <Text color="#CE1567">{value.price}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex mr={5} alignItems="center">
          <LuMinusCircle
            color="#584BAC"
            size={32}
            strokeWidth={1.5}
            onClick={() => {
              decrementQuantity(props.index, index);
            }}
          />
          <Text mx={2}>{value.quantity}</Text>
          <LuPlusCircle
            color="#584BAC"
            size={32}
            strokeWidth={1.5}
            onClick={() => {
              incrementQuantity(props.index, index);
            }}
          />
        </Flex>
      </Flex>
    );
  });

  return (
    <Flex
      flexDirection={{ base: 'column', xl: 'row' }}
      gap={{ base: '3rem', xl: '10rem' }}
      mt="5rem"
      justifyContent="center"
      alignItems="center"
    >
      <Box>{card}</Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.20)"
        borderRadius="1.25rem"
        width={{ base: '17rem', xs: '20rem', sm: '27rem', md: '30rem' }}
      >
        <PriceCard index={props.index} />
        <Box>
          <Button
            fontSize={{ base: '0.8rem', sm: '1.2rem' }}
            bg="lxRed"
            color="lxLightPurple"
            mb="1rem"
            width="40%"
            borderRadius="1.2rem"
            onClick={() => {
              isAuth
                ? Total
                  ? navigate('/CheckoutPage')
                  : toast({
                      position: 'top',
                      title: 'Error !',
                      description: 'Add some items.',
                      status: 'error',
                      isClosable: false,
                      variant: 'subtle',
                      duration: 2000,
                    })
                : toast({
                    position: 'top',
                    title: 'Error !',
                    description: 'Sign in first.',
                    status: 'error',
                    variant: 'subtle',
                    duration: 2000,
                  });
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrderCard;
