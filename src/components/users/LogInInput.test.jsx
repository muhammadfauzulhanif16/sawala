/**
 * skenario testing
 *
 * - LogInInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call onSubmit function when login button is clicked
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { LogInInput } from './LogInInput.jsx'
import { store } from '../../redux/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)

describe('LogInInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle email typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogInInput onSubmit={() => {}} />
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
          <LogInInput onSubmit={() => {}} />
        </BrowserRouter>
      </Provider>,
    )
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password',
    )

    await userEvent.type(passwordInput, 'passwordtesting')

    expect(passwordInput).toHaveValue('passwordtesting')
  })

  it('should call onSubmit function when login button is clicked', async () => {
    const mockOnSubmit = vi.fn()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogInInput onSubmit={mockOnSubmit} />
        </BrowserRouter>
      </Provider>,
    )

    const emailInput = await screen.getByPlaceholderText('Enter your email')
    const passwordInput = await screen.getByPlaceholderText(
      'Enter your password',
    )

    await userEvent.type(emailInput, 'email@testing.com')
    await userEvent.type(passwordInput, 'passwordtesting')

    const logInButton = await screen.getByRole('button', { name: 'Log in' })

    await userEvent.click(logInButton)

    expect(mockOnSubmit).toBeCalledWith({
      email: 'email@testing.com',
      password: 'passwordtesting',
    })
  })
})
