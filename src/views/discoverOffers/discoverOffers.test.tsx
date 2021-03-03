// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import DiscoverOffers from './index'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()

describe('Discover Offers', function () {
  it.skip('Snapshot ', () => {
    const tree = TestRenderer.create(
      <Router history={history}>
        <DiscoverOffers />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
