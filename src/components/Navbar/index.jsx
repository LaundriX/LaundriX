import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Text,
  Flex,
  Spacer,
  Button,
  Avatar,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
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

  const getIconSize = () => {
    if (windowWidth >= 1280) {
      return '26px';
    } else if (windowWidth >= 992) {
      return '23px';
    } else if (windowWidth >= 768) {
      return '20px';
    } else {
      return '18px';
    }
  };

  return (
    <>
      <Flex
        align="center"
        position="fixed"
        top="0"
        w="100vw"
        h={['50px', '55px', '70px']}
        boxShadow="0px 2px 3px lightgray"
        pr={['15px', '30px']}
        bgColor="white"
        zIndex="1"
      >
        <Link to="/">
          <Text
            color="#584BAC"
            fontWeight="500"
            fontSize={['1.5rem', '1.7rem', '2.3rem', '2.7rem']}
            ml={['20px', '30px', '40px', '50px']}
          >
            LaundriX
          </Text>
        </Link>
        <Spacer />
        {userEmail ? (
          <Flex
            align="center"
            justify="space-between"
            w={['110px', '200px', '230px', '240px']}
          >
            <Button
              onClick={logOut}
              h={['30px', '36px', '39px']}
              w={['70px', '80px', '95px']}
              backgroundColor="#6252c4"
              borderRadius="9px"
              fontSize={['0.8rem', '1rem', '1.1rem']}
              color="#ffffff"
              _hover={{
                bg: '#4c4196',
              }}
              _active={{
                bg: '#7b6bed',
                transform: 'scale(0.98)',
              }}
            >
              Log Out
            </Button>
            <Tag
              borderRadius="full"
              w={['31px', '110px', '120px']}
              h={['31px', '38px', '44px']}
              bg="#ffffff"
              justifyContent="center"
              _hover={{ bg: '#f9edfa' }}
              border={['none', '2px solid #584Bac']}
              cursor="pointer"
            >
              <Avatar
                name={userName.split(' ')[0]}
                w="31px"
                h="31px"
                mr={['0px', '8px']}
                bg="pink.300"
              />
              {windowWidth >= 480 && (
                <TagLabel
                  color="#584BAC"
                  fontSize={['0.8rem', '1rem', '1.1rem']}
                >
                  {userName.split(' ')[0]}
                </TagLabel>
              )}
            </Tag>
          </Flex>
        ) : (
          <Button
            leftIcon={<FcGoogle style={{ fontSize: getIconSize() }} />}
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
