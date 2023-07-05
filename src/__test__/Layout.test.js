import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useGetAllCryptoQuery } from '../api/cryptoApi'
import '@testing-library/jest-dom'
import Layout from '../components/Layout'

jest.mock('../api/cryptoApi', () => ({
  useGetAllCryptoQuery: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

const cryptoItems = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '19419618.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '602850655542.6646720877155854',
    volumeUsd24Hr: '4811219313.7767274352503780',
    priceUsd: '31043.3838370386416503',
    changePercent24Hr: '1.2370854025814937',
    vwap24Hr: '31005.5688540072688383',
    explorer: 'https://blockchain.info/'
  },
  {
    id: 'ethereum',
    rank: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    supply: '120219082.7572861300000000',
    maxSupply: null,
    marketCapUsd: '235383706886.5551517574948785',
    volumeUsd24Hr: '2466328514.3884201207149117',
    priceUsd: '1957.9562702352196065',
    changePercent24Hr: '-0.5423507228322393',
    vwap24Hr: '1960.5599126805189656',
    explorer: 'https://etherscan.io/'
  },
  {
    id: 'tether',
    rank: '3',
    symbol: 'USDT',
    name: 'Tether',
    supply: '83352722599.9081300000000000',
    maxSupply: null,
    marketCapUsd: '83397355107.4895871249798664',
    volumeUsd24Hr: '9344476498.4011406010189076',
    priceUsd: '1.0005354655035768',
    changePercent24Hr: '0.0468873935750253',
    vwap24Hr: '1.0001312500590942',
    explorer: 'https://www.omniexplorer.info/asset/31'
  },
  {
    id: 'binance-coin',
    rank: '4',
    symbol: 'BNB',
    name: 'BNB',
    supply: '166801148.0000000000000000',
    maxSupply: '166801148.0000000000000000',
    marketCapUsd: '40827159887.9626663877609140',
    volumeUsd24Hr: '230110397.3411706376039350',
    priceUsd: '244.7654610144689555',
    changePercent24Hr: '-1.6819355431889693',
    vwap24Hr: '246.8519954677214059',
    explorer:
      'https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
  },
  {
    id: 'usd-coin',
    rank: '5',
    symbol: 'USDC',
    name: 'USD Coin',
    supply: '27648399824.1256940000000000',
    maxSupply: null,
    marketCapUsd: '27657951757.4462067626132649',
    volumeUsd24Hr: '707666431.8667147738325341',
    priceUsd: '1.0003454787033345',
    changePercent24Hr: '0.0026809675448012',
    vwap24Hr: '1.0004103627619026',
    explorer:
      'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },
  {
    id: 'xrp',
    rank: '6',
    symbol: 'XRP',
    name: 'XRP',
    supply: '45404028640.0000000000000000',
    maxSupply: '100000000000.0000000000000000',
    marketCapUsd: '22184730022.3301021941486560',
    volumeUsd24Hr: '395272204.0068159786475179',
    priceUsd: '0.4886070837067929',
    changePercent24Hr: '1.3709442420412161',
    vwap24Hr: '0.4871612452042505',
    explorer: 'https://xrpcharts.ripple.com/#/graph/'
  }
]

describe('Layout', () => {
  /* ************ test1 ************** */
  test('loading component renders correctly', () => {
    useGetAllCryptoQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null
    })
    render(<Layout query={undefined} />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()
  })

  /* ************ test2 ************** */
  test('error component renders correctly', () => {
    useGetAllCryptoQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { error: 'Failed to fetch' }
    })

    render(<Layout query={undefined} />)

    const error = screen.getByTestId('error')
    expect(error).toBeInTheDocument()
  })
  
  /* ************ test2 ************** */
  test('main component renders correctly', () => {
    useGetAllCryptoQuery.mockReturnValue({
      data: {
        data: cryptoItems
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    render(<Layout query={undefined} />)

    const cryptoElements = screen.getAllByTestId("singleCrypto")
    expect(cryptoElements).toHaveLength(6)
  })

  /* ************ test3 ************** */
  test('search query works correctly', () => {
    useGetAllCryptoQuery.mockReturnValue({
      data: {
        data: cryptoItems
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    render(<Layout query="b" />)

    const cryptoElements = screen.getAllByTestId("singleCrypto")
    expect(cryptoElements).toHaveLength(2)

  })

  /* ************ test4 ************** */
  test('when crypto item clicked and it should redirect',()=>{
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate
    
    useGetAllCryptoQuery.mockReturnValue({
      data: {
        data: cryptoItems
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    render(<Layout query={''} />)

    const container = screen.getAllByTestId('singleCrypto')
    fireEvent.click(container[0])
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/bitcoin')
  })

})
