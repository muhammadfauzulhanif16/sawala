import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getThreadAction } from '../../redux/threads/action.js'
import { Layout } from '../../components/common/Layout.jsx'
import { ThreadItem } from '../../components/threads/Item.jsx'
import { AbsoluteCenter, Box, Divider } from '@chakra-ui/react'
import { CommentList } from '../../components/comments/List.jsx'
import { CommentInput } from '../../components/comments/Input.jsx'
import { createCommentAction } from '../../redux/comments/action.js'

export const ThreadDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { thread } = useSelector(({ threads }) => threads)

  const onAddComment = async ({ content, threadId }) => {
    await dispatch(createCommentAction({ content, threadId }))
  }

  useEffect(() => {
    dispatch(getThreadAction(id))
  }, [dispatch, id])

  return (
    <Layout>
      <ThreadItem {...thread} isShowContent isDetailPage />

      <Box pos='relative' py={12} zIndex={1}>
        <Divider />
        <AbsoluteCenter w='full' display='flex' justifyContent='center'>
          <CommentInput onAddComment={onAddComment} />
        </AbsoluteCenter>
      </Box>

      {thread?.comments?.length > 0 && (
        <CommentList comments={thread?.comments} />
      )}
    </Layout>
  )
}
