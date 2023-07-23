import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { LuIndianRupee } from 'react-icons/lu';

PriceCard.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  header: PropTypes.string,
};
function PriceCard(props) {
  const Order = props.list.map((value, index) => {
    return value.quantity != 0 ? (
      <Flex key={index} justifyContent="space-between">
        <Flex>
          <Box> {`${value.quantity}x`}</Box>
          <Box>{value.item}</Box>
        </Flex>
        <Flex alignItems="center" color="lxRed">
          <Box>
            <LuIndianRupee />
          </Box>
          <Box>
            <Text>{value.quantity * Number(value.price)}</Text>
          </Box>
        </Flex>
      </Flex>
    ) : null;
  });
  return (
    <>
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading color="lxPurple" size="md">
                  {props.header}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{Order}</AccordionPanel>
        </AccordionItem>

        {/* <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem> */}
      </Accordion>
    </>
  );
}

export default PriceCard;
