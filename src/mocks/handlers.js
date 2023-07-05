import { rest } from 'msw'

export const handlers = [
  rest.get('https://api.coincap.io/v2/assets/bitcoin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 'bitcoin',
          rank: '1',
          symbol: 'BTC',
          name: 'Bitcoin',
          supply: '19420506.0000000000000000',
          maxSupply: '21000000.0000000000000000',
          marketCapUsd: '593449080257.4905098451930454',
          volumeUsd24Hr: '3158324521.3355590312384394',
          priceUsd: '30557.8588043736095159',
          changePercent24Hr: '-1.5643318202322959',
          vwap24Hr: '30902.4632018476412130',
          explorer: 'https://blockchain.info/'
        },
        timestamp: 1688554699826
      })
    )
  })
]
