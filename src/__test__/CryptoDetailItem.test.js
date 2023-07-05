import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CryptoDetailItem from '../components/CryptoDetailItem'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: () => ({ id: 'bitcoin' })
}))

const cryptoItem = {
  name: 'Bitcoin',
  symbol: 'BTC',
  priceUsd: '50000',
  changePercent24Hr: '1.5',
  marketCapUsd: '1000000000',
  volumeUsd24Hr: '50000000',
  supply: '21000000',
  maxSupply: '21000000'
}

describe('Crypto Detail Item', () => {
  test('renders correctly', async () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
    render(<CryptoDetailItem />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    // global.WebSocket = jest.fn().mockImplementation(() => ({
    //   onopen: jest.fn(),
    //   onmessage: jest.fn(),
    //   onerror: jest.fn(),
    // }));

    // screen.debug()
    // screen.debug()
    // const name = await screen.findByText('Bitcoin')
    // expect(name).toBeInTheDocument()

    // const symbol = await screen.findByTestId('symbol',
    //   {
    //     timeout:3000
    //   }
    // )
    // const price = screen.getByTestId('price')
    // expect(symbol).toBeInTheDocument()
    // expect(price).toBeInTheDocument()
    
    // const updatedPrice = { bitcoin: '55000' }
    // fireEvent.mockEvent(
    //   new MessageEvent('message', { data: JSON.stringify(updatedPrice) })
    // )

    // expect(screen.getByTestId('price')).toHaveTextContent('55000')

    fireEvent.click(screen.getByTestId('backBtn'))

    expect(mockNavigate).toHaveBeenCalled()
  })

  // test('back button works correctly', async () => {
  //   const mockNavigate = jest.fn()
  //   jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
  //   render(<CryptoDetailItem />)

  //   global.fetch = jest.fn().mockResolvedValue({
  //     ok: false
  //   })

  //   const backBtn = screen.getByTestId('backBtn')
  //   fireEvent.click(backBtn)
  //   expect(mockNavigate).toHaveBeenCalledTimes(1)
  //   expect(mockNavigate).toHaveBeenCalledWith('/')
  // })
})
