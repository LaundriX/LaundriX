import React from 'react';
import Navbar from '../../components/Navbar';
import {
  Button,
  Image,
  Text,
  Flex,
  Divider,
  Select,
  useToast,
} from '@chakra-ui/react';
import useOrderStore from '../../components/Store/OrderStore';
import moment from 'moment';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
import axios from 'axios';
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const CheckoutPage = () => {
  const toast = useToast();

  const {
    setPickupDate,
    setPickupTime,
    setDeliveryTime,
    deliveryDate,
    deliveryTime,
    pickupTime,
    pickupDate,
    pickupAddress,
    dropAddress,
    setPickupAddress,
    setDropAddress,
    userName,
    userEmail,
    Phone,
    Total,
  } = useOrderStore((state) => ({
    setPickupDate: state.setPickupDate,
    setPickupTime: state.setPickupTime,
    setDeliveryTime: state.setDeliveryTime,
    setPickupAddress: state.setPickupAddress,
    setDropAddress: state.setDropAddress,
    deliveryDate: state.deliveryDate,
    pickupTime: state.deliveryTime,
    deliveryTime: state.deliveryTime,
    pickupDate: state.pickupDate,
    pickupAddress: state.pickupAddress,
    dropAddress: state.dropAddress,
    userName: state.userName,
    userEmail: state.userEmail,
    Phone: state.userPhone,
    Total: state.Total,
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

  function handlePickupAddress(e) {
    setPickupAddress(e.target.value);
  }

  function handleDropAddress(e) {
    setDropAddress(e.target.value);
  }

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    console.log('hi', Total);
    try {
      const data = await axios.post('http://localhost:3000/razorpay', {
        amount: Total,
      });

      console.log(data);
      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount: data.data.amount.toString(),
        currency: data.currency,
        name: 'Laundrix',
        description: 'Complete payment',
        image: 'https://example.com/your_logo',
        order_id: data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // eslint-disable-next-line no-unused-vars
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          // can be used to redirect after paymenmt completion
          // window.location.replace(window.location.href)
        },
        callback_url: 'https://www.google.com/',
        prefill: {
          name: { userName },
          email: { userEmail },
          contact: { Phone },
        },
        notes: {
          address: 'IIITDM JABALPUR',
        },
        theme: {
          color: '#584BAC',
        },
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <Text mt="100px" fontSize="35px" ml="50px" fontWeight="medium">
        Schedule Pickup
      </Text>
      <Flex direction="column" justify="center" align="center">
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
                src="assets/Laundrix/Outline/Calendar-Add/24px.svg"
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
              <option value="Today">
                {moment().format('ddd, D MMM YYYY')}
              </option>
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
                src="assets/Laundrix (1)/Outline/Calendar-Check/24px.svg"
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
        <Flex
          border="1px solid lightgray"
          borderRadius="10px"
          justify="space-between"
          align="center"
          w="450px"
          p="1rem"
          px="25px"
          ml="50px"
          mt="25px"
          boxSizing="border-box"
          direction="column"
        >
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <MdOutlineLocationSearching color="#19b1ec" size="1.7rem" />
              <Text color="#CE1567">Pickup Address</Text>
              <Select
                placeholder="Select location"
                onChange={handlePickupAddress}
                width="160px"
                border="none"
                color="#584bac"
                fontWeight="medium"
              >
                <option value="H1">H1</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="Panini">Panini</option>
                <option value="Nagarjuna">Nagarjuna</option>
                <option value="Maa Saraswati">Maa Saraswati</option>
              </Select>
            </Flex>
            <Flex align="center" justify="space-between">
              <TfiLocationPin color="#CE1567" size="2rem" />
              <Text color="#CE1567">Drop Address</Text>
              <Select
                placeholder="Select location"
                onChange={handleDropAddress}
                width="160px"
                border="none"
                color="#584bac"
                fontWeight="medium"
              >
                <option value="H1">H1</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="Panini">Panini</option>
                <option value="Nagarjuna">Nagarjuna</option>
                <option value="Maa Saraswati">Maa Saraswati</option>
              </Select>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Button
        onClick={() => {
          pickupTime &&
          deliveryTime &&
          pickupDate &&
          pickupAddress &&
          dropAddress
            ? displayRazorpay()
            : toast({
                position: 'top',
                title: 'Error !',
                description: 'Fill in all the details.',
                status: 'error',
                variant: 'subtle',
                duration: 2000,
              });
        }}
      >
        Pay and Confirm
      </Button>
    </>
  );
};
export default CheckoutPage;
