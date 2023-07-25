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
import { LuIndianRupee } from 'react-icons/lu';
import useOrderStore from '../Store/OrderStore';

function PriceCard() {
  const { Orders } = useOrderStore((state) => ({
    Orders: state.Orders,
  }));

  const washOrder = Orders[0][0].map((value, index) => {
    return value.quantity != 0 ? (
      <Flex key={index} justifyContent="space-between">
        <Flex>
          <Box> {`${value.quantity}x`}</Box>
          <Box mb="2px">{value.item}</Box>
        </Flex>
        <Flex alignItems="center" color="lxRed">
          <Box>
            <LuIndianRupee />
          </Box>
          <Box>
            <Text>{value.quantity * value.price}</Text>
          </Box>
        </Flex>
      </Flex>
    ) : null;
  });

  const powerCleanOrder = Orders[0][1].map((value, index) => {
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
            <Text>{value.quantity * value.price}</Text>
          </Box>
        </Flex>
      </Flex>
    ) : null;
  });

  const dryCleanOrder = Orders[0][2].map((value, index) => {
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
            <Text>{value.quantity * value.price}</Text>
          </Box>
        </Flex>
      </Flex>
    ) : null;
  });

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple border="white" pt={10}>
        <AccordionItem pr={10} pl={10}>
          <h2>
            <AccordionButton borderRadius="1.25rem">
              <Box as="span" flex="1" textAlign="left">
                <Heading color="lxPurple" size="md" p="0" m="0">
                  Wash & Iron
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{washOrder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem pr={10} pl={10}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading color="lxPurple" size="md">
                  Power clean
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{powerCleanOrder}</AccordionPanel>
        </AccordionItem>

        <AccordionItem pr={10} pl={10}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading color="lxPurple" size="md">
                  Dry clean
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{dryCleanOrder}</AccordionPanel>
        </AccordionItem>
        <AccordionItem pr={10} pl={10}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading color="lxPurple" size="md">
                  Total
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>hi</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default PriceCard;
