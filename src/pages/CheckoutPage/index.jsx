import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  Button,
  Image,
  Text,
  Flex,
  Divider,
  Select,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import useOrderStore from '../../components/Store/OrderStore';
import moment from 'moment';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
  const cookies = new Cookies();
  const {
    setPickupDate,
    setPickupTime,
    setDeliveryTime,
    deliveryDate,
    deliveryTime,
    pickupTime,
    pickupDate,
    isAuth,
    pickupAddress,
    dropAddress,
    setPickupAddress,
    setDropAddress,
    userName,
    userEmail,
    Phone,
    Total,
    Order,
  } = useOrderStore((state) => ({
    isAuth: state.isAuth,
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
    Order: state.Orders,
  }));

  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (!(isAuth && Total)) {
      navigate('/OrderList');
      toast({
        title: isAuth ? 'Add some items! ' : 'Login first!',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const data = await axios.post(
        'https://razorpay-yvku.onrender.com/razorpay',
        {
          amount: Total,
        }
      );

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
          window.location.replace('https://laundri-x.netlify.app/pastOrders');
        },
        // callback_url: 'https://www.google.com/',
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
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }
  let data = JSON.stringify({
    order: Order,
    total: Total,
    pickupDate: pickupDate,
    deliveryDate: deliveryDate,
    pickupTime: pickupTime,
    deliveryTime: deliveryTime,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://laundrix-backend.onrender.com/api/orders',
    headers: {
      Authorization: `Bearer ${cookies.get('token')}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  async function addOrder() {
    try {
      const response = await axios.request(config);
      console.log(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <Text
        mt={{ base: '5rem', sm: '8rem' }}
        fontSize="35px"
        ml={{ base: '0', sm: '4rem' }}
        fontWeight="medium"
        align={{ base: 'center', sm: 'left' }}
      >
        Schedule Pickup
      </Text>
      <Flex
        direction="column"
        justify="center"
        align="center"
        mt={{ base: '2.5rem', md: '4rem' }}
      >
        <Flex
          border="1px solid lightgray"
          borderRadius="10px"
          justify="space-between"
          align="center"
          w={{ base: '20.5rem', sm: '24rem', md: '28.125rem' }}
          h={{ base: '9rem', sm: '10rem', md: '11.25rem' }}
          px={{ sm: '0.6rem', md: '1.5rem' }}
          // ml={{md:"3.125rem"}}
          mt={{ md: '1.5rem' }}
          boxSizing="border-box"
        >
          <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            h={{ base: '120px', sm: '140px' }}
          >
            <Flex justify="space-between" align="center">
              <Image
                src="assets/Laundrix/Outline/Calendar-Add/24px.svg"
                boxSize={{ base: '29px', sm: '30px', md: '35px' }}
                mr="10px"
                pl={{ base: '10px', sm: '0px' }}
              />
              <Text
                color="#CE1567"
                fontWeight="medium"
                fontSize={{ sm: '0.95rem', md: '1rem' }}
              >
                Pickup Time
              </Text>
            </Flex>
            <Select
              placeholder="Select date"
              onChange={handlePickupDate}
              width="140px"
              color="black"
              fontWeight="medium"
              fontSize={{ sm: '0.95rem', md: '1rem' }}
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
              fontSize={{ sm: '0.95rem', md: '1rem' }}
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
            mr="1rem"
            h={{ base: '120px', sm: '140px' }}
          >
            <Flex justify="space-between" align="center">
              <Image
                src="assets/Laundrix (1)/Outline/Calendar-Check/24px.svg"
                boxSize={{ base: '29px', sm: '30px', md: '35px' }}
                mr="8px"
                pl={{ base: '10px', sm: '0px' }}
              />
              <Text
                color="#CE1567"
                fontWeight="medium"
                fontSize={{ sm: '0.95rem', md: '1rem' }}
              >
                Delivery Time
              </Text>
            </Flex>
            <Text
              fontWeight="medium"
              ml="15px"
              fontSize={{ sm: '0.95rem', md: '1rem' }}
            >
              {deliveryDate}
            </Text>
            <Select
              placeholder="Select Time"
              onChange={handleDeliveryTime}
              width="140px"
              border="none"
              fontSize={{ sm: '0.95rem', md: '1rem' }}
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
          justify="center"
          align="center"
          flexDirection="column"
          w={{ base: '20.5rem', sm: '24rem', md: '28.125rem' }}
          h={{ base: '9rem', sm: '10rem', md: '11.25rem' }}
          px={{ sm: '0.6rem', md: '1.5rem' }}
          // ml="50px"
          mt="2rem"
          boxSizing="border-box"
          direction="column"
        >
          <Flex direction="column" gap="1.7rem">
            <Flex align="center" justify="space-between" gap="1rem">
              <MdOutlineLocationSearching color="#19b1ec" size="1.7rem" />
              <Text
                color="#CE1567"
                fontSize={{ base: '0.9rem', sm: '0.95rem', md: '1rem' }}
              >
                Pickup Address
              </Text>
              <Select
                placeholder="Select location"
                onChange={handlePickupAddress}
                width="160px"
                border="none"
                color="#584bac"
                fontWeight="medium"
                fontSize={{ base: '0.9rem', sm: '0.95rem', md: '1rem' }}
              >
                <option value="H1">H1</option>
                <option value="H3">H3</option>
                <option value="H4">H4</option>
                <option value="Panini">Panini</option>
                <option value="Nagarjuna">Nagarjuna</option>
                <option value="Maa Saraswati">Maa Saraswati</option>
              </Select>
            </Flex>
            <Flex align="center" justify="space-between" gap="1rem">
              <SlLocationPin color="#CE1567" size="1.7rem" />
              <Text
                color="#CE1567"
                fontSize={{ base: '0.9rem', sm: '0.95rem', md: '1rem' }}
              >
                Drop Address
              </Text>
              <Select
                placeholder="Select location"
                onChange={handleDropAddress}
                width="160px"
                border="none"
                color="#584bac"
                fontWeight="medium"
                fontSize={{ base: '0.9rem', sm: '0.95rem', md: '1rem' }}
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
        <Button
          mt="2rem"
          fontSize={{ base: '1rem', sm: '1.2rem' }}
          bg="lxRed"
          color="lxLightPurple"
          mb="1rem"
          // width="10%"
          borderRadius="1.2rem"
          _hover={{ bg: '#bf0055' }}
          onClick={() => {
            pickupTime &&
            deliveryTime &&
            pickupDate &&
            pickupAddress &&
            dropAddress
              ? (displayRazorpay(), addOrder(), setIsloading(true))
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
          {isloading ? <Spinner /> : 'Pay & Confirm'}
        </Button>
      </Flex>
    </>
  );
};
export default CheckoutPage;
