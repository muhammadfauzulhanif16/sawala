import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  Person,
} from '@emotion-icons/fluentui-system-regular'
import PropTypes from 'prop-types'

export const RegisterInput = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const onNameChange = (e) => setName(e.target.value)
  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onShowPassword = () => setIsShowPassword(!isShowPassword)

  return (
    <Box>
      <Heading mb={4} color='gray.800'>
        Register a new account
      </Heading>

      <Text mb={8} color='gray.500'>
        Already have an account?{' '}
        <ChakraLink color='purple.500' as={ReactRouterLink} to='/login'>
          Log in
        </ChakraLink>
      </Text>

      <FormControl mb={4} isRequired>
        <FormLabel>Full Name</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <Icon as={Person} w={6} h={6} color='gray.500' />
          </InputLeftElement>
          <Input
            rounded='full'
            variant='filled'
            placeholder='Enter your full name'
            value={name}
            onChange={onNameChange}
          />
        </InputGroup>
      </FormControl>

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
        <FormHelperText>At least 6 characters</FormHelperText>
      </FormControl>

      <Button
        isDisabled={
          !name || !/^\S+@\S+\.\S+$/.test(email) || !/^.{6,}$/.test(password)
        }
        leftIcon={<LockClosed width={24} />}
        colorScheme='purple'
        w='full'
        rounded='full'
        onClick={() => onSubmit({ name, email, password })}
      >
        Register
      </Button>
    </Box>
  )
}

RegisterInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
