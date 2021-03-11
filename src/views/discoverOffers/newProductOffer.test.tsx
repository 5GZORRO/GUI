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
  it.skip('Snapshot', () => {
    // Problem no CTabPane
    server.createList('resource', 10, {
      resourceSpecification: server.create('resourceSpecification'),
      resourcePhysicalCapabilities: server.createList('resourcePhysicalCapabilitie', 5, {
        hardwareCapabilities: server.createList('hardwareCapabilitie', 5),
        feature: server.create('feature')
      }),
      resourceVirtualCapabilities: server.createList('resourceVirtualCapabilitie', 2, {
        virtualCapabilities: server.createList('virtualCapabilitie', 3)
      })
    })

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
