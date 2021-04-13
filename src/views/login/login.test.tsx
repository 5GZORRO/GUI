/* eslint-disable react/display-name */
/* eslint-disable no-undef */
// @ts-nocheck
// @jest-environment jsdom
import React from 'react'
import { render, fireEvent, waitFor, cleanup, renderHook } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import Login from './index'
import { QueryClientProvider, QueryClient } from 'react-query'
import nock from 'nock'

jest.mock('react-text-mask', () => (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) =>
  <input
    type='text'
    name='key'
    onChange={props.onChange}
    value={props.value}
    onBlur={props.onBlur}
    data-testid={'key'}
  />
)

const queryClient = new QueryClient()

describe('Login', function () {
  afterEach(cleanup)

  it('Snapshot ', () => {
    const tree = TestRenderer.create(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display correct error message key', () => {
    const { getByTestId, findByText } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>)

    getByTestId('submit')

    fireEvent.click(getByTestId('submit'))

    expect(findByText('Please enter a valid key')).toBeTruthy()
  })

  it.skip('should display matching error when key is invalid', async () => {
    const { getAllByText, getByTestId } = render(
    <React.Suspense fallback='loading'>
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>)
    </React.Suspense>
    )

    await waitFor(() => getAllByText('Login'))

    nock('http://example.com')
      .get('/api/data')
      .reply(200, {
        stakeholderClaim: {
          governanceBoardDID: 'string',
          stakeholderServices: [],
          stakeholderRoles: [],
          stakeholderProfile: {
            name: 'string',
            address: 'string',
            notificationMethod: {
              notificationType: 'string',
              distributionList: 'string'
            }
          },
          stakeholderDID: 'string'
        },
        state: 'string',
        credentialDefinitionId: 'string',
        idToken: '3432d243r'
      })

    fireEvent.input(getByTestId('key-input'), {
      target: {
        value: 'asdadasdasd'
      }
    })

    fireEvent.submit(getByTestId('submit'))

    const { result } = renderHook(() => useLogin())

    await waitFor(() => {
      return result.current.isSuccess
    })

    expect(result.current.idToken).toEqual({ idToken: '3432d243r' })
  })
})
