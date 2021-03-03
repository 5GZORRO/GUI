// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import FormGenerate from './index'

describe('Membership', function () {
  it('Snapshot ', () => {
    const tree = TestRenderer.create(
        <FormGenerate />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
