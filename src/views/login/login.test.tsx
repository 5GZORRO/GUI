// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Login from './index'

jest.mock('react-text-mask', () => props => <input type="text" {...{ ...props }} />)

describe('Login', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <Login />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
