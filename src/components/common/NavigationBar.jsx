import { ButtonGroup, Center, IconButton, Tooltip } from '@chakra-ui/react'
import {
  Add,
  ChatMultiple,
  Reward,
} from '@emotion-icons/fluentui-system-regular'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const NavigationBar = () => {
  const navigate = useNavigate()

  const navigations = [
    {
      'aria-label': 'All Threads',
      icon: <ChatMultiple width={24} />,
      variant: 'ghost',
      color: 'gray.400',
      onClick: () => navigate('/threads'),
    },
    {
      'aria-label': 'Add Thread',
      icon: <Add width={24} />,
      variant: 'solid',
      colorScheme: 'purple',
      onClick: () => navigate('/threads/create'),
    },
    {
      'aria-label': 'Leaderboard',
      icon: <Reward width={24} />,
      variant: 'ghost',
      color: 'gray.400',
      onClick: () => navigate('/leaderboards'),
    },
  ]

  return (
    <Center bottom={0} pos='fixed' right={0} left={0} m={4} zIndex={2}>
      <ButtonGroup size='sm' bgColor='gray.100' p={2} rounded='full'>
        {navigations.map((navigation, id) => (
          <Tooltip
            key={id}
            label={navigation['aria-label']}
            hasArrow
            rounded='full'
            bgColor='gray.600'
          >
            <IconButton isRound w={10} h={10} {...navigation} />
          </Tooltip>
        ))}
      </ButtonGroup>
    </Center>
  )
}

NavigationBar.propTypes = {
  onPrimaryButton: PropTypes.func,
}
