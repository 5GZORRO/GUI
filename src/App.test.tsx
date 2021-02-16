import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
/**
 * @jest-environment jsdom
 */
test('renders loading spinner', () => {
  const { container } = render(<App />)
  expect(container.querySelector('.sk-spinner')).toBeTruthy()
})
