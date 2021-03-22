// @ts-nocheck
import React from 'react'
import { makeServer } from 'server'
import TestRenderer from 'react-test-renderer'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

import Dashboard from './Dashboard'

describe('Dashboard', function () {
  const queryClient = new QueryClient()
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  test.skip('fetches the list of resources', async () => {
    server.create('resource', 15)

    const tree = TestRenderer.create(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
