import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useState } from 'react'
import {
  EyeHide,
  EyeShow,
  LockClosed,
  Mail,
  Password,
} from '@emotion-icons/fluentui-system-regular'
import PropTypes from 'prop-types'

export const LogInInput = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onShowPassword = () => setIsShowPassword(!isShowPassword)

  return (
    <Box>
      <Heading mb={4} color='gray.800'>
        Log in to account
      </Heading>

      <Text mb={8} color='gray.500'>
        Don&apos;t have an account?{' '}
        <ChakraLink color='purple.500' as={ReactRouterLink} to='/register'>
          Register
        </ChakraLink>
      </Text>

      <FormControl mb={4} isRequired>
        <FormLabel>Email address</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <Icon as={Mail} w={6} h={6} color='gray.500' />
          </InputLeftElement>
          <Input
            rounded='full'
            variant='filled'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={onEmailChange}
          />
        </InputGroup>
      </FormControl>

      <FormControl mb={8} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <Icon as={Password} w={6} h={6} color='gray.500' />
          </InputLeftElement>
          <Input
            rounded='full'
            variant='filled'
            type={isShowPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={onPasswordChange}
          />
          <InputRightElement>
            <IconButton
              h={6}
              mr={4}
              rounded='full'
              aria-label='Show password'
              onClick={onShowPassword}
              icon={
                isShowPassword ? <EyeHide width={16} /> : <EyeShow width={16} />
              }
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isDisabled={!/^\S+@\S+\.\S+$/.test(email) || !/^.{6,}$/.test(password)}
        leftIcon={<LockClosed width={24} />}
        colorScheme='purple'
        w='full'
        rounded='full'
        onClick={() => onSubmit({ email, password })}
      >
        Log in
      </Button>
    </Box>
  )
}

LogInInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
