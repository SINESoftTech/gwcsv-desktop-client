import React, { useEffect } from 'react';
import {
  Alert, Badge, Box, Container, Collapse, CssBaseline, FormControl,
  IconButton, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography,
} from '@mui/material';
import {
  AdfScanner, Close, CloudUpload, Compare,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import ScannedImageList from '../modules/scanning/ui/ScannedImageList';
import ConfirmedEvidenceListTable from '../modules/confirming/ui/ConfirmedEvidenceListTable';
import IdentifiedEvidenceListTable from '../modules/identifying/ui/IdentifiedEvidenceListTable';
import {
  gwUploaded, identifyResultConfirmed, identifyResultReceived, identifySent, importImage,
} from '../react/Actions/electionActions';
import { getIdentifyResult } from '../react/Actions/sightourActions';
import { openScanner } from '../react/Actions/scanAction';
import DialogComponent from '../core/ui/Dialog';
import SigoutourMapper from '../react/Mapper/sigoutour_mapper';
import { getFileExt } from '../react/Util/FileUtils';
import {
  electronActions, gwActions, sightTourActions, useAppDispatch, useAppState,
} from '../react/Context';
import DesktopNavbar from '../core/layout/DesktopNavbar';
import { toPeriodList } from '../react/Util/Time';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.any,
};

function HomePage() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const [value, setValue] = React.useState(0);
  // TODO move this to context
  const [declareProperties, setDeclareProperties] = React.useState({
    clientTaxId: '',
    reportingPeriod: '',
    evidenceType: '',
    isDeclareBusinessTax: 'true',
  });
  const [scanCount, setScanCount] = React.useState(0);
  const [scanDisable, setScanDisable] = React.useState(false);
  const [scanAlert, setScanAlert] = React.useState(false);
  const [assignMap, setAssignMap] = React.useState();
  const [importDisable, setImportDisable] = React.useState(false);

  useEffect(() => {
    const pageInit = async ()=> {
      await gwActions.getAllClientList(dispatch, appState.auth.user.username, appState.auth.user.taxId, appState.auth.user.token);
      if (declareProperties.clientTaxId !== '') {
        await electronActions.getBusinessEntityListLocal(dispatch, declareProperties.clientTaxId);
      }
      const assign = await electronActions.getAssign();
      setAssignMap(assign);
      // openScanner(dispatch);
    }
    pageInit().catch(console.error)
  }, [value, declareProperties.clientTaxId]);

  // region Main Events
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectionChange = async (event) => {
    const { name, value } = event.target;
    setDeclareProperties((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('handleSelectionChange', name, value);
    if (name === 'clientTaxId') {
      handleReset();
    }
  };

  const handleScannerError = (errorMsg) => {
    const isErrorMsgStartsWithError = errorMsg.startsWith('error:');
    setScanDisable(false);
    if (isErrorMsgStartsWithError && errorMsg === 'error:feeding error') {
      alert('無法掃描，請放入紙張');
      return;
    }
    if (isErrorMsgStartsWithError) {
      alert('無法與掃描機連線，請重新整理');
    }
  };

  // region scanned image list events
  const handleSendImageToIdentify = async (event, data) => {
    console.log('handleSendImageToIdentify', data);
    const accountingfirmTaxId = appState.auth.user.taxId;
    const businessEntityTaxId = declareProperties.clientTaxId;
    const sendToIdentifyData = data
      .map((d) => {
        const fileExt = getFileExt(d.fullPath);
        return {
          sourceFullPath: d.fullPath,
          sourceFileName: `${d.fileName}.${fileExt}`,
          fileBlob: d.fileBlob,
          accountingfirmTaxId,
          businessEntityTaxId,
          evidenceType: d.fileName.split('_')[0],
        };
      });
    console.log('handleSendImageToIdentify', sendToIdentifyData);
    const sentIdentifyResult = await sightTourActions.sendToIdentify(sendToIdentifyData);
    if (sentIdentifyResult.length > 0) {
      identifySent(dispatch, {
        user: appState.auth.user.username,
        result: sentIdentifyResult,
      });
    }
  };

  const handleGetIdentifyResult = async (event, data) => {
    console.log('handleGetIdentifyResult', data);
    const keyList = Object.keys(data);
    const identifyResultReceivedList = [];
    for (let i = 0; i < keyList.length; i++) {
      const ticketId = keyList[i];
      const json = data[keyList[i]];
      const identifyResult = await getIdentifyResult({
        fullPath: json.fullPath.result,
        reportingPeriod: json.reportingPeriod.result,
        deductionType: json.deductionType.result,
        isDeclareBusinessTax: json.isDeclareBusinessTax.result,
        gwEvidenceType: json.gwEvidenceType.result,
        ticketId,
      });
      console.log('handleGetIdentifyResult identifyResult', identifyResult);
      if (identifyResult.status !== 'process') {
        const domainObj = SigoutourMapper.toDomainObj(identifyResult);
        // console.log("handleGetIdentifyResult domainObj",domainObj)
        identifyResultReceivedList.push(domainObj);
      }
    }
    identifyResultReceived(dispatch, declareProperties.clientTaxId, identifyResultReceivedList);
  };

  const handleSaveImage = (data) => {
    const url = window.URL.createObjectURL(data.fileBlob);
    const link = document.createElement('a');
    link.href = url;
    const fileNameExt = data.fullPath.split(data.fileName.split('_')[1])[1];
    link.setAttribute('download', data.fileName + fileNameExt);
    document.body.appendChild(link);
    link.click();
  };

  const handleViewImage = (data) => {
    const windowProxy = window.open('', null, '');
    windowProxy.postMessage(JSON.stringify(data), '*');
  };

  const handleDeleteImage = (data) => {
    const id = data.fileName.split('_')[1];
    handleDeleteEvidence(data.businessEntityTaxId, '01', id);
  };

  const handleDeleteEvidence = (businessEntityTaxId, step, ticketId) => {
    electronActions.deleteData(dispatch, businessEntityTaxId, step, ticketId);
  };

  const handleImageImport = () => {
    console.log('handleImageImport')
    electronActions.importImage(dispatch);
  }

  const handleScanImage = () => {
    if (declareProperties.reportingPeriod !== '' && declareProperties.isDeclareBusinessTax !== '') {
      openScanner(dispatch)
      setScanDisable(true);
      setScanAlert(true);
      setImportDisable(true);
      // fixme rm
      // handleMoveImage(1, C:\Users\amyyu\string123_24549210_1645062357828.jpg')
      // scan(appState.appData.scannerName, handleMoveImage, handleScannerError, handleCloseDisable);
    }
  };

  const handleCloseDisable = () => {
    setScanDisable(false);
  };

  const handleMoveImage = async (count, filePath) => {
    setScanCount((prevState) => prevState + 1);
    await electronActions.scanImages(dispatch, filePath, appState.auth.user, declareProperties);
  };

  const handleResultAllConfirmed = async (businessEntityTaxId, filesByTicketId) => {
    try {
      const result = await identifyResultConfirmed(dispatch, businessEntityTaxId, filesByTicketId);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleGwUploaded = async (businessEntityTaxId, data) => {
    try {
      const result = await gwUploaded(dispatch, businessEntityTaxId, data);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const renderClientSelect = () => (
    <Stack spacing={2} direction="row" my={3}>
      <FormControl sx={{ width: '25%' }}>
        <TextField
          id="client-taxId-select"
          name="clientTaxId"
          select
          value={declareProperties.clientTaxId}
          onChange={handleSelectionChange}
          disabled={scanDisable}
          defaultValue={declareProperties.clientTaxId}
          label="請選擇營利事業人"
        >
          <MenuItem key={0} value="">請選擇營利事業人</MenuItem>
          {appState.appData.clientLists.map((client) => (
            <MenuItem key={client.taxId.id} value={client.taxId.id}>{client.name}</MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl sx={{ width: '25%' }}>
        <TextField
          id="reporting-period-select"
          name="reportingPeriod"
          select
          label="申報期別"
          value={declareProperties.reportingPeriod}
          onChange={handleSelectionChange}
        >
          <MenuItem key={0} value="">請選擇申報期別</MenuItem>
          {toPeriodList().filter((period) => period % 2 === 0).map((period) => (
            <MenuItem key={period} value={period}>{period}</MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Stack>
  );

  const handleReset = () => {
    setDeclareProperties((prevState) => ({
      ...prevState,
      reportingPeriod: '',
    }));
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpen = () => {
    setScanCount(0);
    setOpenDialog(true);
  };

  return (
    <>
      <CssBaseline />
      <DesktopNavbar />
      <Container maxWidth="false">
        <DialogComponent
          declareProperties={declareProperties}
          handleSelectionChange={handleSelectionChange}
          handleReset={handleReset}
          handleClose={handleClose}
          open={openDialog}
          onScan={handleScanImage}
        />
        <Collapse in={scanAlert}>
          <Alert
            severity="info"
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setScanAlert(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            )}
          >
            此次掃描
            {' '}
            {scanCount}
            {' '}
            筆資料
          </Alert>
        </Collapse>
        <Box>{renderClientSelect()}</Box>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab icon={<AdfScanner />} iconPosition="start" label="掃描" key={0} {...a11yProps(0)} />
          <Tab
            icon={<Compare />}
            iconPosition="start"
            label={(
              <Badge
                badgeContent={appState.appData.fileLists['02'] === undefined ? 0 : Object.keys(appState.appData.fileLists['02']).length}
                color="secondary"
                {...a11yProps(1)}
              >
                辨識
              </Badge>
            )}
          />
          <Tab icon={<CloudUpload />} iconPosition="start" label="上傳" key={2} {...a11yProps(2)} />
        </Tabs>
        <Paper>
          <TabPanel value={value} index={0}>
            <ScannedImageList
              data={appState.appData.fileLists['01']}
              username={appState.auth.user.username}
              declareProperties={declareProperties}
              onOpenDialog={handleOpen}
              onScanClick={handleScanImage}
              onSendToIdentifyClick={handleSendImageToIdentify}
              onSaveImageClick={handleSaveImage}
              onImageOriginalViewClick={handleViewImage}
              onDeleteImageClick={handleDeleteImage}
              scanDisable={scanDisable}
              importDisable={importDisable}
              onImportImageClick={handleImageImport}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <IdentifiedEvidenceListTable
              data={appState.appData.fileLists}
              declareProperties={declareProperties}
              onViewImage={handleViewImage}
              onGetIdentifyResult={handleGetIdentifyResult}
              onResultAllConfirmed={handleResultAllConfirmed}
              OnDeleteEvidence={handleDeleteEvidence}
              assignMap={assignMap}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ConfirmedEvidenceListTable
              data={appState.appData.fileLists}
              user={appState.auth.user}
              onGwUploaded={handleGwUploaded}
              declareProperties={declareProperties}
              OnDeleteEvidence={handleDeleteEvidence}
            />
          </TabPanel>
        </Paper>
      </Container>
    </>
  );
}

export default HomePage;
