import React, {useEffect} from 'react'
import {electronActions, gwActions, sightTourActions, useAppDispatch, useAppState} from '../../Context'
import {Alert} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import {
    AppBar, Badge,
    Box,
    Collapse,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    IconButton,
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
    deleteData,
    gwUploaded,
    identifyResultConfirmed,
    identifyResultReceived,
    identifySent
} from '../../Actions/electionActions'
import {getIdentifyResult} from '../../Actions/sightourActions'
import {openScanner} from '../../Actions/scanAction'
import DialogComponent from '../../Dialog'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'

function TabPanel(props) {
    const {children, value, index, ...other} = props

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

const Main = () => {

    const dispatch = useAppDispatch()
    const appState = useAppState()
    const [value, setValue] = React.useState(0)
    const [declareProperties, setDeclareProperties] = React.useState({
        'clientTaxId': '',
        'reportingPeriod': '',
        'evidenceType': '',
        'isDeclareBusinessTax': 'true'
    })
    const classes = mainStyles()
    const [scanCount, setScanCount] = React.useState(0)
    const [scanDisable, setScanDisable] = React.useState(false)
    const [scanAlert, setScanAlert] = React.useState(false)

    useEffect(async () => {
        await gwActions.getAllClientList(dispatch, appState.auth.user.username, appState.auth.user.taxId, appState.auth.user.token)
        if (declareProperties.clientTaxId !== '') {
            await electronActions.getChooseBusinessEntityData(dispatch, declareProperties.clientTaxId)
        }
        const assign = await gwActions.getAssign()
        await electronActions.saveAssign(assign)
        await openScanner(dispatch)
    }, [value, declareProperties.clientTaxId])


    //region Main Events
    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSelectionChange = async (event) => {
        const {name, value} = event.target
        setDeclareProperties(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        console.log('handleSelectionChange', name, value)
        if (name === 'clientTaxId') {
            handleReset()
        }
    }

    const handleScannerError = (errorMsg) => {
        const isErrorMsgStartsWithError = errorMsg.startsWith('error:')
        setScanDisable(false)
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
        console.log(data)
        const accountingfirmTaxId = appState.auth.user.taxId
        const businessEntityTaxId = declareProperties.clientTaxId
        const sendToIdentifyData = data
            .map(d => {
                return {
                    'sourceFullPath': d.fullPath,
                    'sourceFileName': d.fileName,
                    'fileBlob': d.fileBlob,
                    'accountingfirmTaxId': accountingfirmTaxId,
                    'businessEntityTaxId': businessEntityTaxId,
                    'evidenceType': d.fileName.split('_')[0]
                }
            })
        console.log('handleSendImageToIdentify', sendToIdentifyData)
        const sentIdentifyResult = await sightTourActions.sendToIdentify(sendToIdentifyData)
        identifySent(dispatch, {
            'user': appState.auth.user.username,
            'result': sentIdentifyResult
        })
    }


    const handleGetIdentifyResult = async (event, data) => {
        const keyList = Object.keys(data)
        const identifyResultReceivedList = []
        for (let i = 0; i < keyList.length; i++) {
            const ticketId = keyList[i]
            const json = data[keyList[i]]
            const identifyResult = await getIdentifyResult({
                'reportingPeriod': json.reportingPeriod,
                'deductionType': json.deductionType,
                'gwEvidenceType': json.gwEvidenceType,
                'ticketId': ticketId
            })
            const domainObj = SigoutourMapper.toDomainObj(identifyResult)
            identifyResultReceivedList.push(domainObj)
        }
        identifyResultReceived(dispatch,declareProperties.clientTaxId, identifyResultReceivedList)
    }


    const handleSaveImage = (data) => {
        const url = window.URL.createObjectURL(data.fileBlob)
        const link = document.createElement('a')
        link.href = url
        const fileNameExt = data.fullPath.split(data.fileName.split('_')[1])[1]
        link.setAttribute('download', data.fileName + fileNameExt)
        document.body.appendChild(link)
        link.click()
    }

    const handleViewImage = (data) => {
        const windowProxy = window.open('', null, '')
        windowProxy.postMessage(JSON.stringify(data), '*')
    }

    const handleDeleteImage = (data) => {
        console.log('handleDelete', data)
        const id = data.fileName.split('_')[1]
        electronActions.deleteData(dispatch, data.businessEntityTaxId, '01', id)
    }

    const handleScanImage = () => {
        if (declareProperties.reportingPeriod !== '' && declareProperties.isDeclareBusinessTax !== '') {
            setScanDisable(true)
            setScanAlert(true)
            //fixme
            handleMoveImage(1, 'C:\\Users\\Tony\\.gwapp\\05\\123.jpg')
            // scan(appState.appData.scannerName, handleMoveImage, handleScannerError, handleCloseDisable)
        }
    }

    const handleCloseDisable = () => {
        setScanDisable(false)
    }

    const handleMoveImage = async (count, filePath) => {
        setScanCount(prevState => {
            return prevState + 1
        })
        await electronActions.scanImages(dispatch, filePath, appState.auth.user, declareProperties)
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
            <CssBaseline/>
            <GwMenuTop/>
            <main className={classes.content}>
                <DialogComponent declareProperties={declareProperties}
                                 handleSelectionChange={handleSelectionChange}
                                 handleReset={handleReset}
                                 handleClose={handleClose}
                                 open={openDialog}
                                 onScan={handleScanImage}/>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth='lg' className={classes.container}>
                    {renderClientSelect()}
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
                                    <CloseIcon fontSize='inherit'/>
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
                                        <Tab label={<Badge
                                            badgeContent={appState.appData.fileLists['02'] === undefined ? 0 : Object.keys(appState.appData.fileLists['02']).length}
                                            color='secondary' {...a11yProps(1)}>
                                            已辨識憑證
                                        </Badge>}/>
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
                                                            OnDeleteEvdience={handleDeleteEvidence}/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <ConfirmedEvidenceList data={appState.appData.fileLists}
                                                           user={appState.auth.user}
                                                           onGwUploaded={handleGwUploaded}
                                                           declareProperties={declareProperties}
                                                           OnDeleteEvdience={handleDeleteEvidence}/>
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
