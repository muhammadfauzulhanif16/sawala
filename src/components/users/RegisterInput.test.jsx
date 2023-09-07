/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call onSubmit function when register button is clicked
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { store } from '../../redux/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RegisterInput } from './RegisterInput.jsx'

expect.extend(matchers)

describe('RegisterInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle name typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterInput onSubmit={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const nameInput = await screen.getByPlaceholderText('Enter your full name')

    await userEvent.type(nameInput, 'user testing')

    expect(nameInput).toHaveValue('user testing')
  })

  it('should handle email typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterInput onSubmit={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const emailInput = await screen.getByPlaceholderText('Enter your email')

    await userEvent.type(emailInput, 'email@testing.com')

    expect(emailInput).toHaveValue('email@testing.com')
  })

  it('should handle password typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterInput onSubmit={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password',
    )

    await userEvent.type(passwordInput, 'passwordtesting')

    expect(passwordInput).toHaveValue('passwordtesting')
  })

  it('should call onSubmit function when register button is clicked', async () => {
    const mockOnSubmit = vi.fn()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterInput onSubmit={mockOnSubmit} />
        </BrowserRouter>
      </Provider>,
    )

    const nameInput = await screen.getByPlaceholderText('Enter your full name')
    const emailInput = await screen.getByPlaceholderText('Enter your email')
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password',
    )

    await userEvent.type(nameInput, 'user testing')
    await userEvent.type(emailInput, 'email@testing.com')
    await userEvent.type(passwordInput, 'passwordtesting')

    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    })

    await userEvent.click(registerButton)

    expect(mockOnSubmit).toBeCalledWith({
      name: 'user testing',
      email: 'email@testing.com',
      password: 'passwordtesting',
    })
  })
})
