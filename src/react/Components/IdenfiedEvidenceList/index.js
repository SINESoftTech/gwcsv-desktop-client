import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import * as mockData from '../../Pages/Main/mockDisplayData'
import isElectron from 'is-electron'
import { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, TAX_TYPE } from '../../Enum/sigoutour_type'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const parseData = (jsonData) => {
  let json = {}
  const jsonDataBody = jsonData['pageList'][0]['photoList'][0]['result']
  json['evidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[jsonData['pageList'][0]['photoList'][0]['type']].name
  jsonDataBody.forEach(data => {
    const key = SIGOUTOUR_FIELD_TYPE[data['key']]
    json[key] = data['text']
  })
  json['taxType'] = TAX_TYPE[json.taxType]
  return json
}

const getJsonRawData = async (data, clientTaxId) => {
  try {
    const filterJsonDataFilePathList = data.filter(d => {
      return d.filename.endsWith('.json')
    }).filter(d => {
      const fileNameClientId = d.filename.split('_')[1]
      return fileNameClientId === clientTaxId
    }).map(d => {
      return d.fullPath
    })
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:getJsonFileData', filterJsonDataFilePathList)
    }
  } catch (error) {
    //todo handler
  }
}

const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  const [localFiles, setLocalFiles] = useState(props.data)

  useEffect(() => {
    const initDataRows = async (data, clientTaxId) => {
      const jsonDataList = (props.data) ? await getJsonRawData(data, clientTaxId) : []
      const parseJsonDataList = jsonDataList.map((json, idx) => {
        const parseResult = parseData(json.data)
        parseResult['id'] = idx + 1
        return parseResult
      })
      setRowData(parseJsonDataList)
    }
    initDataRows(props.data['03'], props.clientTaxId)
  }, [props.data, props.clientTaxId])


  //TODO
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
      <EvidenceList data={rowData}></EvidenceList>
    </div>
  )
}

export default IdentifiedEvidenceList