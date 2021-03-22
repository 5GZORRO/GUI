/* eslint-disable react/display-name */
/* eslint-disable no-undef */
// @ts-nocheck
// @jest-environment jsdom
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import Login from './index'

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

const mockLogin = jest.fn((key, file) => {
  return Promise.resolve({ key, file })
})

describe('Login', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <Login />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display correct error message key', () => {
    const { getByTestId, findByText } = render(<Login />)

    getByTestId('submit')

    fireEvent.click(getByTestId('submit'))

    expect(findByText('Please enter a valid key')).toBeTruthy()
    expect(mockLogin).not.toBeCalled()
  })

  it('should display correct error message file', () => {
    const { getByTestId, findByText } = render(<Login />)

    getByTestId('submit')

    fireEvent.click(getByTestId('submit'))

    expect(findByText('Please enter a file')).toBeTruthy()
    expect(mockLogin).not.toBeCalled()
  })

  it.skip('should display matching error when key is invalid', async () => {
    const { getByRole, getByTestId } = render(<Login />)

    fireEvent.input(getByTestId('key'), {
      target: {
        value: '123 123 123'
      }
    })

    fireEvent.input(getByRole('textbox', 'file-name'), {
      target: {
        value: [{
          lastModified: 1613853259704,
          lastModifiedDate: 'Sat Feb 20 2021 20:34:19',
          name: 'test.pdf',
          size: 211571,
          type: 'application/pdf',
          webkitRelativePath: ''
        }]
      }
    })

    fireEvent.submit(getByTestId('submit'))
    console.log(getByTestId('key').value)
    // expect(getByTestId('key').value).toBe('')
    // expect(getByRole('textbox', 'file-name').value).toBe('')
  })
})
