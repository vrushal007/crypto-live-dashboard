import React, { useState } from 'react'
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
import { useGetAllCryptoQuery } from '../api/cryptoApi'
import classes from './Layout.module.css'

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
  const { data, error, isSuccess, isError, isLoading } = useGetAllCryptoQuery()
  const cryptoData = isSuccess ? data?.data : []
  const [currentPage, setCurrentPage] = useState(1)
  const cryptoPerPage = 8
  const totalPages = Math.ceil(cryptoData.length / cryptoPerPage)
  const indexOfLastMovie = currentPage * cryptoPerPage
  const indexOfFirstMovie = indexOfLastMovie - cryptoPerPage
  const currentCryptos = isSuccess
    ? cryptoData.slice(indexOfFirstMovie, indexOfLastMovie)
    : []

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: '100%', height: '67vh' }}
      >
        <Table stickyHeader aria-label='table'>
          <TableHead>
            <TableRow>
              <StyledTableCell width={'33%'} align='left'>
                Name
              </StyledTableCell>
              <StyledTableCell width={'34%'} align='center'>
                Price(in USD)
              </StyledTableCell>
              <StyledTableCell width={'33%'} align='right'>
                Market Cap(in USD)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <CircularProgress
                    color='inherit'
                    style={{ alignItems: 'center' }}
                    data-testid="loading"
                  />
                </TableCell>
              </TableRow>
            )}
            {isError && <TableRow>
                <TableCell colSpan={3} align="center">
                  <p data-testid='error' style={{color:'red'}}>{error.error}</p>
                </TableCell>
              </TableRow>}
            {isSuccess &&
              (!props.query || props.query.length === 0) &&
              currentCryptos
                .map(item => <CryptoItem data-testid="singleCrypto" key={item.rank} item={item} />)}
            {isSuccess &&
              props.query?.length > 0 &&
              cryptoData
                .filter(item => item.name.toLowerCase().match(props.query))
                .map(item => <CryptoItem data-testid="singleCrypto" key={item.rank} item={item} />)}
          </TableBody>
        </Table>
      </TableContainer>
      {(!props.query || props.query.length === 0) && (
        <div style={{ margin: '1rem' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              data-testid={`btnPage`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${classes.pageButton} ${
                currentPage === index + 1 ? classes.activePage : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export default Layout
