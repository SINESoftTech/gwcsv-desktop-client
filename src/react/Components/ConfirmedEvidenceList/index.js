import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getJsonRawData, getRawDataWithImage } from '../../Actions/electionActions'
import { uploadToGw } from '../../Actions/gwActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const R = require('ramda')


const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const ConfirmedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])

  const initDataRows = async (data, clientTaxId) => {
    const jsonDataList = await getJsonRawData(data, clientTaxId)
    const parseJsonDataList = jsonDataList.map((json, idx) => {
      const parseResult = SigoutourMapper.toView(props.declareProperties.reportingPeriod, json.data)
      parseResult['id'] = idx + 1
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    initDataRows(props.data['04'], props.declareProperties.clientTaxId)
  }, [props.data, props.declareProperties.clientTaxId])

  const handleUpload = async () => {
    console.log('handleUpload', props.data['04'])
    const filesByTicketId = byTicketId(props.data['04'])
    let filterResult = []
    for (let key in filesByTicketId) {
      const filterData = filesByTicketId[key]
        .filter(d => {
          const taxId = d.filename.split('_')[1]
          return taxId === props.declareProperties.clientTaxId
        })
      if (filterData.length) {
        let json = {}
        json[key] = filesByTicketId[key]
        filterResult.push(json)
      }
    }
    const getRawDataResult = await getRawDataWithImage(filterResult)
    console.log('getRawDataResult()', getRawDataResult)
    const parseRawDataResult = getRawDataResult.map(data => {
      return {
        'image': new File([data['image']], Date.now() + '.jpg'),
        'imageFullPath': data['imageFullPath'],
        'jsonFullPath': data['jsonFullPath'],
        'json': SigoutourMapper.toGw(data['json'])
      }
    })
    const uploadResult = await uploadToGw(parseRawDataResult, props.user.taxId, props.user.token, props.declareProperties)
    props.onGwUploaded(uploadResult)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleUpload}>上傳</Button>
      <EvidenceList data={rowData} checkboxSelection={false}></EvidenceList>
    </div>
  )
}

export default ConfirmedEvidenceList