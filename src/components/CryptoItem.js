import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

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

function CryptoItem (props) {
  const navigate = useNavigate()
  // const [changedData, setChangedData] = useState(props)
  const [updatedPrice, setUpdatedPrice] = useState()

  const price =
    +props.item.priceUsd > 1
      ? (+props.item.priceUsd).toFixed(2)
      : props.item.priceUsd
  // useEffect(() => {
  //   setChangedData(props)
  // }, [props])

  const socket = new WebSocket(
    `wss://ws.coincap.io/prices?assets=${props.item.id}`
  )
  socket.onmessage = data => {
    console.log(data.data)
    setUpdatedPrice(JSON.parse(data.data))
  }

  const itemClickHandler = useCallback(() => {
    navigate(`/${props.item.id}`)
  }, [props, navigate])

  return (
    <>
    <StyledTableRow
      onClick={itemClickHandler}
      key={props.item.rank}
      style={{ cursor: 'pointer' }}
      data-testid={props['data-testid']}
    >
      <StyledTableCell
        style={{ position: 'relative' }}
        component='th'
        scope='row'
        data-testid='name'
      >
        {props.item.name}
      </StyledTableCell>
      <StyledTableCell align='center' data-testid='price'>
        {(updatedPrice && updatedPrice[props.item.id]) || price}
      </StyledTableCell>
      <StyledTableCell align='right' data-testid='marketCap'>
        {props.item.marketCapUsd}
      </StyledTableCell>
    </StyledTableRow>
    </>
  )
}

export default CryptoItem
