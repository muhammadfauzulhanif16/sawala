/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call onAddComment function when button is clicked
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { CommentInput } from './Input.jsx'
import { store } from '../../redux/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle content typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentInput onAddComment={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const contentInput = await screen.getByPlaceholderText('Type anything...')

    await userEvent.type(contentInput, 'comment testing')

    expect(contentInput).toHaveValue('comment testing')
  })

  it('should call onAddComment function when button is clicked', async () => {
    const mockOnAddComment = vi.fn()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentInput onAddComment={mockOnAddComment} />
        </BrowserRouter>
      </Provider>,
    )
    const contentInput = await screen.getByPlaceholderText('Type anything...')
    await userEvent.type(contentInput, 'comment testing')
    const addButton = await screen.getByText('Send')

    await userEvent.click(addButton)

    expect(mockOnAddComment).toHaveBeenCalled({
      content: 'comment testing',
      threadId: 'thread-1',
    })
  })
})
