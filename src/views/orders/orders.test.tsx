// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Orders from './index'

describe('Orders', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <Orders />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
