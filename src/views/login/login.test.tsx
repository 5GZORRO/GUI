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
    onChange={props.onChange}
    value={props.value}
    onBlur={props.onBlur}
  />
)

describe('Login', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <Login />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should display correct error message', () => {
    const { getByTestId, findByText } = render(<Login />)

    getByTestId('submit')

    fireEvent.click(getByTestId('submit'))

    findByText('Please enter a valid key')
  })
})
