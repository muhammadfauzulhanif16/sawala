import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagLabel,
  TagLeftIcon,
  VisuallyHidden,
} from '@chakra-ui/react'
import { CommentAdd, Send } from '@emotion-icons/fluentui-system-regular'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

export const CommentInput = ({ onAddComment }) => {
  const { id: threadId } = useParams()

  const [content, setContent] = useState('')

  const onContentChange = (e) => setContent(e.target.value)

  return (
    <Popover>
      <PopoverTrigger>
        <Button p={0} rounded='full' h={8} pos='sticky' top={0}>
          <Tag
            size='lg'
            variant='subtle'
            colorScheme='purple'
            borderRadius='full'
          >
            <TagLeftIcon boxSize={6} as={CommentAdd} />
            <TagLabel>Click to add a comment</TagLabel>
          </Tag>
        </Button>
      </PopoverTrigger>

      <PopoverContent p={2} rounded='full'>
        <PopoverArrow />

        <Flex gap={2}>
          <Input
            placeholder='Type anything...'
            variant='filled'
            rounded='full'
            value={content}
            onChange={onContentChange}
          />

          <Button
            p={0}
            rounded='full'
            colorScheme='purple'
            isDisabled={!content}
            onClick={() => onAddComment({ content, threadId })}
          >
            <Send width={24} />
            <VisuallyHidden>Send</VisuallyHidden>
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
}
