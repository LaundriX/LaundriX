import React from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import Navbar from '../../components/Navbar';
import {
  Tabs,
  TabList,
  TabIndicator,
  TabPanel,
  TabPanels,
  Tab,
  Box,
  Text,
} from '@chakra-ui/react';

function OrderList() {
  return (
    <>
      <Navbar />
      <Box>
        <Tabs align="center" mt="10rem" isFitted variant="unstyled">
          <TabList
            bgColor="#FAF4FF"
            minHeight="5rem"
            maxWidth="85rem"
            dropShadow="0px 0px 13px rgba(0, 0, 0, 0.25)"
            borderRadius="1rem"
          >
            <Tab _selected={{ color: '#584BAC' }} color="#A8A8A9">
              <Text fontSize="2xl">Wash & Iron </Text>
            </Tab>
            <Tab _selected={{ color: '#584BAC' }} color="#A8A8A9">
              <Text fontSize="2xl">Power Clean </Text>
            </Tab>
            <Tab _selected={{ color: '#584BAC' }} color="#A8A8A9">
              <Text fontSize="2xl">Dry Clean </Text>
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="lxPurple"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <OrderCard index={0} />
            </TabPanel>
            <TabPanel>
              <OrderCard index={1} />
            </TabPanel>
            <TabPanel>
              <OrderCard index={2} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default OrderList;
