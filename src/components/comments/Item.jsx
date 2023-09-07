import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowCurveDownLeft,
  ArrowCurveUpLeft,
} from '@emotion-icons/fluentui-system-regular'
import { Card } from '../common/Card.jsx'
import { useParams } from 'react-router-dom'
import {
  downVoteCommentAction,
  neutralVoteCommentAction,
  upVoteCommentAction,
} from '../../redux/comments/action.js'

export const CommentItem = ({ upVotesBy, downVotesBy, ...comment }) => {
  const dispatch = useDispatch()
  const { id: threadId } = useParams()

  const { authedUser } = useSelector(({ users }) => users)

  const isUpVoted = upVotesBy?.includes(authedUser.id)
  const isDownVoted = downVotesBy?.includes(authedUser.id)

  const onUpVote = ({ commentId, threadId }) => {
    if (isUpVoted) {
      dispatch(
        neutralVoteCommentAction({ commentId, threadId, isUpVote: true }),
      )
    } else if (isDownVoted) {
      dispatch(
        neutralVoteCommentAction({ commentId, threadId, isDownVote: true }),
      )
      dispatch(upVoteCommentAction({ commentId, threadId }))
    } else {
      dispatch(upVoteCommentAction({ commentId, threadId }))
    }
  }

  const downUpVote = ({ commentId, threadId }) => {
    if (isDownVoted) {
      dispatch(
        neutralVoteCommentAction({ commentId, threadId, isDownVote: true }),
      )
    } else if (isUpVoted) {
      dispatch(
        neutralVoteCommentAction({ commentId, threadId, isUpVote: true }),
      )
      dispatch(downVoteCommentAction({ commentId, threadId }))
    } else {
      dispatch(downVoteCommentAction({ commentId, threadId }))
    }
  }

  const actions = [
    {
      'aria-label': 'Up vote',
      colorScheme: 'teal',
      icon: <ArrowCurveUpLeft width={24} />,
      amountData: upVotesBy?.length,
      variant: isUpVoted ? 'solid' : 'ghost',
      onClick: () => onUpVote({ commentId: comment.id, threadId }),
    },
    {
      'aria-label': 'Down vote',
      colorScheme: 'pink',
      icon: <ArrowCurveDownLeft width={24} />,
      amountData: downVotesBy?.length,
      variant: isDownVoted ? 'solid' : 'ghost',
      onClick: () => downUpVote({ commentId: comment.id, threadId }),
    },
  ]

  return (
    <Card
      {...comment}
      to={`comments/${comment.id}`}
      actions={actions}
      isShowContent
    />
  )
}

CommentItem.propTypes = {
  upVotesBy: PropTypes.any,
  downVotesBy: PropTypes.any,
  totalComments: PropTypes.number,
}
