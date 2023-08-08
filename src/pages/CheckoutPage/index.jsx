import React from 'react';
import Navbar from '../../components/Navbar';
import { Button, Image, Text, Flex, Divider, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../components/Store/OrderStore';
import moment from 'moment/moment';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { setPickupDate, setPickupTime, setDeliveryTime, deliveryDate } =
    useOrderStore((state) => ({
      setPickupDate: state.setPickupDate,
      setPickupTime: state.setPickupTime,
      setDeliveryTime: state.setDeliveryTime,
      deliveryDate: state.deliveryDate,
    }));

  function handlePickupDate(e) {
    setPickupDate(e.target.value);
  }

  function handlePickupTime(e) {
    setPickupTime(e.target.value);
  }

  function handleDeliveryTime(e) {
    setDeliveryTime(e.target.value);
  }

  return (
    <>
      <Navbar />
      <Text mt="100px" fontSize="35px" ml="50px" fontWeight="medium">
        Schedule Pickup
      </Text>
      <Flex
        border="1px solid lightgray"
        borderRadius="10px"
        justify="space-between"
        align="center"
        w="450px"
        h="180px"
        px="25px"
        ml="50px"
        mt="25px"
        boxSizing="border-box"
      >
        <Flex
          direction="column"
          justify="space-between"
          align="flex-start"
          h="140px"
        >
          <Flex justify="space-between" align="center">
            <Image
              src="public\assets\icons8-calendar-64.png"
              boxSize="35px"
              mr="10px"
            />
            <Text color="#CE1567" fontWeight="medium">
              Pickup Time
            </Text>
          </Flex>
          <Select
            placeholder="Select date"
            onChange={handlePickupDate}
            width="180px"
            color="black"
            fontWeight="medium"
            border="none"
          >
            <option value="Today">{moment().format('ddd, D MMM YYYY')}</option>
            <option value="Tomorrow">
              {moment().add(1, 'days').format('ddd, D MMM YYYY')}
            </option>
            <option value="Day After Tomorrow">
              {moment().add(2, 'days').format('ddd, D MMM YYYY')}
            </option>
          </Select>
          <Select
            placeholder="Select Time"
            onChange={handlePickupTime}
            width="140px"
            border="none"
            color="#584bac"
            fontWeight="medium"
          >
            <option value="12:00 PM">12:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
          </Select>
        </Flex>
        <Divider
          orientation="vertical"
          borderColor="lightgray"
          height="120px"
        ></Divider>
        <Flex
          direction="column"
          justify="space-between"
          align="flex-start"
          h="140px"
        >
          <Flex justify="space-between" align="center">
            <Image
              src="public\assets\icons8-calendar-64.png"
              boxSize="35px"
              mr="10px"
            />
            <Text color="#CE1567" fontWeight="medium">
              Delivery Time
            </Text>
          </Flex>
          <Text fontWeight="medium" ml="15px">
            {deliveryDate}
          </Text>
          <Select
            placeholder="Select Time"
            onChange={handleDeliveryTime}
            width="140px"
            border="none"
            color="#584bac"
            fontWeight="medium"
          >
            <option value="12:00 PM">12:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
          </Select>
        </Flex>
      </Flex>
      <Button
        onClick={() => {
          navigate('/OrderConfirmationPage');
        }}
      >
        Pay and Confirm
      </Button>
    </>
  );
};
export default CheckoutPage;
