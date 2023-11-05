import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Text,
  Flex,
  Spacer,
  Button,
  Avatar,
  Tag,
  TagLabel,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { GiHamburgerMenu } from 'react-icons/gi';
import useOrderStore from '../Store/OrderStore';
import { BiUserPlus, BiUserCheck } from 'react-icons/bi';

function Navbar() {
  const {
    userEmail,
    userName,
    // setUserName,
    // setUserEmail,
    // addAuth,
    // removeAuth,
  } = useOrderStore((state) => ({
    userEmail: state.userEmail,
    userName: state.userName,
    setUserEmail: state.setUserEmail,
    setUserName: state.setUserName,
    // addAuth: state.addAuth,
    // removeAuth: state.removeAuth,
  }));

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // setUserEmail(localStorage.getItem('email'));
    // setUserName(localStorage.getItem('username'));
    window.addEventListener('resize', handleWidth);
    // userName ? addAuth() : removeAuth();

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function handleClick() {
  //   signInWithPopup(auth, provider).then((data) => {
  //     setUserEmail(data.user.email);
  //     setUserName(data.user.displayName);
  //     localStorage.setItem('email', data.user.email);
  //     localStorage.setItem('username', data.user.displayName);
  //     // addAuth();
  //   });
  // }

  // function logOut() {
  //   localStorage.clear();
  //   setUserEmail('');
  //   setUserName('');
  //   // removeAuth();
  // }

  const iconSize = () => {
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
        w="100%"
        position="fixed"
        top="0%"
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
        {/* {userEmail ? (
          <Flex
            align="center"
            justify="space-between"
            w={['110px', '200px', '230px', '240px']}
          >
            <Button
              // onClick={logOut}
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
              <TagLabel
                color="#584BAC"
                fontSize={['0.8rem', '1rem', '1.1rem']}
                display={{ base: 'none', sm: 'block' }}
              >
                {userName.split(' ')[0]}
              </TagLabel>
            </Tag>
          </Flex>
        ) : (
          <Button
            leftIcon={<FcGoogle style={{ fontSize: iconSize() }} />}
            color="rgba(0, 0, 0, 0.60)"
            border="2px solid #584BAC"
            borderRadius="9px"
            backgroundColor="white"
            fontSize={['0.8rem', '1rem', '1.1rem']}
            w={['80px', '100px', '220px']}
            h={['30px', '37px', '44px']}
            // onClick={handleClick}
          >
            {windowWidth >= 768 ? 'Sign in with Google' : 'Sign In'}
          </Button>
        )} */}
        {/* For wider Viewports, laptop and tablet */}
        <Flex display={{ base: 'none', md: 'block' }}>
          <Button
            borderRadius="0.5rem"
            fontSize="1.1rem"
            px="2rem"
            _hover={{
              bg: '#dbdbdb',
              color: '#ce1567',
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button
            bg="#ce1567"
            color="#ffffff"
            fontSize="1.1rem"
            px="2rem"
            ml="1.5rem"
            _hover={{ bg: '#bf0055' }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Flex>

        {/* For Phone Viewport */}
        <Flex display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              border="3px solid #584bac"
              borderRadius="1.2rem"
              icon={<GiHamburgerMenu size="1.5rem" color="#584bac" />}
              variant="outline"
            />
            <MenuList fontSize="1.1rem">
              <MenuItem
                icon={<BiUserPlus size="1.7rem" color="#584bac" />}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </MenuItem>
              <MenuItem
                icon={<BiUserCheck size="1.7rem" color="#584bac" />}
                onClick={() => navigate('/login')}
              >
                Log In
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
