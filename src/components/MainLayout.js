import React, { useState } from 'react'
import Layout from './Layout'
import { TextField, Typography } from '@mui/material'
import classes from './MainLayout.module.css'

function MainLayout () {
  const [query, setQuery] = useState()
  const searchHandler = e => {
    setQuery(e.target.value)
  }
  return (
    <div>
      <div className={classes.container}>
        <Typography variant='h4' gutterBottom>
          Crypto Live Dashboard
        </Typography>
        <TextField
          id='outlined-basic'
          label='Search Crypo'
          variant='outlined'
          style={{ width: '100%', margin: '0.5rem' }}
          onChange={searchHandler}
        />
        <Layout query={query} />
      </div>
    </div>
  )
}

export default MainLayout
