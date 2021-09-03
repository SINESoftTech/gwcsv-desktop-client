import React, { useEffect } from 'react'
import { electronActions, gwActions, sightTourActions, useAppDispatch, useAppState } from '../../Context'
import isElectron from 'is-electron'
import { Alert, AlertTitle } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import {
  AppBar,
  Box, Collapse,
  Container,
  CssBaseline,
  FormControl,
  Grid, IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import GwMenuTop from './GwMenuTop'
import mainStyles from './mainStyles'
import ScannedImageList from '../../Components/ScannedImageList'
import ConfirmedEvidenceList from '../../Components/ConfirmedEvidenceList'
import IdentifiedEvidenceList from '../../Components/IdenfiedEvidenceList'
import {
  gwUploaded,
  identifyResultConfirmed,
  identifyResultReceived,
  identifySent
} from '../../Actions/electionActions'
import { getIdentifyResult } from '../../Actions/sightourActions'
import { SIGOUTOUR_EVIDENCE_TYPE } from '../../Mapper/sigoutour_mapper'
import { openScanner, scan } from '../../Actions/scanAction'
import DialogComponent from '../../Dialog'

const R = require('ramda')
const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Main = (props) => {
  const dispatch = useAppDispatch()
  const appState = useAppState()
  const [value, setValue] = React.useState(0)
  const [declareProperties, setDeclareProperties] = React.useState({
    'clientTaxId': '',
    'reportingPeriod': '',
    'evidenceType': '',
    isDeclareBusinessTax: true
  })
  const classes = mainStyles()
  const [scanCount, setScanCount] = React.useState(0)
  const [scanDisable, setScanDisable] = React.useState(false)
  const [scanAlert, setScanAlert] = React.useState(false)

  useEffect(async () => {
    await electronActions.getFileLists(dispatch)
    await gwActions.getAllClientList(dispatch, appState.auth.user.username, appState.auth.user.taxId, appState.auth.user.token)
    await openScanner(dispatch)
  }, [])

  //region Main Events
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleSelectionChange = (event) => {
    const { name, value } = event.target
    setDeclareProperties(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    if (name === 'clientTaxId') {
      handleReset()
    }
  }
  const handleScannerError = (errorMsg) => {
    const isErrorMsgStartsWithError = errorMsg.startsWith('error:')
    setScanDisable(false)
    setScanAlert(false)
    if (isErrorMsgStartsWithError && errorMsg === 'error:feeding error') {
      alert('無法掃描，請放入紙張')
      return
    }
    if (isErrorMsgStartsWithError) {
      alert('無法與掃描機連線，請重新整理')
      return
    }

  }

  //region scanned image list events
  const handleSendImageToIdentify = async (event, data) => {
    const accountingfirmTaxId = appState.auth.user.taxId
    const businessEntityTaxId = declareProperties.clientTaxId
    const sendToIdentifyData = data.map(d => {
      return {
        'sourceFullPath': d.fullPath,
        'sourceFileName': d.fileName,
        'fileBlob': d.fileBlob,
        'accountingfirmTaxId': accountingfirmTaxId,
        'businessEntityTaxId': businessEntityTaxId,
        'evidenceType': declareProperties.evidenceType
      }
    })
    console.log('handleSendImageToIdentify()', sendToIdentifyData)
    const sentIdentifyResult = await sightTourActions.sendToIdentify(sendToIdentifyData)
    identifySent(dispatch, {
      'user': appState.auth.user.username,
      'result': sentIdentifyResult
    })
  }

  const handleGetIdentifyResult = async (event, data) => {
    const identifyResultReceivedList = []
    for (let i = 0; i < data.length; i++) {
      const fileObj = data[i]
      const identifyResult = await getIdentifyResult(fileObj)
      identifyResultReceivedList.push(identifyResult)
    }
    identifyResultReceived(dispatch, identifyResultReceivedList)
  }

  const handleSaveImage = (event, data) => {
    console.log('handleSaveImage event', event)
    console.log('handleSaveImage data', data)
  }
  const handleViewImage = (event, data) => {
    console.log('handleViewImage event', event)
    console.log('handleViewImage data', data)

  }
  const handleDeleteImage = (event, data) => {
    console.log('handleDeleteImage event', event)
    console.log('handleDeleteImage data', data)

  }

  const handleScanImage = () => {
    if (declareProperties.reportingPeriod !== '' && declareProperties.isDeclareBusinessTax !== '') {
      setScanDisable(true)
      setScanAlert(true)
      scan(appState.appData.scannerName, handleMoveImage, handleScannerError, handleCloseDisable)
    }
  }

  const handleCloseDisable = () => {
    setScanDisable(false)
  }

  const handleMoveImage = async (count, filePath) => {
    setScanCount(prevState => {
      return prevState + 1
    })
    await electronActions.scanImages(dispatch, filePath, appState.auth.user.username, declareProperties)
  }

  const handleResultAllConfirmed = async (filesByTicketId) => {
    try {
      const result = await identifyResultConfirmed(dispatch, filesByTicketId)
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  const handleGwUploaded = async (data) => {
    try {
      const result = await gwUploaded(dispatch, data)
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleDeleteEvidence = (eventName, ticketId) => {
    electronActions.deleteSigoutourData(dispatch, eventName, ticketId)
  }

  const renderClientSelect = () => {
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='client-taxId-select-label'>客戶</InputLabel>
          <Select
            labelId='client-taxId-select-label'
            id='client-taxId-select'
            name='clientTaxId'
            value={declareProperties.clientTaxId}
            onChange={handleSelectionChange}
            disabled={scanDisable}
          >
            <MenuItem key={0} value={''}>請選擇營利事業人</MenuItem>
            {appState.appData.clientLists.map(client => {
              return (<MenuItem key={client.taxId.id} value={client.taxId.id}>{client.name}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </>
    )
  }

  const renderEvidenceType = () => {
    const keyList = R.keys(SIGOUTOUR_EVIDENCE_TYPE)
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='evidence-type-select-label'>憑證種類</InputLabel>
          <Select
            labelId='evidence-type-select-label'
            id='evidence-type-select'
            name='evidenceType'
            value={declareProperties.evidenceType}
            onChange={handleSelectionChange}>
            <MenuItem key={0} value={''}>請選擇憑證種類</MenuItem>
            {keyList.map(key => {
              return <MenuItem key={key}
                               value={key}>{SIGOUTOUR_EVIDENCE_TYPE[key].name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </>
    )
  }


  const handleReset = () => {
    setDeclareProperties(prevState => {
      return {
        ...prevState,
        'reportingPeriod': ''
      }
    })
  }

  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClose = () => {
    setOpenDialog(false)
  }
  const handleOpen = () => {
    setScanCount(0)
    setOpenDialog(true)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <GwMenuTop />
      <main className={classes.content}>
        <DialogComponent declareProperties={declareProperties} handleSelectionChange={handleSelectionChange}
                         handleReset={handleReset} handleClose={handleClose} open={openDialog}
                         onScan={handleScanImage} />
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {renderClientSelect()}
          {renderEvidenceType()}
          <Collapse in={scanAlert}>
            <Alert
              severity='info'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setScanAlert(false)
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
            >
              此次掃描 {scanCount} 筆資料
            </Alert>
          </Collapse>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AppBar position='static'>
                  <Tabs value={value} onChange={handleTabChange} aria-label='simple tabs example'>
                    <Tab key={0} label='已掃描圖檔' {...a11yProps(0)} />
                    <Tab key={1} label='已辨識憑證' {...a11yProps(1)} />
                    <Tab key={2} label='待上傳雲端' {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <ScannedImageList data={appState.appData.fileLists['01']}
                                    username={appState.auth.user.username}
                                    declareProperties={declareProperties}
                                    onOpenDialog={handleOpen}
                                    onScanClick={handleScanImage}
                                    onSendToIdentifyClick={handleSendImageToIdentify}
                                    onSaveImageClick={handleSaveImage}
                                    onImageOriginalViewClick={handleViewImage}
                                    onDeleteImageClick={handleDeleteImage}
                                    scanDisable={scanDisable}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <IdentifiedEvidenceList data={appState.appData.fileLists}
                                          declareProperties={declareProperties}
                                          onGetIdentifyResult={handleGetIdentifyResult}
                                          onResultAllConfirmed={handleResultAllConfirmed}
                                          OnDeleteEvdience={handleDeleteEvidence}></IdentifiedEvidenceList>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ConfirmedEvidenceList data={appState.appData.fileLists}
                                         user={appState.auth.user}
                                         onGwUploaded={handleGwUploaded}
                                         declareProperties={declareProperties}
                                         OnDeleteEvdience={handleDeleteEvidence}></ConfirmedEvidenceList>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Main
