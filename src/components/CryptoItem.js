import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

// const socket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

function CryptoItem (props) {
  const navigate = useNavigate()
  const [changedData, setChangedData] = useState(props)
  
  const price = +props.item.priceUsd > 1 ? (+props.item.priceUsd).toFixed(2) : props.item.priceUsd
  useEffect(() => {
    setChangedData(props)
  }, [props])

  const socket = new WebSocket(
    `wss://ws.coincap.io/prices?assets=${props.item.id}`
  )
 
  socket.onmessage = data => {
    console.log(JSON.parse(data.data))
  }
  

  // useEffect(()=>{
    // const socket = io(`wss://ws.coincap.io/prices?assets=${props.item.id}`)
    // socket.on('data',(data)=>{      
    //   console.log(data)
    //   // setChangedData(JSON.parse(data.data))
    // })
  // },[])

  const itemClickHandler = useCallback(() => {
    navigate(`/${props.item.id}`)
  }, [props, navigate])

  return (
    <>
      {useMemo(
        () => (
          <StyledTableRow
            onClick={itemClickHandler}
            key={props.item.rank}
            style={{ cursor: 'pointer' }}
          >
            <StyledTableCell
              style={{ position: 'relative' }}
              component='th'
              scope='row'
            >
              {props.item.name}
            </StyledTableCell>
            <StyledTableCell align='center'>
              {(changedData && changedData[props.item.id]) ||
                price}
            </StyledTableCell>
            <StyledTableCell align='right'>
              {props.item.marketCapUsd}
            </StyledTableCell>
          </StyledTableRow>
        ),
        [props,itemClickHandler,price,changedData]
      )}
    </>
  )
}

export default CryptoItem
