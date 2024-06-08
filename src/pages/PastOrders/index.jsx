import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  Heading,
  Flex,
  Image,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  useToast,
} from '@chakra-ui/react';
import { LuIndianRupee } from 'react-icons/lu';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Lottie from 'lottie-react';
import noOrderAnimation from '../../../public/assets/noOrderAnimation.json';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../components/Store/OrderStore';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cookies = new Cookies();
  const navigate = useNavigate();
  const toast = useToast();

  const { isAuth } = useOrderStore((state) => ({
    isAuth: state.isAuth,
  }));

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
      toast({
        title: 'Login first!',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
    const getOrders = async () => {
      try {
        const response = await axios.get(
          'https://laundrix-backend.onrender.com/api/orders',
          {
            withCredentials: true,
            maxBodyLength: Infinity,
            headers: {
              Authorization: `Bearer ${cookies.get('token')}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="100vh"
      >
        <Spinner color="#584BAC" size="xl" />
      </Flex>
    );
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navbar />

      <Text
        mt={{ base: '5rem', sm: '7rem' }}
        fontSize={{ base: '30px', sm: '35px' }}
        ml={{ sm: '3.125rem' }}
        fontWeight="medium"
        align={{ base: 'center', sm: 'left' }}
      >
        Order history
      </Text>
      {orders.length === 0 ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Lottie
            animationData={noOrderAnimation}
            height={['20rem', '25rem', '30rem', '35rem']}
          ></Lottie>
          <Heading
            fontWeight="medium"
            color="#584BAC"
            align="center"
          >{`Looks like you don't have any orders yet :(`}</Heading>
        </Flex>
      ) : (
        <>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={{ base: '1.5rem', sm: '4rem' }}
          >
            {orders.map((order) => (
              <Flex
                key={order._id}
                boxShadow="0px 1px 23px 0px rgba(0,0,0,0.25);"
                borderRadius="0.5rem"
                mb={{ base: '1rem', xs: '1.3rem', sm: '2rem', lg: '2.3rem' }}
                width={{ base: '17rem', xs: '20rem', sm: '27rem', md: '35rem' }}
                height={{ base: '5rem', sm: '6.5rem' }}
                alignItems="center"
                justifyContent="space-between"
                cursor="pointer"
                transition="transform 0.3s ease"
                _hover={{
                  transform: 'scale(1.03)',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => {
                  setSelectedItem(order), onOpen();
                }}
              >
                <Flex>
                  <Image
                    width={{
                      base: '2.5rem',
                      xs: '3rem',
                      sm: '4rem',
                      md: '5rem',
                    }}
                    ml={2}
                    mr={{ base: '1.5rem', sm: '2rem' }}
                    src="/assets/pastOrder.svg"
                  />
                  <Flex flexDirection="column">
                    <Heading
                      size={{ base: 'xs', xs: 'sm', sm: 'medium', md: 'md' }}
                    >
                      {formatDate(order.createdAt)}
                    </Heading>
                    <Flex
                      alignItems="center"
                      fontSize={{
                        base: 'small',
                        xs: 'sm',
                        sm: 'medium',
                        md: 'lg',
                      }}
                      mt={{ base: '0.2rem', sm: '0.7rem' }}
                    >
                      <LuIndianRupee color="#584BAC" />
                      <Text color="#584BAC">{order.total}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Box>
            {selectedItem && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent width={{ base: '75%', md: '100%' }}>
                  <ModalHeader>Order Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Accordion allowMultiple border="white">
                      {['Wash & iron', 'Power clean', 'Dry clean'].map(
                        (category, index) => {
                          return (
                            <AccordionItem key={index}>
                              <h2>
                                <AccordionButton borderRadius="1.25rem">
                                  <Box as="span" flex="1" textAlign="left">
                                    <Heading
                                      color="#584BAC"
                                      size={{
                                        base: 'xs',
                                        xs: 'sm',
                                        sm: 'medium',
                                        md: 'md',
                                      }}
                                    >
                                      {category}
                                    </Heading>
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel>
                                {selectedItem.order[0][index].map(
                                  (value, index) => {
                                    return value.quantity != 0 ? (
                                      <Flex
                                        key={index}
                                        justifyContent="space-between"
                                        fontSize={{
                                          base: 'small',
                                          xs: 'sm',
                                          md: 'md',
                                        }}
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
                                            <Text>
                                              {value.quantity * value.price}
                                            </Text>
                                          </Box>
                                        </Flex>
                                      </Flex>
                                    ) : null;
                                  }
                                )}
                              </AccordionPanel>
                            </AccordionItem>
                          );
                        }
                      )}
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
                        <Heading
                          size={{ base: 'sm', sm: 'md' }}
                          fontWeight="Bold"
                        >
                          Total
                        </Heading>
                      </Flex>
                      <Flex alignItems="center" color="lxRed">
                        <LuIndianRupee />
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: 'sm', sm: 'lg' }}
                        >
                          {selectedItem.total}
                        </Text>
                      </Flex>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default PastOrders;
