import React, { useReducer } from 'react';
import OrderList from '../../TempData/OrderList';
import { Box, Image, Heading, Text, Flex } from '@chakra-ui/react';
import { LuIndianRupee, LuPlusCircle, LuMinusCircle } from 'react-icons/lu';

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
        maxWidth="36rem"
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
            onClick={() => handleDecrement(index)}
          />
          <Text mx={2}>{value.quantity}</Text>
          <LuPlusCircle
            color="#584BAC"
            size={32}
            strokeWidth={1.5}
            onClick={() => handleIncrement(index)}
          />
        </Flex>
      </Flex>
    );
  });

  return <Box>{card}</Box>;
};

export default LaundryOrderCard;
