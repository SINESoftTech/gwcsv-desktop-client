import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, TAX_TYPE } from '../../Enum/sigoutour_type'
import { getJsonRawData, getRawDataWithImage } from '../../Actions/electionActions'
import { uploadToGw } from '../../Actions/gwActions'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const R = require('ramda')

const parseData = (jsonData) => {
  let json = {}
  const jsonDataBody = jsonData['pageList'][0]['photoList'][0]['result']
  json['evidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[jsonData['pageList'][0]['photoList'][0]['type']].value
  jsonDataBody.forEach(data => {
    const key = SIGOUTOUR_FIELD_TYPE[data['key']]
    json[key] = data['text']
  })
  json['taxType'] = TAX_TYPE[json.taxType].value
  return json
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
  }

  useEffect(() => {
    initDataRows(props.data['04'], props.clientTaxId)
  }, [props.data, props.clientTaxId])

  const handleUpload = async () => {
    console.log('handleUpload', props.data['04'])
    const filesByTicketId = byTicketId(props.data['04'])
    let filterResult = []
    for (let key in filesByTicketId) {
      const filterData = filesByTicketId[key]
        .filter(d => {
          const taxId = d.filename.split('_')[1]
          return taxId === props.clientTaxId
        })
      if (filterData.length) {
        let json = {}
        json[key] = filesByTicketId[key]
        filterResult.push(json)
      }
    }
    const getRawDataResult = await getRawDataWithImage(filterResult)
    const parseRawDataResult = getRawDataResult.map(data => {
      return {
        'image': new File([data['image']], Date.now() + '.jpg'),
        'imageFullPath': data['imageFullPath'],
        'jsonFullPath': data['jsonFullPath'],
        'json': parseData(data['json'])
      }
    })
    const uploadResult = await uploadToGw(parseRawDataResult, props.user.taxId, props.user.token)
    props.onGwUploaded(uploadResult)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleUpload}>上傳</Button>
      <EvidenceList data={rowData}></EvidenceList>
    </div>
  )
}

export default ConfirmedEvidenceList