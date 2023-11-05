import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  useToast,
  Button,
  Text,
  Flex,
  Stack,
  Box,
  Center,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';

import { BiShow, BiHide } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, phone, email, password, confirmPassword } = signupData;
  const navigate = useNavigate();
  const toast = useToast();

  const onChange = (e) => {
    setSignupData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
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
    // Function from Axios for user signup
  };

  return (
    <>
      <Center m={0} p={0}>
        <Stack>
          <Text
            textAlign="center"
            fontSize={['1.7rem', '2.2rem']}
            fontWeight="600"
            mb="1rem"
          >
            Register With Us
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
              <Flex gap="2rem">
                <Box mb={['1rem', '2rem']}>
                  <Text mb="0.5rem" fontSize={['1.1rem', '1.2rem']}>
                    Name:{' '}
                  </Text>
                  <Box bg="#ffffff" borderRadius="0.4rem">
                    <Input
                      type="text"
                      focusBorderColor="#ce1567"
                      bg="#ecedf6"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Name..."
                      onChange={onChange}
                    />
                  </Box>
                </Box>
                <Box mb={['1rem', '2rem']}>
                  <Text mb="0.5rem" fontSize={['1.1rem', '1.2rem']}>
                    Phone:{' '}
                  </Text>
                  <Box bg="#ffffff" borderRadius="0.4rem">
                    <Input
                      type="text"
                      focusBorderColor="#ce1567"
                      bg="#ecedf6"
                      id="phone"
                      name="phone"
                      value={phone}
                      placeholder="Phone..."
                      onChange={onChange}
                    />
                  </Box>
                </Box>
              </Flex>
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
                    placeholder="Email..."
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
                      placeholder="Password..."
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
              <Box mb={['1rem', '2rem']}>
                <Text mb="0.5rem" fontSize={['1.1rem', '1.2rem']}>
                  Confirm Password:{' '}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      focusBorderColor="#ce1567"
                      bg="#ecedf6"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password..."
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
                  <Button isLoading loadingText="Logging In...">
                    Create Account
                  </Button>
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
                    Create Account
                  </Button>
                )}
              </Center>
            </form>
          </Flex>
          <Text textAlign="center" fontSize={['1.1rem', '1.2rem']}>
            Already have an account?
          </Text>
          <Text
            textAlign="center"
            fontSize={['1.1rem', '1.2rem']}
            color="#ce1567"
            fontWeight="600"
          >
            <Link to="/login">Log In Now</Link>
          </Text>
        </Stack>
      </Center>
    </>
  );
}
