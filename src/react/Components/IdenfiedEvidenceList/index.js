import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getJsonRawData } from '../../Actions/electionActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'
import { validSigoutourData } from '../../Valid/valid'


const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  const [localFiles, setLocalFiles] = useState(props.data)

  const initDataRows = async (data, clientTaxId) => {
    const jsonDataList = await getJsonRawData(data, clientTaxId)
    const parseJsonDataList = jsonDataList.map((json) => {
      const reportingPeriod = json.filePath.split('_')[2]
      const parseResult = validSigoutourData(SigoutourMapper.toView(reportingPeriod, json.data))
      parseResult['id'] = json.data['ticket']
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    initDataRows(props.data['03'], props.declareProperties.clientTaxId)
    setLocalFiles(props.data)
  }, [props.data, props.declareProperties.clientTaxId])


  const handleResultAllConfirmed = async () => {
    console.log('handleResultAllConfirmed', selectionModel)
    console.log('handleResultAllConfirmed', localFiles['03'])
    const filterData = localFiles['03'].filter((obj) => {
      const ticketId = obj.filename.split('.')[0].split('_')[3]
      return selectionModel.includes(ticketId)
    })
    const filesByTicketId = byTicketId(filterData)
    console.log('handleResultAllConfirmed', filesByTicketId)
    const result = await props.onResultAllConfirmed(filesByTicketId)
    initDataRows(result['03'], props.declareProperties.clientTaxId)
  }

  const [selectionModel, setSelectionModel] = React.useState([])

  const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel)

  const handleEditRow = async (editData) => {
    console.log('handleEditRow data', props.data)
    console.log('handleEditRow id', props.declareProperties.clientTaxId)
    const jsonDataList = await getJsonRawData(props.data['03'], props.declareProperties.clientTaxId)
    const json = jsonDataList.filter(obj => {
      return obj.data.ticket === editData.id
    })[0]
    SigoutourMapper.toSigoutour(json.data, editData)
    //TODO
  }



  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <EvidenceList data={rowData} checkboxSelection={true} handleSelection={handleSelection}
                    handleEditRow={handleEditRow} />
    </div>
  )
}

export default IdentifiedEvidenceList