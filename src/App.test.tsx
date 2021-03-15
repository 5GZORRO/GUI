/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import store from './store'
import App from './App'
import { Provider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

describe('App', () => {
  afterEach(cleanup)
  const queryClient = new QueryClient()

  test('render lazy', () => {
    const { getByTestId } = render(
      <App/>
    )
    expect(getByTestId('loading')).toBeTruthy()
  })

  test('render dashboard', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </Provider>
    )
    await waitFor(() => getAllByText('Dashboard'))
  })

  test.skip('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    )
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(screen.findAllByTitle('Dashboard')).toBeInTheDocument()

    const leftClick = { button: 0 }
    userEvent.click(screen.getByText(/about/i), leftClick)

    // check that the content changed to the new page
    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  })

  test.skip('landing on a bad page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    )

    expect(screen.getByText(/no match/i)).toBeInTheDocument()
  })
})
