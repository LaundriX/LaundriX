import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Flex } from '@chakra-ui/react';
import animationData from './laundrix.json';

function PreLoader() {
  const lottieRef = useRef(null);

  const setAnimationSpeed = (speed) => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  };

  useEffect(() => {
    setAnimationSpeed(1.5);
  }, []);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Lottie
        animationData={animationData}
        style={{ height: '15rem' }}
        lottieRef={lottieRef}
      />
    </Flex>
  );
}

export default PreLoader;
