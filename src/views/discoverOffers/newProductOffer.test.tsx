// @ts-nocheck
import React from 'react'
import TestRenderer from 'react-test-renderer'
import NewProductOffer from './newProductOffer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { makeServer } from 'server'

const history = createMemoryHistory()

describe('New Product Offer', function () {
  const queryClient = new QueryClient()
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })
  it('Snapshot', () => {
    const tree = TestRenderer.create(
      <Router history={history}>
        <QueryClientProvider client={queryClient}>
          <NewProductOffer />
        </QueryClientProvider>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
