import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import isElectron from "is-electron";
import PropTypes from "prop-types";
import scannedImageListStyles from "./scannedImageListStyles";
import {CardMedia, Dialog, IconButton, ImageList, ImageListItem, ImageListItemBar, Modal} from "@material-ui/core";
import {Delete as DeleteIcon, Save as SaveIcon, ZoomIn as ZoomInIcon} from '@material-ui/icons';

const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
var fs = isElectron() ? remote.require('fs') : null;

const sendToIdentify = async (fileObj) => {
  // const result = await ipcRenderer.invoke('evidence:getImageFileContent')
  return {
    result: 'true',
    ticket: {
      id: '8c869dbd-1bb5-4fe2-ac60-9b4215edffb8'
    }
  }
}

const getRowData = async (fileNames, username, clientTaxId) => {
  let rowData = []
  for (let idx = 0; idx < fileNames.length; idx++) {
    let item = fileNames[idx]
    console.log('getRowData item', item)
    console.log('getRowData clientTaxId', clientTaxId)
    console.log('getRowData if', item.filename.indexOf(clientTaxId))
    if(clientTaxId && item.filename.indexOf(username)>-1 && item.filename.indexOf(clientTaxId) > -1) {
      let imageUrl = await getImageFileUrl(item.fullPath)
      let rowItem = {id: idx + 1, fileName: item.filename.split('_')[2], imageUrl: imageUrl, fullPath: item.fullPath}
      rowData.push(rowItem)
    }
  }
  return rowData
}

const getImageFileUrl = async (fullPath) => {
  if (ipcRenderer) {
    const image = await ipcRenderer.invoke('evidence:getImageFileContent', fullPath)
    const blob = new Blob([image]);
    return URL.createObjectURL(blob)
  }
  return ''
}

const ScannedImageList = (props) => {
  const [dataRows, setDataRows] = useState([])
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [viewLargeImage, setViewLargeImage] = useState(false)
  useEffect(async () => {
    let rowData = (props.data) ? await getRowData(props.data, props.username, props.clientTaxId) : []
    setDataRows(rowData)
  }, [props.data, props.clientTaxId])
  const classes = scannedImageListStyles();
  // const handleSendToIdentify = () => {
  //   props.data.forEach(async (fileObj) => {
  //     var ticket = await sendToIdentify(fileObj)
  //
  //     if (ipcRenderer) {
  //       console.log('ticket', ticket)
  //       var updatedFiles = await ipcRenderer.invoke('evidence:identifySent', JSON.stringify(props.user), JSON.stringify(props.client), JSON.stringify(ticket.ticket), JSON.stringify(fileObj))
  //       console.log('updatedFiles', updatedFiles)
  //       setRowData(updatedFiles)
  //     }
  //   })
  //
  // };

  // const handleScan = async () => {
  //   if (ipcRenderer) {
  //     const result = await ipcRenderer.invoke('evidence:scan')
  //     setRowData(result)
  //   }
  // };
  const handleViewOriginalImage = (selectedImageUrl) => {
    // console.log('handleViewOriginalImage event', event)
    // console.log('handleViewOriginalImage target', target)
    // TODO Open Image view modal, too hard
  }

  console.log('dataRows', dataRows)
  return (
    <div style={{height: 650, width: '100%'}}>
      <Button variant="contained" onClick={props.onScanClick}>掃描文件</Button>
      <Button variant="contained" onClick={props.onSendToIdentifyClick}>送出辨識</Button>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          {dataRows.map((item) => (
            <ImageListItem key={item.id}>
              <img src={item.imageUrl} alt={item.fileName}/>
              <ImageListItemBar
                title={item.fileName}
                actionIcon={
                  <div>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => handleViewOriginalImage(item.fullPath)}>
                      <ZoomInIcon/>
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={props.onSaveImageClick}>
                      <SaveIcon/>
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={props.onDeleteImageClick}>
                      <DeleteIcon/>
                    </IconButton>
                  </div>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

ScannedImageList.propTypes = {
  onScanClick: PropTypes.func,
  onSendToIdentifyClick: PropTypes.func,
  onDeleteImageClick: PropTypes.func,
  onSaveImageClick: PropTypes.func,
  onImageOriginalViewClick: PropTypes.func,
  username: PropTypes.string,
  data: PropTypes.array,
  clientTaxId: PropTypes.string
};

export default ScannedImageList;