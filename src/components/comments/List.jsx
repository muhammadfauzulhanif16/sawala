import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'
import { CommentItem } from './Item.jsx'

export const CommentList = ({ comments }) => {
  return (
    <Flex direction='column' gap={4}>
      {comments.map((comment, id) => (
        <CommentItem key={id} {...comment} />
      ))}
    </Flex>
  )
}

CommentList.propTypes = {
  comments: PropTypes.any.isRequired,
}
