import React, { useEffect, useReducer, useState } from 'react'
import { gwActions, sightTourActions, electronActions, useAppDispatch, useAppState } from '../../Context'
import isElectron from 'is-electron'
import {
  Box,
  AppBar,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Paper, Select,
  Tab,
  Tabs,
  Typography, FormControl
} from '@material-ui/core'
import GwMenuTop from './GwMenuTop'
import mainStyles from './mainStyles'
import ScannedImageList from '../../Components/ScannedImageList'
import ConfirmedEvidenceList from '../../Components/ConfirmedEvidenceList'
import IdentifiedEvidenceList from '../../Components/IdenfiedEvidenceList'
import {
  getImageFile,
  gwUploaded,
  identifyResultConfirmed,
  identifyResultReceived,
  identifySent, scanImages
} from '../../Actions/electionActions'
import { getIdentifyResult } from '../../Actions/sightourActions'
import { DEDUCTION_TYPE } from '../../Enum/gateweb_type'
import { SIGOUTOUR_EVIDENCE_TYPE } from '../../Mapper/sigoutour_mapper'
import { openScanner, scan } from '../../Actions/scanAction'
import actionTypes from '../../Actions/actionTypes'
import Button from '@material-ui/core/Button'
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
    'deductionType': '',
    'evidenceType': ''
  })
  const [disableSelection, setDisableSelection] = React.useState(true)
  const classes = mainStyles()

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
      setDisableSelection(false)
    }
  }
  //endregion
  const handleScannerError = (errorMsg) => {
    const isErrorMsgStartsWithError = errorMsg.startsWith('error:')
    if (isErrorMsgStartsWithError && errorMsg === 'error:feeding error') {
      alert('無法掃描，請放入紙張')
      return
    }
    if (isErrorMsgStartsWithError) {
      alert('無法與掃描機連線，請重新整理')
      return
    }

    // const msg=errorMsg.split('')
  }


  //region scanned image list events
  const handleSendImageToIdentify = async (event, data) => {
    setDisableSelection(true)
    //todo
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
    scan(appState.appData.scannerName, handleMoveImage, handleScannerError)
  }

  const handleMoveImage = (filePath) => {
    electronActions.scanImages(dispatch, filePath, appState.auth.user.username, declareProperties.clientTaxId)
  }

  //endregion

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

  const renderDeductionType = () => {
    console.log('renderDeductionType')
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='deduction-type-select-label'>扣抵代號</InputLabel>
          <Select
            labelId='deduction-type-select-label'
            id='deduction-type-select'
            name='deductionType'
            value={declareProperties.deductionType}
            onChange={handleSelectionChange}
            disabled={disableSelection}>
            <MenuItem key={0} value={''}>請選擇扣抵代號</MenuItem>
            {DEDUCTION_TYPE.map(obj => {
              return <MenuItem key={obj.value} value={obj.value}>{obj.key}</MenuItem>
            })}
          </Select>
        </FormControl>
      </>
    )
  }

  const renderClientSelect = () => {
    console.log('renderClientSelect appState', appState)
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='client-taxId-select-label'>客戶</InputLabel>
          <Select
            labelId='client-taxId-select-label'
            id='client-taxId-select'
            name='clientTaxId'
            value={declareProperties.clientTaxId}
            onChange={handleSelectionChange}>
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
            onChange={handleSelectionChange}
            disabled={disableSelection}>
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


  return (
    <div className={classes.root}>
      <CssBaseline />
      <GwMenuTop />
      <main className={classes.content}>
        <DialogComponent/>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {renderClientSelect()}
          {renderDeductionType()}
          {renderEvidenceType()}
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
                                    onScanClick={handleScanImage}
                                    onSendToIdentifyClick={handleSendImageToIdentify}
                                    onSaveImageClick={handleSaveImage}
                                    onImageOriginalViewClick={handleViewImage}
                                    onDeleteImageClick={handleDeleteImage}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <IdentifiedEvidenceList data={appState.appData.fileLists}
                                          clientTaxId={declareProperties.clientTaxId}
                                          onGetIdentifyResult={handleGetIdentifyResult}
                                          onResultAllConfirmed={handleResultAllConfirmed}></IdentifiedEvidenceList>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ConfirmedEvidenceList data={appState.appData.fileLists}

                                         user={appState.auth.user}
                                         onGwUploaded={handleGwUploaded}
                                         declareProperties={declareProperties}></ConfirmedEvidenceList>
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
