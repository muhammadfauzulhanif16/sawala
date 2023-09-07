import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const ThreadInput = ({ onAddThread }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onCategoryChange = (e) => setCategory(e.target.value)
  const onBodyChange = (e) => setBody(e.target.value)

  return (
    <>
      <Heading mb={4} color='gray.800'>
        Create a new thread
      </Heading>

      <Text mb={8} color='gray.500'>
        Make one or more of your threads
      </Text>

      <FormControl mb={4} isRequired>
        <FormLabel>Title</FormLabel>

        <Input
          rounded='full'
          variant='filled'
          placeholder='What are you thinking about?'
          value={title}
          onChange={onTitleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>

        <Input
          rounded='full'
          variant='filled'
          placeholder='Search easier with category'
          value={category}
          onChange={onCategoryChange}
        />
      </FormControl>

      <FormControl mb={8} isRequired>
        <FormLabel>Content</FormLabel>

        <Textarea
          rounded='xl'
          variant='filled'
          placeholder='Type anything...'
          value={body}
          onChange={onBodyChange}
        />
      </FormControl>

      <Button
        colorScheme='purple'
        w='full'
        rounded='full'
        isDisabled={!title || !body}
        onClick={() => onAddThread({ title, category, body })}
      >
        Add thread
      </Button>
    </>
  )
}

ThreadInput.propTypes = {
    onAddThread: PropTypes.func.isRequired,
}
