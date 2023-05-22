import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './CryptoDetailItem.module.css'
import { CircularProgress } from '@mui/material'

function CryptoDetailItem () {
  const params = useParams()
  const navigate = useNavigate()
  const [itemData, setItemData] = useState({})
  const [updatedPrice, setUpdatedPrice] = useState()
  const [loading, setLoading] = useState(false)
  const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${params.id}`)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${params.id}`
      )
      setLoading(false)
      const resData = await response.json()
      setItemData(resData.data)
    }
    fetchItem()
  }, [params])

  socket.onmessage = message => {
    const data = message.data
    // console.log(JSON.parse(data))
    setUpdatedPrice(JSON.parse(data))
  }
  socket.onerror = e => {
    // console.log(e)
  }
  socket.onopen = e => {
    // console.log("open",e)
  }
  return (
    <div className={classes.main}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classes.container}>
          <h1>{itemData.name}</h1>
          <div className={classes.item}>
            <p>Symbol:</p>
            <p>{itemData.symbol}</p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Price (In USD):</p>
            <p>{updatedPrice ? updatedPrice[params.id] : itemData.priceUsd}</p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Change % (Last 24 hr):</p>
            <p
              className={
                itemData.changePercent24Hr < 0
                  ? classes.negative
                  : classes.positive
              }
            >
              {itemData.changePercent24Hr}%
            </p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Market Cap (In USD):</p>
            <p>{itemData.marketCapUsd}</p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Volume used (last 24 hr):</p>
            <p>{itemData.volumeUsd24Hr}</p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Supply:</p>
            <p>{itemData.supply}</p>
          </div>
          <hr />
          <div className={classes.item}>
            <p>Max Supply:</p>
            <p>{itemData.maxSupply ? itemData.maxSupply : 'NA'}</p>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          navigate('/')
        }}
        className={classes.btn}
      >
        Back to home
      </button>
    </div>
  )
}

export default CryptoDetailItem
