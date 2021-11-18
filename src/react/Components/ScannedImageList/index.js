import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import isElectron from 'is-electron'
import PropTypes from 'prop-types'
import scannedImageListStyles from './scannedImageListStyles'
import { Checkbox, FormControlLabel, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'
import { Delete as DeleteIcon, Save as SaveIcon, ZoomIn as ZoomInIcon } from '@material-ui/icons'


const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const getRowData = async (jsonData) => {
  let rowData = []
  const keys = Object.keys(jsonData)
  for (let idx = 0; idx < keys.length; idx++) {
    let item = jsonData[keys[idx]]
    const imageFileBlob = await getImageFileBlob(item.fullPath.result)
    const fileName = item.gwEvidenceType.result + '_' + keys[idx]
    const rowItem = {
      id: idx + 1,
      fileName: fileName,
      fileBlob: imageFileBlob,
      imageUrl: URL.createObjectURL(imageFileBlob),
      fullPath: item.fullPath.result
    }
    rowData.push(rowItem)
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

const ScannedImageList = (props) => {

  console.log('ScannedImageList props', props)

  const [dataRows, setDataRows] = useState([])
  const [selectionDataRows, setSelectionDataRow] = useState({ selection: [] })
  useEffect(() => {
    const initDataRows = async (data) => {
      let rowData = (props.data) ? await getRowData(data) : []
      console.log('initDataRows', rowData)
      rowData = rowData.sort((a, b) => {
        const fileName1 = a.fileName.split('_')[1].split('.')[0]
        const fileName2 = b.fileName.split('_')[1].split('.')[0]
        if (fileName1 >= fileName2) {
          return 0
        } else {
          return 1
        }
      }).reverse()
      console.log("AA",rowData)
      setDataRows(rowData)
    }
    initDataRows(props.data)
  }, [props.data, props.declareProperties])

  const classes = scannedImageListStyles()

  //TODO
  const handleChange = (event) => {
    const { name, value } = event.target
    const selectData = dataRows.filter(obj => {
      return obj.fullPath === value
    })[0]
    const isExist = selectionDataRows.selection.filter(obj => {
      return selectData.fullPath === obj.fullPath
    }).length > 0
    if (!isExist) {
      setSelectionDataRow(prevState => ({
        selection: [...prevState.selection, selectData]
      }))
    } else {
      setSelectionDataRow(prevState => ({
        selection: prevState.selection.filter(obj => {
          return selectData.fullPath !== obj.fullPath
        })
      }))
    }
  }

  return (
    <div style={{ height: 650, width: '100%' }}>
      <Button variant='contained' onClick={props.onOpenDialog}
              disabled={!isScanEnable(props.declareProperties.clientTaxId) || props.scanDisable}>掃描文件</Button>
      <Button variant='contained' onClick={(e) => {
        props.onSendToIdentifyClick(e, selectionDataRows.selection)
        setSelectionDataRow({ selection: [] })
      }}>送出辨識</Button>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          {dataRows.map((item) => (
            <ImageListItem key={item.id}>
              <img src={item.imageUrl} alt={item.fileName} loading='lazy' />
              <ImageListItemBar
                position='top'
                actionPosition='left'
                actionIcon={
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={item.id}
                          name={item.id}
                          value={item.fullPath}
                          onChange={handleChange}
                          checked={selectionDataRows.selection.filter(obj => {
                            return item.fullPath === obj.fullPath
                          }).length > 0}
                        />
                      }
                    />

                  </div>
                }
              />
              <ImageListItemBar
                title={item.fileName}
                actionIcon={
                  <div>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onImageOriginalViewClick(item)}>
                      <ZoomInIcon />
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onSaveImageClick(item)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton aria-label={`info about ${item.fileName}`} className={classes.icon}
                                onClick={e => props.onDeleteImageClick(item)}>
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
