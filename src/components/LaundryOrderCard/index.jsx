import React, { useReducer } from 'react';
import OrderList from '../../TempData/OrderList';
import { Box, Image, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { LuIndianRupee, LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
import PriceCard from '../PriceCard';

let quantityChecker = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map((item, index) =>
        index === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREMENT':
      return state.map((item, index) =>
        index === action.payload
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      );
    default:
      return state;
  }
};
const LaundryOrderCard = () => {
  const [items, dispatch] = useReducer(reducer, OrderList);

  const handleIncrement = (index) => {
    dispatch({ type: 'INCREMENT', payload: index });
  };

  const handleDecrement = (index) => {
    dispatch({ type: 'DECREMENT', payload: index });
  };

  const card = items.map((value, index) => {
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
              (quantityChecker -= 1), handleDecrement(index);
            }}
          />
          <Text mx={2}>{value.quantity}</Text>
          <LuPlusCircle
            color="#584BAC"
            size={32}
            strokeWidth={1.5}
            onClick={() => {
              (quantityChecker += 1), handleIncrement(index);
            }}
          />
        </Flex>
      </Flex>
    );
  });

  return (
    <Flex gap="15rem" mt="15rem" justifyContent="center">
      <Box>{card}</Box>
      <Box
        minWidth="30rem"
        boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.20)"
        borderRadius="1.25rem"
      >
        {quantityChecker != 0 ? <PriceCard list={items} /> : null}
        <Box>
          <Button
            bg="lxRed"
            color="lxLightPurple"
            position="absolute"
            bottom="0"
          >
            Confirm Order
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default LaundryOrderCard;
