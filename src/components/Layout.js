import React from 'react'
// import { io } from 'socket.io-client'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CryptoItem from './CryptoItem'
import { CircularProgress } from '@mui/material'
import {useSelector} from 'react-redux'
import {useGetAllCryptoQuery} from '../api/cryptoApi'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

function Layout (props) {
  // const [currencyList, setCurrencyList] = useState()
  // const items = useSelector(state=>state.ui.items)
  // console.log(items)

  // setCurrencyList(items)
  // console.log(props.query)
  // useEffect(() => {
  //   fetch('https://api.coincap.io/v2/assets').then(async data => {
  //     const resData = await data.json()
  //     setCurrencyList(resData.data)
  //   })
  // }, [])

  const {data:items,error} = useGetAllCryptoQuery()
  console.log(error)
  console.log(items)
  return (
    <TableContainer
      component={Paper}
      style={{ width: '100%', height: '70vh', overflow: 'scroll' }}
    >
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align='center'>Price(in USD)</StyledTableCell>
            {/* <StyledTableCell align='right'>Symbol</StyledTableCell> */}
            <StyledTableCell align='right'>Market Cap(in USD)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items ? (
            items.data
              .filter(item => item.name.toLowerCase().match(props.query))
              .map(item => <CryptoItem key={item.rank} item={item} />)
          ) : (
            <CircularProgress
              color='inherit'
              style={{ alignItems: 'center' }}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Layout
