import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { BiUserCheck, BiUserPlus, BiLogOut } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import useOrderStore from '../Store/OrderStore';
import Cookies from 'universal-cookie';

function Navbar() {
  const { isAuth, removeAuth, userName } = useOrderStore((state) => ({
    isAuth: state.isAuth,
    addAuth: state.addAuth,
    removeAuth: state.removeAuth,
    userName: state.userName,
    setUserName: state.setUserName,
    setUserEmail: state.setUserEmail,
    setUserPhone: state.setUserPhone,
  }));

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const cookies = new Cookies();

  function logout() {
    window.location.reload(false);
    removeAuth();
    cookies.remove('token');
    cookies.remove('userName');
    cookies.remove('userEmail');
    cookies.remove('userPhone');
  }

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
        <Flex display={{ base: 'none', md: 'block' }}>
          {isAuth ? (
            <Flex justify="center" align="center" gap="1.5rem">
              <Avatar name={userName} />
              <Button
                borderRadius="0.5rem"
                fontSize="1.1rem"
                px="2rem"
                _hover={{
                  bg: '#dbdbdb',
                  color: '#ce1567',
                }}
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </Flex>
          ) : (
            <Flex>
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
          )}
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

            {isAuth ? (
              <MenuList fontSize="1.1rem">
                <MenuItem>
                  <Avatar name={userName} size="sm" />
                </MenuItem>
                <MenuItem
                  icon={<BiLogOut size="1.5rem" color="#584bac" />}
                  onClick={() => logout()}
                >
                  Logout
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList>
                <MenuItem
                  icon={<BiUserCheck size="1.7rem" color="#584bac" />}
                  onClick={() => navigate('/login')}
                >
                  Log In
                </MenuItem>
                <MenuItem
                  icon={<BiUserPlus size="1.7rem" color="#584bac" />}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </MenuItem>
              </MenuList>
            )}
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
