import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiHide, BiShow } from 'react-icons/bi';
import useOrderStore from '../Store/OrderStore';
import Cookies from 'universal-cookie';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { addAuth, setUserName, setUserEmail, setUserPhone } = useOrderStore(
    (state) => ({
      addAuth: state.addAuth,
      setUserName: state.setUserName,
      setUserEmail: state.setUserEmail,
      setUserPhone: state.setUserPhone,
    })
  );

  const { email, password } = loginData;

  const cookies = new Cookies();
  const navigate = useNavigate();
  const toast = useToast();

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function makeLoginRequest() {
    const response = await axios.post(
      'http://localhost:4444/api/user/login',
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      }
    );
    return response;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      toast({
        title: 'Incomplete Entries',
        description: 'Please enter both email and password',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setLoading(true);
    try {
      let response = await makeLoginRequest();

      cookies.set('token', response.data.token);
      cookies.set('userName', decodeURIComponent(response.data.name));
      cookies.set('userEmail', decodeURIComponent(response.data.email));
      cookies.set('userPhone', decodeURIComponent(response.data.phone));

      addAuth();
      setUserName(response.data.name);
      setUserEmail(response.data.email);
      setUserPhone(response.data.phone);

      navigate('/');
      setLoading(false);
    } catch (error) {
      setLoading(false);

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(error.response.data, 'text/html');
      const errorMessage = htmlDoc.body.textContent.trim();

      toast({
        title: 'Error',
        description: errorMessage.slice(7, 27),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Center m={0} p={0}>
        <Stack>
          <Text
            textAlign="center"
            color=""
            fontSize={['1.7rem', '2.2rem']}
            fontWeight="600"
            mb="1rem"
          >
            Log In
          </Text>
          <Flex
            direction="column"
            border="2px solid #ce1567"
            w={['20rem', '27rem']}
            px={['1rem', '2rem']}
            py={['1rem', '2rem']}
            borderRadius="0.8rem"
            mb="1rem"
          >
            <form onSubmit={onSubmit}>
              <Box mb={['1rem', '2rem']}>
                <Text mb="0.5rem" fontSize={['1.1rem', '1.2rem']}>
                  Email:{' '}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <Input
                    type="email"
                    focusBorderColor="#ce1567"
                    bg="#ecedf6"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email..."
                    onChange={onChange}
                  />
                </Box>
              </Box>
              <Box mb={['1rem', '2rem']}>
                <Text mb="0.5rem" fontSize={['1.1rem', '1.2rem']}>
                  Password:{' '}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      focusBorderColor="#ce1567"
                      bg="#ecedf6"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter your password..."
                      onChange={onChange}
                    />
                    <InputRightElement
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <BiHide
                          style={{ width: '20px', height: '20px' }}
                          color="#3d3d3d"
                        />
                      ) : (
                        <BiShow
                          style={{ width: '20px', height: '20px' }}
                          color="#3d3d3d"
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Box>
              <Center>
                {loading ? (
                  <Spinner />
                ) : (
                  <Button
                    type="submit"
                    letterSpacing={1}
                    mt={['1rem', '']}
                    px="4rem"
                    fontSize="1rem"
                    bg="#ce1567"
                    color="white"
                    _hover={{
                      bg: '',
                    }}
                    rightIcon={
                      <AiOutlineArrowRight color="#ffffff" size="1.2rem" />
                    }
                  >
                    Log In
                  </Button>
                )}
              </Center>
            </form>
          </Flex>
          <Text textAlign="center" fontSize={['1.1rem', '1.2rem']}>
            {/*eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
          </Text>
          <Text
            textAlign="center"
            fontSize={['1.1rem', '1.2rem']}
            color="#ce1567"
            fontWeight="600"
          >
            <Link to="/signup">Register</Link>
          </Text>
        </Stack>
      </Center>
    </>
  );
}
