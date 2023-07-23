import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform } from 'framer-motion';
import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  perspective: 2000;
  width: 100%;
`;
const Card = styled(motion.div)`
    width:13rem;
    height:13rem;
    min-width:{{base:'auto', md:'15rem'}};
    min-height:{{base:'auto', md:'15rem'}};
    display:flex;
    flex-direction:column;
    border-radius:1.5rem;
    box-shadow:1px 2px 7px 1px #584BAC90;
    background-color: #fff7;
    margin:1rem;
    position:relative;
    cursor:grab;
    padding:1rem;
    justifyContent:center;
    alignItems:center;
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
  background-color: #584bac20;
`;
const Circle = styled.div`
  position: absolute;
  width: 100%;
  height: 13rem;
  z-index: 3;
  background-color: #584bac20;
  border-radius: 50%;
`;
const Service = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      px="0rem"
      py="0rem"
      margin="auto"
      alignItems="center"
      justifyContent="center"
    >
      <CardWrapper
        style={{ x, y, rotateX, rotateY, z: 1000 }}
        alignItems="center"
        justifyContent="center"
      >
        <Card className="box">
          <CircleWrapper>
            <Circle>
              <Image
                src={`assets/${props.task.image}`}
                margin="auto"
                w="90%"
                pt="0.5rem"
              />
            </Circle>
          </CircleWrapper>
        </Card>
      </CardWrapper>
      <Text color="lxPurple" fontWeight="bold" fontSize="1.25rem">
        {props.task.title}
      </Text>
    </Box>
  );
};
Service.propTypes = {
  task: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};
export default Service;
