import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Card = styled(motion.div)`
    width:15rem;
    height:15rem;
    min-width:{{base:'auto', md:'15rem'}};
    min-height:{{base:'auto', md:'15rem'}};
    display:flex;
    flex-direction:column;
    border-radius:1.5rem;
    background-color: #fff7;
    margin:1rem;
    position:relative;
    cursor:grab;
    padding:1rem;
    justify-content:center;
    align-items:center;
`;
const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-top-right-radius: 1.5rem;
  border-top-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  background-color: #fff2;
`;
const Circle = styled.div`
  position: relative;
  width: 85%;
  height: 13rem;
  background-color: #fff2;
  border-radius: 50%;
  margin: auto;
  margin-top: 2rem;
`;
const Working = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      px="0rem"
      py="0rem"
      margin="auto"
      alignItems="center"
      justifyContent="center"
      pb="3rem"
    >
      <CardWrapper>
        <Card className="box">
          <CircleWrapper>
            <Circle>
              <Image
                src={`assets/${props.procedure.image}`}
                margin="auto"
                w="100%"
                pt="0.5rem"
              />
            </Circle>
          </CircleWrapper>
        </Card>
      </CardWrapper>
      <Text fontWeight="semibold" fontSize="1.5rem" mt="-0.5rem" mb="1rem">
        {props.procedure.title}
      </Text>
      <Text
        color="#00000099"
        maxWidth="15rem"
        maxHeight="2rem"
        textAlign="center"
        fontWeight="semibold"
      >
        {props.procedure.desc}
      </Text>
    </Box>
  );
};
Working.propTypes = {
  procedure: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
  }),
};
export default Working;
