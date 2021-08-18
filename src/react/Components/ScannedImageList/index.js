import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import isElectron from 'is-electron'
import PropTypes from 'prop-types'
import scannedImageListStyles from './scannedImageListStyles'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'
import { Delete as DeleteIcon, Save as SaveIcon, ZoomIn as ZoomInIcon } from '@material-ui/icons'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
var fs = isElectron() ? remote.require('fs') : null

const getRowData = async (fileObjects, username, clientTaxId) => {
  let rowData = []
  for (let idx = 0; idx < fileObjects.length; idx++) {
    let item = fileObjects[idx]
    if (clientTaxId && item.filename.indexOf(username) > -1 && item.filename.indexOf(clientTaxId) > -1) {
      let imageFileBlob = await getImageFileBlob(item.fullPath)
      let rowItem = {
        id: idx + 1,
        fileName: item.filename.split('_')[2],
        fileBlob: imageFileBlob,
        imageUrl: URL.createObjectURL(imageFileBlob),
        fullPath: item.fullPath
      }
      rowData.push(rowItem)
      //FIXME
    }
  }
  return rowData
}

const getImageFileBlob = async (fullPath) => {
  if (ipcRenderer) {
    const image = await ipcRenderer.invoke('evidence:getImageFileContent', fullPath)
    return new Blob([image])
  }
  return ''
}

const isScanEnable = (taxIdSelected) => {
  return !!taxIdSelected
}
const isSendToIdentifyEnable = (data) => {
  return data.length > 0
}

const ScannedImageList = (props) => {

  const [dataRows, setDataRows] = useState([])

  console.log(props.clientTaxId)

  useEffect(() => {
    const initDataRows = async (data, username, clientTaxId) => {
      console.log('in useEffect clientTaxId', clientTaxId)
      const rowData = (props.data) ? await getRowData(data, username, clientTaxId) : []
      console.log('in useEffect', rowData)
      setDataRows(rowData)
    }
    initDataRows(props.data, props.username, props.clientTaxId)
  }, [props.data, props.clientTaxId])

  const classes = scannedImageListStyles()


  const handleViewOriginalImage = (selectedImageUrl) => {
    // console.log('handleViewOriginalImage event', event)
    // console.log('handleViewOriginalImage target', target)
    // TODO Open Image view modal, too hard
  }

  return (
    <div style={{ height: 650, width: '100%' }}>
      <Button variant='contained' onClick={props.onScanClick} disabled={!isScanEnable(props.clientTaxId)}>掃描文件</Button>
      <Button variant='contained' onClick={(e) => {
        props.onSendToIdentifyClick(e, dataRows)
      }} disabled={!isSendToIdentifyEnable(dataRows)}>送出辨識</Button>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          {dataRows.map((item) => (
            <ImageListItem key={item.id}>
              <img src={item.imageUrl} alt={item.fileName} />
              <ImageListItemBar
                title={item.fileName}
                actionIcon={
                  <div>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onImageOriginalViewClick(e, item)}>
                      <ZoomInIcon />
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onSaveImageClick(e, item)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onDeleteImageClick(e.item)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  )
}

ScannedImageList.propTypes = {
  onScanClick: PropTypes.func,
  onSendToIdentifyClick: PropTypes.func,
  onDeleteImageClick: PropTypes.func,
  onSaveImageClick: PropTypes.func,
  onImageOriginalViewClick: PropTypes.func,
  username: PropTypes.string,
  data: PropTypes.array,
  clientTaxId: PropTypes.string
}

export default ScannedImageList
