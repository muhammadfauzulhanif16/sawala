import PropTypes from 'prop-types'
import { ThreadItem } from './Item.jsx'
import { Flex } from '@chakra-ui/react'

export const ThreadList = ({ threads }) => {
  return (
    <Flex direction='column' gap={4}>
      {threads.map((thread, id) => (
        <ThreadItem key={id} {...thread} />
      ))}
    </Flex>
  )
}

ThreadList.propTypes = {
  threads: PropTypes.any.isRequired,
}
