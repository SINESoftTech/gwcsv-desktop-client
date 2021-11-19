import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getImageData, getRawDataWithImage } from '../../Actions/electionActions'
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
    if (Object.keys(props.data).length > 0) {
      setRowData(Object.keys(props.data['04'])
        .map((ticketId, idx) => {
          const obj = props.data['04'][ticketId]
          return SigoutourMapper.toView(obj, ticketId, idx + 1)
        }))
    }
  }, [props.data, props.declareProperties.clientTaxId])

  const handleUpload = async () => {
    const keyList = Object.keys(props.data['04'])
    let uploadData = []
    for (let i = 0; i < keyList.length; i++) {
      const data = props.data['04'][keyList[i]]
      console.log(data)
      const image = await getImageData(data['fullPath'].result)
      uploadData.push(
        {
          'image': new File([image], Date.now() + '.jpg'),
          'json': SigoutourMapper.toGw(data)
        }
      )
    }
    console.log(uploadData)
    console.log(props.user)
    const uploadResult = await uploadToGw(uploadData, props.user.taxId, props.user.token)
    props.onGwUploaded(props.declareProperties.clientTaxId, uploadResult)
  }

  const handleDelete = async (ticket) => {
    await props.OnDeleteEvdience(props.declareProperties.clientTaxId, '04', ticket)
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