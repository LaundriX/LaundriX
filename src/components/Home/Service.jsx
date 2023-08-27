import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
    box-shadow:1px 2px 7px 1px #584BAC90;
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
  background-color: #584bac20;
`;
const Circle = styled.div`
  position: relative;
  width: 90%;
  height: 13rem;
  background-color: #584bac20;
  border-radius: 50%;
  padding: 1rem;
  margin: auto;
  margin-top: 1rem;
`;
const Service = (props) => {
  const navigate = useNavigate();
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
      <CardWrapper>
        <Card>
          <CircleWrapper>
            <Circle>
              <Image
                src={`assets/${props.task.image}`}
                margin="auto"
                w="85%"
                onClick={() => {
                  navigate('/OrderList');
                }}
              />
            </Circle>
          </CircleWrapper>
        </Card>
      </CardWrapper>
      <Text fontWeight="semibold" fontSize="1.5rem" color="#464550">
        {props.task.title}
      </Text>
    </Box>
  );
};
Service.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};
export default Service;
