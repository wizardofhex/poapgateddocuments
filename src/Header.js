import React, {  } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import GitHubIcon from '@material-ui/icons/GitHub'


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
          <div style={{ fontFamily: 'Comfortaa' }}>
            <div style={{ color: "#8076fa" }}>
              POAP Gated Documents
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

                  <div style={{ fontFamily: 'Comfortaa' }}>
                    <div style={{ color: "#8076fa" }}>
                      Connecting to the 🔥LIT Protocol...
                    </div>
                  </div>

                </Grid>
              </Grid>
            )
            : (
              <div style={{ fontFamily: 'Comfortaa' }}>
                <div style={{ color: "#8076fa" }}>

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
              <Link href='https://github.com/wizardofhex'><GitHubIcon /></Link>
            </Grid>
            <Grid item>
              <link rel="stylesheet" type="text/css" href="menu.css" />
              <div class="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" id="ham__btn" for="menu__toggle">
                  <span></span>
                </label>
                <ul class="menu__box">
                  <li class="hList"><a class="menu__item" href="/">Home</a></li>
                  <li class="hList"><a class="menu__item" href="/encrypt">Encrypt Files</a></li>
                </ul>
              </div>


            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
