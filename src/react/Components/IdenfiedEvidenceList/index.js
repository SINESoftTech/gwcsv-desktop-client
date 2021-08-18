import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import * as mockData from '../../Pages/Main/mockDisplayData'
import isElectron from 'is-electron'
import { getIdentifyResult } from '../../Actions/sightourActions'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const IdentifiedEvidenceList = (props) => {
  console.log('IdentifiedEvidenceList', props.data)
  const [rowData, setRowData] = useState()
  const [localFiles, setLocalFiles] = useState(props.data)
  const [imageUrl, setImageUrl] = useState('')

  const handleResultAllConfirmed = () => {
    console.log('localfiles 03', localFiles['03'])
    var filesByTicketId = byTicketId(localFiles['03'])
    let imageFileExtension = ['jpg', 'png', 'git']
    Object.keys(filesByTicketId).forEach(async ticketId => {
      if (ipcRenderer) {
        let imageObj = filesByTicketId[ticketId].filter((fileObj) => {
          return imageFileExtension.indexOf(fileObj.filename.split('.')[1]) > -1
        })[0]

        let sighttourObj = filesByTicketId[ticketId].filter(fileObj => {
          return R.includes('sightour', fileObj.filename)
        })[0]

        console.log('imageObj', imageObj)
        console.log('sightourObj', sighttourObj)
        var updatedFiles = await ipcRenderer.invoke('evidence:evidenceSaved', JSON.stringify(imageObj), JSON.stringify(sighttourObj), null)
        setLocalFiles(updatedFiles)
      }
    })
  }

  const handleReadImage = async () => {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      const image = await ipcRenderer.invoke('evidence:getImageFileContent', result['01'][0]['fullPath'])
      const blob = new Blob([image])
      setImageUrl(URL.createObjectURL(blob))
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <Button variant='contained' onClick={handleReadImage}>載入圖檔</Button>
      <EvidenceList data={mockData.rows}></EvidenceList>
    </div>
  )
}

export default IdentifiedEvidenceList