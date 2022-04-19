import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { Blob } from 'nft.storage'
import LitJsSdk from 'lit-js-sdk'
import Header from './Header'
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
  const [error, setError] = useState('')
  const [minting, setMinting] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => {
    window.LitJsSdk = LitJsSdk // for debug
    WebFont.load({
      google: {
        families: ['Comfortaa']
      }
    })
  }, [])
  async function addxDaiToMetamask() {
    if (typeof window !== 'undefined') {
      window.ethereum.request({
        jsonrpc: '2.0',
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x64',
            chainName: 'Gnosis Chain',
            rpcUrls: ['https://rpc.gnosischain.com'],
            nativeCurrency: {
              name: 'xDai',
              symbol: 'xDai',
              decimals: 18
            },
            blockExplorerUrls: ['https://blockscout.com/xdai/mainnet']
          }
        ],
        id: 0
      })
      }
      else {
        alert("Error Swtiching to Gnosis Chain (xDao)")
        return
      
    }
  }
  var docurl
  //const handleSubmitdecrypt = async () => {
  async function handleSubmitdecrypt() {
    //debugger
    var path = require('path')
    const fetch = require('node-fetch');
    var test = import("./resume.zip")
    console.log("HERE")
    console.log(test)
    var url = `https://poapdoc-wizardofhex.vercel.app/${docurl}.zip`

    var file1
    const fileresponse = fetch(url)
      .then((response) => response.blob())
      .then(function (myBlob) {
        file1 = new File([myBlob], "resume.zip", { type: fileresponse.type });
      })
      .catch(rejected => {
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
      setMinting(true)
      console.log("Error: Inccorect symmetric key, encrypted content, or do not meet conditions.\n", error);
      return
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
                onClick={() => { addxDaiToMetamask();setDoc('resume'); handleSubmitdecrypt() }}
                variant='primary'
              >
                <label for="button">
                  <img src="poap.svg"></img>
                  <div style={{ fontFamily: 'Comfortaa' }}>
                    <div style={{ color: "#8076fa" }}>
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
                <div style={{ fontFamily: 'Comfortaa' }}>
                  <div style={{ color: "#8076fa" }}>
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

              <Card>
                <CardContent>
                  <div className={classes.error}>{error}</div>
                </CardContent>
              </Card>
            </>
          )
          : null}
        {minting
          ? (
            <>
              <div>
                <CardContent>
                  <div style={{ fontFamily: 'Comfortaa' }}>
                    <div style={{ color: "#8076fa" }}>
                      You do not have the POAP to access this document!
                    </div>
                  </div>


                </CardContent>

              </div>
            </>

          )
          : null}

        {mintingComplete
          ? (
            <div><h3>
              <div style={{ fontFamily: 'Comfortaa' }}>
                <div style={{ color: "#8076fa" }}>
                  Document Decrypted!
                </div>
              </div>
            </h3>
              <h4>
                <div style={{ fontFamily: 'Comfortaa' }}>
                  <div style={{ color: "#8076fa" }}>
                    You can download it <Link target='_blank' rel='noreferrer' variant='inherit' href={fileUrl}>here</Link>
                  </div>
                </div>
              </h4>
              <iframe id="viewer" height="500" width="1000"></iframe>

              <div style={{ height: 24 }} />
            </div>

          )
          : null}
      </Container>

    </div>
  )
}
