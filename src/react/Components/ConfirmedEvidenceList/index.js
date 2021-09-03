import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getJsonRawData, getRawDataWithImage } from '../../Actions/electionActions'
import { uploadToGw } from '../../Actions/gwActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'
import { ConfirmedColumnDefinitions } from '../EvidenceListTable/ColumnDefinitions'


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
      const reportingPeriod = json.filePath.split('_')[2]
      const deductionType = json.filePath.split('_')[3]
      const ticketId = json.filePath.split('_')[5]
      const parseResult = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, json.data)
      parseResult['sn'] = idx + 1
      parseResult['id'] = json.data['ticket']
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
    const parseRawDataResult = getRawDataResult.map(data => {
      const reportingPeriod = data['imageFullPath'].split('_')[2]
      const deductionType = data['imageFullPath'].split('_')[3]
      const isDeclareBusinessTax = data['imageFullPath'].split('_')[4]
      const ticketId = data['imageFullPath'].split('_')[5].split('.')[0]
      return {
        'image': new File([data['image']], Date.now() + '.jpg'),
        'imageFullPath': data['imageFullPath'],
        'jsonFullPath': data['jsonFullPath'],
        'json': SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType,isDeclareBusinessTax, data['json'])
      }
    })
    const uploadResult = await uploadToGw(parseRawDataResult, props.user.taxId, props.user.token)
    props.onGwUploaded(uploadResult)
  }

  const handleDelete = async (ticket) => {
    console.log('handleDelete',ticket)
    await props.OnDeleteEvdience('evidenceSaved', ticket)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleUpload}>上傳</Button>
      <EvidenceList data={rowData}
                    checkboxSelection={false}
                    columns={ConfirmedColumnDefinitions}
                    handleDelete={handleDelete}></EvidenceList>
    </div>
  )
}

export default ConfirmedEvidenceList