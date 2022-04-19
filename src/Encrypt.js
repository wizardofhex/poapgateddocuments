import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import LandscapeIcon from '@material-ui/icons/Landscape'
import LandscapeOutlinedIcon from '@material-ui/icons/LandscapeOutlined'
import { NFTStorage, Blob } from 'nft.storage'

import LitJsSdk from 'lit-js-sdk'
import Presentation from './components/Presentation'
import { createTokenMetadata } from './utils/cloudFunctions'
import { fileToDataUrl } from './utils/browser'
import {
  createHtmlWrapper,
  createMediaGridHtmlString
} from './utils/lit'
import {
  openseaUrl,
  transactionUrl
} from './utils/urls'
import Header from './Header'
import { saveAs } from 'file-saver'
import { decrypt } from 'eth-sig-util'
import path, { resolve } from 'path'
import raw from 'raw.macro'
import fetch from 'node-fetch'
import { pipeline } from 'stream'
//import { Blob } from 'buffer'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 1300,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%'
  },
  error: {
    color: 'red',
    fontSize: 16
  },
  linkInput: {
    width: '100%'
  },
  uploadHolder: {
    backgroundColor: '#efefef',
    borderRadius: theme.shape.borderRadius,
    margin: 16,
    height: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  stretchHeight: {
    alignSelf: 'stretch'
  },
  bold: {
    fontWeight: 'bold'
  },
  leftAlignText: {
    textAlign: 'left'
  },
  selectDropdown: {
    width: '100%',
    textAlign: 'left'
  }
}))

export default function Encrypt(props) {
  const classes = useStyles()
  const { networkLoading } = props
  const [includedFiles, setIncludedFiles] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [socialMediaUrl, setSocialMediaUrl] = useState('')
  const [chain, setChain] = useState('fantom')
  const [error, setError] = useState('')
  const [minting, setMinting] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [fileUrl, setFileUrl] = useState('')
  const [txHash, setTxHash] = useState('')

  useEffect(() => {
    window.LitJsSdk = LitJsSdk // for debug
  }, [])
  var poaptextbox
  async function handleSubmit() {


    console.log('encrypting locked files')
    const lockedFiles = includedFiles.filter(f => !f.backgroundImage && f.encrypted)

    console.log(lockedFiles)
    if (!lockedFiles[0]) {
      console.log('no media chosen')
      return
    }
    debugger;
    const readableStreamForFile = lockedFiles[0].originalFile
    const client = new LitJsSdk.LitNodeClient()
    await client.connect()
    window.litNodeClient = client
    var authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "xdai" });

    console.log("Auth sig while encrypting")
    console.log(authSig)

    const chain = "xdai"
    const accessControlConditions = [
      {
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain: "xdai",
        method: "tokenURI",
        parameters: [],
        returnValueTest: {
          comparator: "=",
          value: poaptextbox,
        },
      },
    ]
    console.log(poaptextbox)
    const { zipBlob, encryptedSymmetricKey1 } = await LitJsSdk.encryptFileAndZipWithMetadata({
      authSig,
      accessControlConditions,
      chain,
      file: readableStreamForFile,
      litNodeClient: client
    })
    //console.log(zipBlob)

    const encryptedReturnObject = {
      encryptedSymmetricKey1,
      encryptedBlob: zipBlob
    }
    var Filesaver = require('file-saver')
    Filesaver.saveAs(zipBlob, "encrypted.zip")
    console.log('minting')
    //return encryptedReturnObject;
    return
  }

  const handleMediaChosen = async (e) => {
    

    if (!e.target.files[0]) {
      console.log('no media chosen')
      return
    }
    const files = e.target.files
    const convertedFiles = []
    for (let i = 0; i < files.length; i++) {
      const dataUrl = await fileToDataUrl(files[i])
      convertedFiles.push({
        type: files[i].type,
        name: files[i].name,
        encrypted: true,
        backgroundImage: false,
        dataUrl,
        originalFile: files[i]
      })
    }
    const newIncludedFiles = [...includedFiles, ...convertedFiles]

    setIncludedFiles(newIncludedFiles)
  }

  const handleRemoveFile = (i) => {
    const file = includedFiles[i]
    if (file.backgroundImage) {
      setBackgroundImage(null)
    }
    setIncludedFiles(prevFiles => {
      const tempFiles = [...prevFiles]
      tempFiles.splice(i, 1)
      return tempFiles
    })
  }

  function getInput() {
    poaptextbox = document.getElementById("mytext").value
    console.log(poaptextbox)
    if (poaptextbox == null) {
      alert("No POAP name entered. Try to enter the name of a POAP.")
      return
    }
  }

  return (
    <div className={classes.root}>
      <Header networkLoading={networkLoading} />
      <div style={{ height: 24 }} />
      <Container maxWidth='lg' className={classes.fullHeight}>


        <Grid
          container
          spacing={3}
          justify='space-between'
          alignItems='center'
        >
          <Grid item xs={12} sm={6} className={classes.stretchHeight}>
            <div className={classes.uploadHolder}>
              <Grid
                container
                direction='column'
                alignItems='center'
                justify='center'
                spacing={2}
                className={classes.fullHeight}
              >

                <Grid item>
                  <CloudUploadIcon fontSize='large' />

                  <Typography variant='body1' className={classes.bold}>
                    Upload your files here
                  </Typography>
                  <Typography variant='body1'>
                    Images, videos, audio, and PDF files accepted.  25mb max total.
                  </Typography>
                </Grid>

                <Grid item>
                  <label htmlFor='file-upload-nft'>
                    <Button variant='outlined' component='span' id="upload">
                      CLICK TO UPLOAD
                    </Button>
                  </label>
                  <input
                    type='file'
                    id='file-upload-nft'
                    style={{ display: 'none' }}
                    accept='video/*,audio/*,image/*,application/pdf'
                    onClick={e => e.target.value = ''}
                    onChange={handleMediaChosen}
                    multiple
                  />
                </Grid>
                <Grid item>
                  {includedFiles.length > 0
                    ? (
                      <Typography
                        variant='body1'
                        className={classes.bold}
                      >
                        Included Files
                      </Typography>
                    )
                    : null}
                  {includedFiles.map((file, i) =>
                    <Grid
                      key={i}
                      spacing={1}
                      justify='flex-start'
                      alignItems='center'
                    >
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography
                          variant='body1'
                          className={classes.leftAlignText}
                        >
                          {file.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Tooltip title='Remove file from LIT'>
                          <IconButton
                            size='small'
                            onClick={() => handleRemoveFile(i)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ fontFamily: 'Comfortaa' }}>
              <div style={{ color: "#8076fa" }}>
                <label for="mytext">Enter Name of POAP</label>
              </div>
            </div>
            <input type="text" name="mytext" id="mytext" />

            <div style={{ height: 16 }} />

            <Button

              onClick={() =>{getInput();handleSubmit()}}
              variant='outlined'
              disabled={minting || networkLoading}
              id="submitbtn"
            >
              Submit
            </Button>


          </Grid>
        </Grid>


        {error
          ? (
            <>
              <div style={{ height: 16 }} />
              <Card>
                <CardContent>
                  <div className={classes.error}>{error}</div>
                </CardContent>
              </Card>
            </>
          )
          : null}

        {minting && !mintingComplete
          ? (
            <div>
              <div style={{ height: 16 }} />
              <CircularProgress size={50} />
              <Typography variant='h6'>Minting, please wait...</Typography>
            </div>
          )
          : null}

        {
          includedFiles.length > 0 && !minting && !mintingComplete
            ? (
              <>
                <div style={{ height: 16 }} />
                <Typography variant='h6'>
                  Preview of your document
                </Typography>
                <div style={{ height: 8 }} />
                <Card className={classes.fullHeight}>
                  <CardContent className={classes.fullHeight}>
                    <Presentation
                      previewMode
                      title={title}
                      description={description}
                      quantity={quantity}
                      socialMediaUrl={socialMediaUrl}
                      publicFiles={includedFiles.filter(f => !f.backgroundImage && !f.encrypted)}
                      lockedFilesForPreview={includedFiles.filter(f => !f.backgroundImage && f.encrypted)}
                      backgroundImage={backgroundImage}
                    />
                  </CardContent>
                </Card>
              </>
            )
            : null
        }
      </Container>

    </div>
  )
}