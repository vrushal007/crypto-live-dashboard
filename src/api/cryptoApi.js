import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://api.coincap.io'}),
    endpoints: (builder) => ({
        getAllCrypto : builder.query({
            query: () => '/v2/assets'
        }),
        getCrypto : builder.query({
            query: (id) => `/v2/assets/${id}`
        })
    })
})

export const {useGetAllCryptoQuery,useGetCryptoQuery} = cryptoApi