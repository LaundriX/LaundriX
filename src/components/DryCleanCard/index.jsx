import React, { useReducer } from 'react';
import DryCleanList from '../../TempData/DryCleanList';
import { Box, Image, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { LuIndianRupee, LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
import PriceCard from '../PriceCard';
import useDryCleanOrderStore from '../Store/DryCleanOrderStore';

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
const DryCleanCard = () => {
  const [items, dispatch] = useReducer(reducer, DryCleanList);

  const handleIncrement = (index) => {
    dispatch({ type: 'INCREMENT', payload: index });
  };

  const handleDecrement = (index) => {
    dispatch({ type: 'DECREMENT', payload: index });
  };

  const { incrementDryCleanQuantity, decrementDryCleanQuantity } =
    useDryCleanOrderStore((state) => ({
      dryCleanOrders: state.dryCleanOrders,
      incrementDryCleanQuantity: state.incrementDryCleanQuantity,
      decrementDryCleanQuantity: state.decrementDryCleanQuantity,
    }));

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
              (quantityChecker -= 1),
                handleDecrement(index),
                decrementDryCleanQuantity(index);
            }}
          />
          <Text mx={2}>{value.quantity}</Text>
          <LuPlusCircle
            color="#584BAC"
            size={32}
            strokeWidth={1.5}
            onClick={() => {
              (quantityChecker += 1),
                handleIncrement(index),
                incrementDryCleanQuantity(index);
            }}
          />
        </Flex>
      </Flex>
    );
  });

  return (
    <Flex gap="15rem" mt="5rem" justifyContent="center">
      <Box>{card}</Box>
      <Box
        minWidth="30rem"
        boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.20)"
        borderRadius="1.25rem"
      >
        {quantityChecker != 0 ? (
          <PriceCard list={items} header="DryClean" />
        ) : null}
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

export default DryCleanCard;
