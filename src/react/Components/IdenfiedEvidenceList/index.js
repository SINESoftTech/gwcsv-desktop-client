import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, TAX_TYPE } from '../../Enum/sigoutour_type'
import { getJsonRawData } from '../../Actions/electionActions'

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
  json['taxType'] = TAX_TYPE[json.taxType].name
  return json
}

const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  const [localFiles, setLocalFiles] = useState(props.data)

  const initDataRows = async (data, clientTaxId) => {
    const jsonDataList = await getJsonRawData(data, clientTaxId)
    const parseJsonDataList = jsonDataList.map((json, idx) => {
      const parseResult = parseData(json.data)
      parseResult['id'] = idx + 1
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    initDataRows(props.data['03'], props.clientTaxId)
  }, [props.data, props.clientTaxId])


  const handleResultAllConfirmed = async () => {
    const filesByTicketId = byTicketId(localFiles['03'])
    const result = await props.onResultAllConfirmed(filesByTicketId)
    initDataRows(result['03'], props.clientTaxId)
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