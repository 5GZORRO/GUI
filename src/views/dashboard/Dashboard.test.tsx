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

  it('shows the users from our server', async () => {
    server.create('pagedGovernanceProposal', {
      proposalId: '71aebee3-9ca3-44c7-92c1-28b1dc5c3dce',
      status: 'PROPOSED',
      actionType: 'SLA_DISPUTE',
      statusUpdated: '2021-02-18T03:58:04.828Z',
      actionParams: {
        entityIdentityId: 'f8e40818-0e2b-4c29-a541-04872cde4d97',
        evidence: 'fakeWord'
      }
    })

    const tree = TestRenderer.create(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
