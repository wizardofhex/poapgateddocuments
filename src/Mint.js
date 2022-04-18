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
import WebFont from 'webfontloader'


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

export default function Mint(props) {
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
    WebFont.load({
      google: {
        families: ['Comfortaa']
      }
    })
  }, [])
  
  var docurl
  //const handleSubmitdecrypt = async () => {
  async function handleSubmitdecrypt() {
    //debugger
    var path = require('path')
    const fetch = require('node-fetch');

    var url = `https://poapdoc-wizardofhex.vercel.app/${docurl}.zip`

    var file1
    const fileresponse = fetch(url)
      .then((response) => response.blob())
      .then(function (myBlob) {
        file1 = new File([myBlob], "resume.zip", { type: fileresponse.type });
      })
      .catch(rejected =>{
        console.log(rejected)
      });
  

    const printfile = async () => {
      const a = await fileresponse;
      console.log(a);

    };

    printfile();

    var decryptFile
    const client = new LitJsSdk.LitNodeClient()
    await client.connect()
    window.litNodeClient = client;
    var authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "xdai" });
    let decryptedFile = "";

    try {
      decryptFile = await LitJsSdk.decryptZipFileWithMetadata({
        authSig,
        file: file1,
        litNodeClient: client
      });
    } catch (error) {
      console.log("Error: Inccorect symmetric key, encrypted content, or do not meet conditions.\n", error);
    }
    setMintingComplete(true)

    //var Filesaver = require('file-saver')
    var file2 = new Blob([decryptFile.decryptedFile], { type: 'application/pdf' })
    const obj_url = URL.createObjectURL(file2)
    const iframe = document.getElementById('viewer')
    iframe.setAttribute('src', obj_url)
    setFileUrl(obj_url)
    //URL.revokeObjectURL(obj_url)
    //Filesaver.saveAs(file2, "decrypted.pdf")

    // return decryptedFile;
  }
  function setDoc(doc) {

    if (doc == 'resume') {
      docurl = 'resume'
      console.log(docurl)
    }
    else if (doc == 'coverletter') {
      docurl = 'coverletter'
      console.log(docurl)

    }

  }

  return (
    <div className={classes.root}>
      <Header networkLoading={networkLoading} />
      <div style={{ height: 24 }} />
      <Container maxWidth='lg' className={classes.fullHeight}>
        
          
            <Grid
              container
              //spacing={3}
              //justify='space-between'
              //alignItems='center'
            >
            
            
              <Grid item xs={2} sm={6}>
              

                <Grid item>
                  
                  <Button
                    onClick={() => { setDoc('resume'); handleSubmitdecrypt() }}
                    variant='primary'
                  >
                  <label for="button">
                  <img src="poap.svg"></img>
                  <div style={{fontFamily:'Comfortaa'}}>
                  <div style={{color:"#8076fa"}}>
                  View Resume
                  </div>
                  </div>
                  </label>
                  </Button>
                  
                </Grid>

              </Grid>
              <Grid item>
              
                <Button
                  onClick={() => { setDoc('coverletter'); handleSubmitdecrypt() }}
                  variant='primary'
                  
                >
                <label>
                <img src="poap.svg"></img>  
                <div style={{fontFamily:'Comfortaa'}}>
                <div style={{color:"#8076fa"}}>
                View Cover Letter
              </div>
                </div>
                </label>
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


        {mintingComplete
          ? (
            <div>
                <Typography variant='h4'>Document Decrypted!</Typography>
                <Typography variant='h5'>
                  You can download it <Link target='_blank' rel='noreferrer' variant='inherit' href={fileUrl}>here</Link>
                </Typography>
                <iframe id="viewer" height="500" width="1000"></iframe>

                <div style={{ height: 24 }} />
                </div>

          )
          : null}
      </Container>

    </div>
  )
}
