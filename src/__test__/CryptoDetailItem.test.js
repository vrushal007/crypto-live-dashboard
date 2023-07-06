import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CryptoDetailItem from '../components/CryptoDetailItem'
import {useGetCryptoQuery} from '../api/cryptoApi'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: () => ({ id: 'bitcoin' })
}))

jest.mock('../api/cryptoApi',()=>({
  useGetCryptoQuery: jest.fn()
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
  
  // beforeAll(()=>{
  //   const mockSocketServer = new Server('wss://ws.coincap.io/prices?assets=bitcoin')
  
  //     mockSocketServer.on('connection',(socket)=>{
  //       socket.onmessage(()=>{
  //         socket.send({data:JSON.stringify({bitcoin:40000})})
  //       })
  //     })
  // })
  
  test('loading state renders correctly', async () => {
    
    useGetCryptoQuery.mockReturnValue({
      data:undefined,
      isLoading:true,
      isError:false,
      isSuccess:false,
      error:null
    })

    render(<CryptoDetailItem />)


    expect(screen.getByRole('progressbar')).toBeInTheDocument()

  })
  test('error state renders correctly', async () => {
    
    useGetCryptoQuery.mockReturnValue({
      data:undefined,
      isLoading:false,
      isError:true,
      isSuccess:false,
      error:{error:'failed to fetch'}
    })

    render(<CryptoDetailItem />)

    const errEle = screen.getByText(/Something wrong/i)
    expect(errEle).toBeInTheDocument()

  })

  test('back button works correctly', async () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
    
    useGetCryptoQuery.mockReturnValue({
      data:undefined,
      isLoading:true,
      isError:false,
      isSuccess:false,
      error:null
    })
    
    render(<CryptoDetailItem />)

    const backBtn = screen.getByTestId('backBtn')
    fireEvent.click(backBtn)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  test('component renders correctly', async () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
    
    useGetCryptoQuery.mockReturnValue({
      data:{
        data:cryptoItem
      },
      isLoading:false,
      isError:false,
      isSuccess:true,
      error:null
    })

    render(<CryptoDetailItem />)
    expect(screen.getByText(/btc/i)).toBeInTheDocument()
    expect(screen.getByTestId('price')).toBeInTheDocument()

  })


  // test('socket works correctly', async () => {
  //   user.setup()
  //   const mockNavigate = jest.fn()
  //   jest.requireMock('react-router-dom').useNavigate = () => mockNavigate

  //   useGetCryptoQuery.mockReturnValue({
  //     data:{
  //       data:cryptoItem
  //     },
  //     isLoading:false,
  //     isError:false,
  //     isSuccess:true,
  //     error:null
  //   })


  //   render(<CryptoDetailItem />)
    
  //   const price = screen.getByTestId('price')

  //   expect(price).toBeInTheDocument()
  //   expect(price).toHaveTextContent("50000")

  //   // const socket = new WebSocket('ws://localhost'); // Create a WebSocket instance
  //   // socket.dispatchEvent(new MessageEvent('message',{data:JSON.stringify({bitcoin:40000})}))
  //   // // user.mockEvent(new MessageEvent('message',{data:JSON.stringify({bitcoin:40000})}))
  //   // expect(price).toHaveTextContent("40000")

  //   expect(price).toBeInTheDocument()
  //   expect(price).toHaveTextContent("50000")

  //  expect(await screen.findByText('40000')).toBeInTheDocument()

  // })
})
