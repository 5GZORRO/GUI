/* eslint-disable react/display-name */
// @ts-nocheck
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import Login from './index'

jest.mock('react-text-mask', () => props => <input type='text' {...{ ...props }} />)

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
