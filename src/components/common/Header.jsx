import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Select,
  Text,
} from '@chakra-ui/react'
import { Chat } from '@emotion-icons/fluentui-system-regular'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAction } from '../../redux/users/action.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Header = ({ isShowSearch = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { authedUser } = useSelector(({ users }) => users)
  const { threads } = useSelector(({ threads }) => threads)

  const onSearchChange = (keyword) => {
    setSearchParams({ category: keyword })
  }

  const onLogOut = () => {
    dispatch(logOutAction())
    navigate('/login')
  }

  return (
    <Flex
      gap={4}
      pos='fixed'
      bgColor='gray.100'
      top={0}
      m={4}
      right={0}
      left={0}
      rounded='full'
      justify='space-between'
      align='center'
      py={2}
      px={4}
      zIndex={2}
    >
      <Icon as={Chat} w={10} h={10} color='purple.500' />

      {isShowSearch && (
        <Select
          bgColor='white'
          size='md'
          placeholder='Choose category'
          variant='filled'
          rounded='full'
          _focus={{
            bgColor: 'white',
          }}
          value={searchParams.get('category') || ''}
          onChange={(e) => onSearchChange(e.target.value)}
        >
          {[
            ...new Set(threads.map(({ category }) => category.toLowerCase())),
          ].map((category, id) => (
            <option key={id} value={category}>
              {category}
            </option>
          ))}
        </Select>
      )}

      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <Button p={0} rounded='full'>
            <Avatar
              w={10}
              h={10}
              name={authedUser.name}
              src={authedUser.avatar}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          gap={2}
          rounded='xl'
          w='auto'
          p={2}
          display='flex'
          direction='column'
        >
          <PopoverArrow />

          <Box bgColor='gray.50' p={4} rounded='lg'>
            <Text fontWeight={500}>{authedUser.name}</Text>
            <Text>Logged in as {authedUser.email}</Text>
          </Box>

          <Button
            rounded='full'
            colorScheme='red'
            variant='ghost'
            onClick={onLogOut}
          >
            Log out
          </Button>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

Header.propTypes = {
  isShowSearch: PropTypes.bool,
}
