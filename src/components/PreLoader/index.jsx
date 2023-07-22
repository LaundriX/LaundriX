import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Flex } from '@chakra-ui/react';
import animationData from './preloader_animation.json';

function PreLoader() {
  const lottieRef = useRef();

  const setAnimationSpeed = (speed) => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  };

  useEffect(() => {
    setAnimationSpeed(2);
  }, []);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Lottie
        animationData={animationData}
        style={{ height: '500px' }}
        lottieRef={lottieRef}
      />
    </Flex>
  );
}

export default PreLoader;
