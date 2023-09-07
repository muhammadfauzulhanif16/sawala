import { Avatar, Td, Tr } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const LeaderboardItem = ({ user: { avatar, name }, score }) => {
  return (
    <Tr>
      <Td>
        <Avatar name='Dan Abrahmov' src={avatar} />
      </Td>
      <Td>{name}</Td>
      <Td isNumeric>{score}</Td>
    </Tr>
  )
}

LeaderboardItem.propTypes = {
  user: PropTypes.any,
  score: PropTypes.any,
}
