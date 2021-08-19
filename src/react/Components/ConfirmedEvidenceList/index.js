import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, TAX_TYPE } from '../../Enum/sigoutour_type'
import { gwUploaded } from '../../Actions/electionActions'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const R = require('ramda')

const parseData = (jsonData) => {
  let json = {}
  const jsonDataBody = jsonData['pageList'][0]['photoList'][0]['result']
  json['evidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[jsonData['pageList'][0]['photoList'][0]['type']].name
  jsonDataBody.forEach(data => {
    const key = SIGOUTOUR_FIELD_TYPE[data['key']]
    json[key] = data['text']
  })
  json['taxType'] = TAX_TYPE[json.taxType].name
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
const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const ConfirmedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])

  const initDataRows = async (data, clientTaxId) => {
    const jsonDataList = await getJsonRawData(data, clientTaxId)
    const parseJsonDataList = jsonDataList.map((json, idx) => {
      const parseResult = parseData(json.data)
      parseResult['id'] = idx + 1
      return parseResult
    })
    setRowData(parseJsonDataList)
    console.log('initDataRows', rowData)
  }

  useEffect(() => {
    initDataRows(props.data['04'], props.clientTaxId)
  }, [props.data, props.clientTaxId])


  const handleUpload = async () => {
    console.log('handleUpload', props.data['04'])
    const filesByTicketId = byTicketId(props.data['04'])
    console.log(filesByTicketId)
    try {
      //upload gw

      //mv folder
      const result = await gwUploaded(filesByTicketId)
      return result
    } catch (e) {
      throw new Error(e)
    }
    //  818085909997119: Array(2)
    // 0: {filename: "string123_24549210_0818085909997119.jpg", fullPath: "/Users/tony/.gwapp/04/string123_24549210_0818085909997119.jpg"}
  }

  return (
    <div>
      <Button variant='contained' onClick={handleUpload}>上傳OCR-CLOUD</Button>
      <EvidenceList data={rowData}></EvidenceList>
    </div>
  )
}

export default ConfirmedEvidenceList