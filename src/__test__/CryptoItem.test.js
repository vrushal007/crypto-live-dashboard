import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {} from '../api/cryptoApi'
import user from '@testing-library/user-event'
import CryptoItem from '../components/CryptoItem'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: () => ({ id: 'bitcoin' })
}))

jest.mock('../api/cryptoApi', () => ({
  useGetCryptoQuery: jest.fn()
}))

const item = {
  name: 'Bitcoin',
  rank: '1',
  id: 'bitcoin',
  marketCapUsd: 6000000,
  priceUsd: 40000.123456
}

describe('CryptoItem', () => {
  test('renders correctly', () => {
    render(<CryptoItem item={item} />)
    const name = screen.getByTestId('name')
    const price = screen.getByTestId('price')
    const marketCap = screen.getByTestId('marketCap')

    expect(name).toBeInTheDocument()
    expect(name).toHaveTextContent(/bitcoin/i)
    expect(price).toBeInTheDocument()
    expect(price).toHaveTextContent('40000.12')
    expect(marketCap).toBeInTheDocument()
    expect(marketCap).toHaveTextContent('6000000')
    

  })
  test('item click triggers useNavigate with id',async () => {
    user.setup()
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
    
    render(<CryptoItem item={item} />)
    const row = screen.getByRole('row')
  
    expect(row).toBeInTheDocument()
    await user.click(row)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/bitcoin')

  })
})
