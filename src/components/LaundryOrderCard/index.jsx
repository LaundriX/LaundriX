import React from 'react';
import OrderList from '../../TempData/OrderList';
import { Box, Image, Heading, Text, Flex } from '@chakra-ui/react';
import { LuIndianRupee, LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
const LaundryOrderCard = () => {
  const [, setItem] = React.useState(OrderList);

  const handleIncrement = (index) => {
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity += 1;
      return updatedItems;
    });
  };

  const handleDecrement = (index) => {
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity != 0
        ? (updatedItems[index].quantity -= 1)
        : (updatedItems[index].quantity = 0);
      return updatedItems;
    });
  };

  const card = OrderList.map((value, index) => {
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
