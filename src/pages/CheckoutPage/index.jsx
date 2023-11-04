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
    // eslint-disable-next-line no-unused-vars
    Total,
  } = useOrderStore((state) => ({
    setPickupDate: state.setPickupDate,
    setPickupTime: state.setPickupTime,
    setDeliveryTime: state.setDeliveryTime,
    deliveryDate: state.deliveryDate,
    pickupTime: state.deliveryTime,
    deliveryTime: state.deliveryTime,
    pickupDate: state.pickupDate,
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

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const data = await fetch('https://razorpay-yvku.onrender.com/razorpay', {
      method: 'POST',
    }).then((t) => t.json());
    console.log(data);

    const options = {
      key: import.meta.env.VITE_RZP_KEY_ID,
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: 'Laundrix',
      description: 'Complete payment',
      image: 'https://example.com/your_logo',
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
        name: 'Gaurav Kumar', //your customer's name
        email: 'gaurav.kumar@example.com',
        contact: '9000090000', //Provide the customer's phone number for better conversion rates
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
      <Button
        onClick={() => {
          pickupTime && deliveryTime && pickupDate
            ? displayRazorpay()
            : toast({
                position: 'top',
                title: 'Error !',
                description: 'Fill in pickup details.',
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
