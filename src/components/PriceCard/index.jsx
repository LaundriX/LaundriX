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
  Image,
} from '@chakra-ui/react';
import { LuIndianRupee } from 'react-icons/lu';
import useOrderStore from '../Store/OrderStore';
import PropTypes from 'prop-types';

function PriceCard(props) {
  PriceCard.propTypes = {
    index: PropTypes.number,
  };
  const { Orders, Total } = useOrderStore((state) => ({
    Orders: state.Orders,
    Total: state.Total,
  }));

  const washOrder = Orders[0][0].map((value, index) => {
    return value.quantity != 0 ? (
      <Flex
        key={index}
        justifyContent="space-between"
        fontSize={{ base: 'small', xs: 'sm', md: 'md' }}
      >
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

  const powerCleanOrder = Orders[0][1].map((value, index) => {
    return value.quantity != 0 ? (
      <Flex
        key={index}
        justifyContent="space-between"
        fontSize={{ base: 'small', xs: 'sm', md: 'md' }}
      >
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
      <Flex
        key={index}
        justifyContent="space-between"
        fontSize={{ base: 'small', xs: 'sm', md: 'md' }}
      >
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
      <Box>
        <Accordion
          defaultIndex={[props.index]}
          allowMultiple
          border="white"
          pt={5}
        >
          <AccordionItem pr={10} pl={10}>
            <h2>
              <AccordionButton borderRadius="1.25rem">
                <Box as="span" flex="1" textAlign="left">
                  <Heading
                    color="lxPurple"
                    size={{ base: 'xs', xs: 'sm', sm: 'medium', md: 'md' }}
                  >
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
                  <Heading
                    color="lxPurple"
                    size={{ base: 'xs', xs: 'sm', sm: 'medium', md: 'md' }}
                  >
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
                  <Heading
                    color="lxPurple"
                    size={{ base: 'xs', xs: 'sm', sm: 'medium', md: 'md' }}
                  >
                    Dry clean
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>{dryCleanOrder}</AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex
          pr={9}
          pl={9}
          alignItems="center"
          justifyContent="space-between"
          mt="1rem"
          mb="0.5rem"
        >
          <Flex alignItems="center" gap="1rem">
            <Image
              src="/assets/total.svg"
              width={{ base: '2rem', sm: '2.5rem', md: '3rem' }}
            />
            <Heading size={{ base: 'sm', sm: 'md' }} fontWeight="Bold">
              Total
            </Heading>
          </Flex>
          <Flex alignItems="center" color="lxRed">
            <LuIndianRupee />
            <Text fontWeight="bold" fontSize={{ base: 'sm', sm: 'lg' }}>
              {Total}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default PriceCard;
