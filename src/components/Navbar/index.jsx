import React, { useState, useEffect } from 'react';
import { Text, Flex, Spacer, Button, Avatar } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from '../Authentication/config.jsx';
import { signInWithPopup } from 'firebase/auth';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  console.log('RENDERED !!');

  useEffect(() => {
    setUserEmail(localStorage.getItem('email'));
    setUserName(localStorage.getItem('username'));
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
        w="full"
        h="70px"
        align="center"
        boxShadow="0px 2px 5px lightgray"
        pr="40px"
      >
        <Flex
          width="490px"
          align="center"
          justify="space-between"
          ml="50px"
          color="rgba(0, 0, 0, 0.60)"
          fontSize="1.1rem"
          fontWeight="500"
        >
          {/* FONT FAMILY CAN BE DECIDED LATER */}
          <Text color="#584BAC" fontSize="2.8rem">
            LaundriX
          </Text>
          <Text>How it works ?</Text>
          <Text>Services</Text>
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
              <Avatar as="Box" name={userName} w="35px" h="35px" />
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
            leftIcon={<FcGoogle />}
            color="rgba(0, 0, 0, 0.60)"
            border="2px solid #584BAC"
            borderRadius="9px"
            backgroundColor="white"
            onClick={handleClick}
          >
            Sign in with Google
          </Button>
        )}
      </Flex>
    </>
  );
}
