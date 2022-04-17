import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import GitHubIcon from '@material-ui/icons/GitHub'

import LitJsSdk from 'lit-js-sdk'

const useStyles = makeStyles(theme => ({

}))

export default function Header(props) {
  const classes = useStyles()
  const { networkLoading } = props

  return (
    <div className={classes.header}>
      <Grid
        container
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
        <div style={{fontFamily:'Comfortaa'}}>
        <div style={{color:"#8076fa"}}>
            Woh's POAP Application
          </div>
        </div>  
        </Grid>
        
        <Grid item>
          {networkLoading
            ? (
              <Grid container alignItems='center'>
                <Grid item>
                  <div className='lds-ripple' id='loadingSpinner'><div /><div /></div>
                </Grid>
                <Grid item>
                  
                  <div style={{fontFamily:'Comfortaa'}}>
                  <div style={{color:"#8076fa"}}>
                    Connecting to the 🔥LIT Protocol...
                    </div>
                    </div>
                  
                </Grid>
              </Grid>
            )
            : (
              <div style={{fontFamily:'Comfortaa'}}>
                  <div style={{color:"#8076fa"}}>
             
                Connected to the 🔥LIT Protocol
             
              </div>
              </div>


            )}

        </Grid>
        <Grid item>
          <Grid container spacing={3}>

            <Grid item>
              <Link href='https://litprotocol.com'>🔥</Link>
            </Grid>
            <Grid item>
              <Link href='https://github.com/LIT-Protocol/MintLIT'><GitHubIcon /></Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
