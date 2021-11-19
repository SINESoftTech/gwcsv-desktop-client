import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getRawDataWithImage } from '../../Actions/electionActions'
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

  useEffect(() => {
    setRowData(Object.keys(props.data['04'])
      .map((ticketId, idx) => {
        const obj = props.data['04'][ticketId]
        return SigoutourMapper.toView(obj, ticketId, idx + 1)
      }))
  }, [props.data, props.declareProperties.clientTaxId])

  const handleUpload = async () => {
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
    const parseRawDataResult = getRawDataResult.flatMap(data => {
      const keys = R.keys(data)
      let result = []
      for (let i = 0; i < keys.length; i++) {
        let json = {}
        for (let j = 0; j < data[keys[i]].length; j++) {
          json = Object.assign(json, data[keys[i]][j])
        }
        const reportingPeriod = json['imageFullPath'].split('_')[2]
        const deductionType = json['imageFullPath'].split('_')[3]
        const isDeclareBusinessTax = json['imageFullPath'].split('_')[4]
        const gwEvidenceType = json['imageFullPath'].split('_')[5]
        const ticketId = json['imageFullPath'].split('_')[6].split('.')[0]
        result.push({
          'image': new File([json['image']], Date.now() + '.jpg'),
          'imageFullPath': json['imageFullPath'],
          'jsonFullPath': json['jsonFullPath'],
          'json': SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, isDeclareBusinessTax, gwEvidenceType, json['json'])
        })
      }
      return result
    })
    const uploadResult = await uploadToGw(parseRawDataResult, props.user.taxId, props.user.token)
    props.onGwUploaded(uploadResult)
  }

  const handleDelete = async (ticket) => {
    console.log('handleDelete', ticket)
    await props.OnDeleteEvdience('evidenceSaved', ticket)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleUpload}>上傳</Button>
      <EvidenceList data={rowData}
                    checkboxSelection={false}
                    columns={ConfirmedColumnDefinitions}
                    handleDelete={handleDelete} />
    </div>
  )
}

export default ConfirmedEvidenceList