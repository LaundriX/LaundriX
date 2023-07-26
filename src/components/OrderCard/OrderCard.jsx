import React from 'react';
import { Box, Image, Heading, Text, Flex, Button } from '@chakra-ui/react';
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
  const { Orders, incrementQuantity, decrementQuantity } = useOrderStore(
    (state) => ({
      Orders: state.Orders,
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
    })
  );
  const card = Orders[0][props.index].map((value, index) => {
    return (
      <Flex
        key={index}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        borderRadius="0.5rem"
        mb={4}
        minWidth="30rem"
        height="8rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex>
          <Box>
            <Image ml={2} mr={8} src={`/assets/${value.image}`} />
          </Box>
          <Box>
            <Heading size="md">{value.item}</Heading>
            <Flex alignItems="center">
              <LuIndianRupee color="#CE1567" />
              <Text color="#CE1567">{value.price}</Text>
            </Flex>
          </Box>
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
    <Flex gap="15rem" mt="5rem" justifyContent="center">
      <Box>{card}</Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minWidth="30rem"
        boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.20)"
        borderRadius="1.25rem"
      >
        <PriceCard index={props.index} />
        <Box>
          <Button
            bg="lxRed"
            color="lxLightPurple"
            mb="1rem"
            width="40%"
            borderRadius="1.2rem"
            onClick={() => {
              navigate('/CheckoutPage');
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
