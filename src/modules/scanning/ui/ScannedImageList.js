import React, { useEffect, useState } from 'react'
import {
  Box, Button, Checkbox, FormControl, IconButton,
  ImageList, ImageListItem, ImageListItemBar, Input, Stack, Typography
} from '@mui/material'
import {
  Delete, InsertPhoto, Save, Send, ZoomIn
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import isElectron from 'is-electron'
import PropTypes from 'prop-types'

const electron = isElectron() ? window.electron : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
// const remote = isElectron() ? window.remote : null

const getRowData = async (jsonData, businessEntityTaxId) => {
  const rowData = []
  const keys = Object.keys(jsonData)
  for (let idx = 0; idx < keys.length; idx += 1) {
    const item = jsonData[keys[idx]]
    // console.log(item);
    const imageFileBlob = await getImageFileBlob(item.fullPath.result)
    const fileName = `${item.gwEvidenceType.result}_${keys[idx]}`
    const rowItem = {
      id: idx + 1,
      businessEntityTaxId,
      fileName,
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

const isTaxIdSelected = (taxIdSelected) => !!taxIdSelected
const isScanEnabled = (params) => {
  return !isTaxIdSelected(params.taxId) || params.disabled
}

const isImportEnabled = (params) => {
  return !isTaxIdSelected(params.taxId) || params.disabled
}

function ScannedImageList(props) {
  const {
    data, declareProperties,
    onImageOriginalViewClick, onSaveImageClick, onDeleteImageClick
  } = props
  const [dataRows, setDataRows] = useState([])
  const [selectionDataRows, setSelectionDataRow] = useState({ selection: [] })

  useEffect(() => {
    const initDataRows = async (data, businessEntityTaxId) => {
      let rowData = (data) ? await getRowData(data, businessEntityTaxId) : []
      rowData = rowData.sort((a, b) => {
        const fileName1 = a.fileName.split('_')[1].split('.')[0]
        const fileName2 = b.fileName.split('_')[1].split('.')[0]
        if (fileName1 >= fileName2) {
          return 0
        }
        return 1
      }).reverse()
      setDataRows(rowData)
    }
    initDataRows(data, declareProperties.clientTaxId)
  }, [data, declareProperties])

  // TODO
  const handleChange = (event) => {
    const { value } = event.target
    const selectData = dataRows.filter((obj) => obj.fullPath === value)[0]
    const isExist = selectionDataRows.selection.filter((obj) => selectData.fullPath === obj.fullPath).length > 0
    if (!isExist) {
      setSelectionDataRow((prevState) => ({
        selection: [...prevState.selection, selectData]
      }))
    } else {
      setSelectionDataRow((prevState) => ({
        selection: prevState.selection.filter((obj) => selectData.fullPath !== obj.fullPath)
      }))
    }
  }

  const uploadFileHandler = (event) => {
    props.onOpenDialog(false)
  }

  return (
    <>
      <Stack direction='row' spacing={2} mb={2}>
        <Button
          variant='contained'
          onClick={uploadFileHandler}
          startIcon={<InsertPhoto />}
          component='label'
          disabled={isScanEnabled({ taxId: props.declareProperties.clientTaxId, disabled: props.importDisable })}
        >
          匯入圖檔
        </Button>
        <Button
          variant='contained'
          startIcon={<InsertPhoto />}
          disableElevation='true'
          onClick={props.onOpenDialog}
          disabled={isImportEnabled({ taxId: props.declareProperties.clientTaxId, diasbled: props.scanDisable })}
        >
          掃描文件
        </Button>
        <Button
          variant='contained'
          startIcon={<Send />}
          disableElevation='true'
          onClick={(e) => {
            props.onSendToIdentifyClick(e, selectionDataRows.selection)
            setSelectionDataRow({ selection: [] })
          }}
        >
          送出辨識
        </Button>
      </Stack>
      <ImageList cols={3} gap={12}>
        {dataRows.map((item) => (
          <ImageListItem key={item.fileName} sx={{ borderRadius: '8px', border: '1px solid #ccc', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl>
                <Checkbox
                  id={item.id}
                  name={item.id}
                  value={item.fullPath}
                  onChange={handleChange}
                  checked={selectionDataRows.selection.filter((obj) => item.fullPath === obj.fullPath).length > 0}
                />
              </FormControl>
              <Typography>{item.fileName}</Typography>
            </Box>
            <Box sx={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={item.imageUrl}
                alt={item.fileName}
                loading='lazy'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <ImageListItemBar
              actionIcon={(
                <div>
                  <IconButton
                    aria-label={`info about ${item.fileName}`}
                    onClick={(e) => onImageOriginalViewClick(item)}
                  >
                    <ZoomIn sx={{ color: blue[200] }} />
                  </IconButton>
                  <IconButton
                    aria-label={`info about ${item.fileName}`}
                    onClick={(e) => onSaveImageClick(item)}
                  >
                    <Save sx={{ color: blue[200] }} />
                  </IconButton>
                  <IconButton
                    aria-label={`info about ${item.fileName}`}
                    onClick={(e) => onDeleteImageClick(item)}
                  >
                    <Delete sx={{ color: blue[200] }} />
                  </IconButton>
                </div>
              )}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}

ScannedImageList.propTypes = {
  onScanClick: PropTypes.func,
  onSendToIdentifyClick: PropTypes.func,
  onDeleteImageClick: PropTypes.func,
  onSaveImageClick: PropTypes.func,
  onImageOriginalViewClick: PropTypes.func,
  onImportImageClick: PropTypes.func,
  username: PropTypes.string,
  data: PropTypes.array,
  clientTaxId: PropTypes.string,
  declareProperties: PropTypes.any,
  onOpenDialog: PropTypes.func,
  scanDisable: PropTypes.any,
  importDisable: PropTypes.any
}

export default ScannedImageList