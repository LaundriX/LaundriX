import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Flex } from '@chakra-ui/react';
import animationData from './preloader_animation.json';

function PreLoader() {
  const [direction, setDirection] = useState(true);
  const lottieRef = useRef(null);

  const handleComplete = () => {
    setDirection((prev) => !prev);
  };

  useEffect(() => {
    if (lottieRef.current) {
      if (direction) {
        lottieRef.current.setSpeed(2.5);
        lottieRef.current.playSegments([0, animationData.op], true);
      } else {
        lottieRef.current.playSegments([animationData.op, 0], true);
      }
    }
  }, [direction]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Lottie
        animationData={animationData}
        style={{ height: '550px' }}
        lottieRef={lottieRef}
        loop={false}
        onComplete={handleComplete}
      />
    </Flex>
  );
}

export default PreLoader;
