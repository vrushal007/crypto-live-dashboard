import React, { useState } from 'react'
import Layout from './Layout'
import { TextField, Typography } from '@mui/material'
import classes from './MainLayout.module.css'

function MainLayout () {
  const [query, setQuery] = useState('')
  const searchHandler = e => {
    const sanitizedValue = e.target.value.replace(/[*\\?]/g, '');
    setQuery(sanitizedValue)
  }
  return (
    <div>
      <div className={classes.container}>
        <Typography variant='h4' gutterBottom data-testid="title">
          Crypto Live Dashboard
        </Typography>
        <TextField
          data-testid="searchBar"
          id='outlined-basic'
          label='Search Crypo'
          variant='outlined'
          style={{ width: '100%', margin: '0.5rem' }}
          onChange={searchHandler}
          value={query}
          placeholder='Search...'
        />
        <Layout query={query} />
      </div>
    </div>
  )
}

export default MainLayout
