// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Proposals from './index'

describe('Proposals', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <Proposals />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
