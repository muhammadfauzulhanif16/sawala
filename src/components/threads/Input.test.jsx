/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle content typing correctly
 *   - should call onAddComment function when button is clicked
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { ThreadInput } from './Input.jsx'
import { store } from '../../redux/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle title typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput onAddThread={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const titleInput = await screen.getByPlaceholderText(
      'What are you thinking about?',
    )

    await userEvent.type(titleInput, 'thead title')

    expect(titleInput).toHaveValue('thead title')
  })

  it('should handle category typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput onAddThread={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const categoryInput = await screen.getByPlaceholderText(
      'Search easier with category',
    )

    await userEvent.type(categoryInput, 'thread category')

    expect(categoryInput).toHaveValue('thread category')
  })

  it('should handle content typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput onAddThread={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const contentInput = await screen.getByPlaceholderText('Type anything...')

    await userEvent.type(contentInput, 'thread content')

    expect(contentInput).toHaveValue('thread content')
  })

  it('should call onAddThread function when button is clicked', async () => {
    const mockOnAddThread = vi.fn()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput onAddThread={mockOnAddThread} />
        </BrowserRouter>
      </Provider>,
    )

    const titleInput = await screen.getByPlaceholderText(
      'What are you thinking about?',
    )
    await userEvent.type(titleInput, 'thead title')
    const categoryInput = await screen.getByPlaceholderText(
      'Search easier with category',
    )
    await userEvent.type(categoryInput, 'thread category')
    const contentInput = await screen.getByPlaceholderText('Type anything...')
    await userEvent.type(contentInput, 'comment testing')
    const addButton = await screen.getByRole('button', { name: 'Add thread' })

    await userEvent.click(addButton)

    expect(mockOnAddThread).toHaveBeenCalled({
      title: 'thread title',
      category: 'thread category',
      body: 'thread content',
    })
  })
})
