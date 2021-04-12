/* eslint-disable react/display-name */
/* eslint-disable no-undef */
// @ts-nocheck
// @jest-environment jsdom
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import Login from './index'
import { QueryClientProvider, QueryClient } from 'react-query'

jest.mock('react-text-mask', () => (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) =>
  <input
    type='text'
    name='key'
    onChange={props.onChange}
    value={props.value}
    onBlur={props.onBlur}
    data-testid={'key'}
  />
)

const mockLogin = jest.fn((key) => {
  return Promise.resolve({ key })
})

const queryClient = new QueryClient()

describe('Login', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display correct error message key', () => {
    const { getByTestId, findByText } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>)

    getByTestId('submit')

    fireEvent.click(getByTestId('submit'))

    expect(findByText('Please enter a valid key')).toBeTruthy()
    expect(mockLogin).not.toBeCalled()
  })

  it.skip('should display matching error when key is invalid', async () => {
    const { getByTestId } = render(<Login />)

    fireEvent.input(getByTestId('key'), {
      target: {
        value: 'asdadasdasd'
      }
    })

    fireEvent.submit(getByTestId('submit'))
    console.log(getByTestId('key').value)
    // expect(getByTestId('key').value).toBe('')
    // expect(getByRole('textbox', 'file-name').value).toBe('')
  })
})
