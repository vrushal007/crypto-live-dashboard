import React from "react";
import { fireEvent, render,screen } from "@testing-library/react";
import MainLayout from "../components/MainLayout";
import {useGetAllCryptoQuery} from "../api/cryptoApi";
import '@testing-library/jest-dom'

jest.mock('../api/cryptoApi',()=>({
  useGetAllCryptoQuery: jest.fn()
}))

describe('MainLayout', () => {
  
  it('renders search bar and title correctly',()=>{
    useGetAllCryptoQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null
    })

    render(<MainLayout />)

    const searchBar = screen.getByPlaceholderText('Search...')
    const title = screen.getByText('Crypto Live Dashboard')

    expect(searchBar).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    
    fireEvent.change(searchBar,{target:{value:'a*'}})
    expect(searchBar).not.toHaveTextContent(/[\\*?]/)
  })
})