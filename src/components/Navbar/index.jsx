import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Flex, Spacer, Button, Avatar } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from '../Authentication/config.jsx';
import { signInWithPopup } from 'firebase/auth';

function Navbar() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem('email'));
    setUserName(localStorage.getItem('username'));
    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, []);

  function handleClick() {
    signInWithPopup(auth, provider).then((data) => {
      setUserEmail(data.user.email);
      setUserName(data.user.displayName);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('username', data.user.displayName);
    });
  }

  function logOut() {
    localStorage.clear();
    setUserEmail('');
    setUserName('');
  }

  return (
    <>
      <Flex
        position="fixed"
        top="0"
        w="100vw"
        h={['50px', '55px', '70px']}
        align="center"
        boxShadow="0px 2px 3px lightgray"
        pr={['20px', '30px', '40px']}
      >
        <Flex
          w={['', '310px', '400px', '480px']}
          align="center"
          justify="space-between"
          fontWeight="500"
        >
          {/* FONT FAMILY CAN BE DECIDED LATER */}
          <Link to="/">
            <Text
              color="#584BAC"
              ml={['20px', '30px', '40px', '50px']}
              fontSize={['1.5rem', '1.7rem', '2.3rem', '2.7rem']}
            >
              LaundriX
            </Text>
          </Link>
          {windowWidth >= 480 && (
            <Flex
              align="center"
              justify="space-between"
              w={['', '145px', '180px', '210px']}
              color="rgba(0, 0, 0, 0.60)"
              fontSize={['', '0.8rem', '1rem', '1.1rem']}
            >
              <Text>How it works ?</Text>
              <Text>Services</Text>
            </Flex>
          )}
        </Flex>
        <Spacer />
        {userEmail ? (
          <Flex align="center" justify="space-between" w="315px">
            <Button
              onClick={logOut}
              backgroundColor="white"
              borderRadius="9px"
              border="2px solid #584BAC"
              color="rgba(0, 0, 0, 0.60)"
            >
              Log Out
            </Button>
            <Flex
              align="center"
              border="2px solid lightgray"
              w="200px"
              justify="space-between"
              px="15px"
              py="5px"
              borderRadius="10px"
            >
              <Avatar
                as="Box"
                name={userName.split(' ')[0]}
                w="35px"
                h="35px"
              />
              <Text
                color="#584BAC"
                fontSize="17.5px"
                fontWeight="medium"
                opacity="0.8"
              >
                Hi! {userName}
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Button
            leftIcon={<FcGoogle size="20px" />}
            color="rgba(0, 0, 0, 0.60)"
            border="2px solid #584BAC"
            borderRadius="9px"
            backgroundColor="white"
            fontSize={['0.8rem', '1rem', '1.1rem']}
            w={['80px', '100px', '220px']}
            h={['30px', '37px', '44px']}
            onClick={handleClick}
          >
            {windowWidth >= 768 ? 'Sign in with Google' : 'Sign In'}
          </Button>
        )}
      </Flex>
    </>
  );
}

export default Navbar;
