import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  downVoteThreadAction,
  neutralVoteThreadAction,
  upVoteThreadAction,
} from '../../redux/threads/action.js'
import {
  ArrowCurveDownLeft,
  ArrowCurveUpLeft,
  CommentMultiple,
} from '@emotion-icons/fluentui-system-regular'
import { Card } from '../common/Card.jsx'

export const ThreadItem = ({
  upVotesBy,
  downVotesBy,
  totalComments,
  isShowContent,
  isDetailPage = false,
  ...thread
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authedUser } = useSelector(({ users }) => users)

  const isUpVoted = upVotesBy?.includes(authedUser.id)
  const isDownVoted = downVotesBy?.includes(authedUser.id)

  const onUpVote = (id) => {
    if (isUpVoted) {
      dispatch(neutralVoteThreadAction({ id, isUpVote: true, isDetailPage }))
    } else if (isDownVoted) {
      dispatch(neutralVoteThreadAction({ id, isDownVote: true, isDetailPage }))
      dispatch(upVoteThreadAction({ id, isDetailPage }))
    } else {
      dispatch(upVoteThreadAction({ id, isDetailPage }))
    }
  }

  const downUpVote = (id) => {
    if (isDownVoted) {
      dispatch(neutralVoteThreadAction({ id, isDownVote: true, isDetailPage }))
    } else if (isUpVoted) {
      dispatch(neutralVoteThreadAction({ id, isUpVote: true, isDetailPage }))
      dispatch(downVoteThreadAction({ id, isDetailPage }))
    } else {
      dispatch(downVoteThreadAction({ id, isDetailPage }))
    }
  }

  const actions = [
    {
      'aria-label': 'Up vote',
      colorScheme: 'teal',
      icon: <ArrowCurveUpLeft width={24} />,
      amountData: upVotesBy?.length,
      variant: isUpVoted ? 'solid' : 'ghost',
      onClick: () => onUpVote(thread.id),
    },
    {
      'aria-label': 'Down vote',
      colorScheme: 'pink',
      icon: <ArrowCurveDownLeft width={24} />,
      amountData: downVotesBy?.length,
      variant: isDownVoted ? 'solid' : 'ghost',
      onClick: () => downUpVote(thread.id),
    },
    {
      'aria-label': 'Comments',
      colorScheme: 'orange',
      icon: <CommentMultiple width={24} />,
      amountData: totalComments,
      onClick: isDetailPage ? null : () => navigate(`/threads/${thread.id}`),
    },
  ]

  return (
    <Card
      {...thread}
      to={`threads/${thread.id}`}
      actions={actions}
      isShowContent={isShowContent}
    />
  )
}

ThreadItem.propTypes = {
  upVotesBy: PropTypes.any,
  downVotesBy: PropTypes.any,
  totalComments: PropTypes.number,
  isShowContent: PropTypes.bool,
  isDetailPage: PropTypes.bool,
}
