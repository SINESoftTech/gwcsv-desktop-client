import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getJsonRawData } from '../../Actions/electionActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'
import { validSigoutourData } from '../../Valid/valid'
import { electronActions } from '../../Context'
import { IdenfiedEvidenceColumnDefinitions } from '../EvidenceListTable/ColumnDefinitions'


const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  // const [imageUrl, setImageUrl] = useState('')

  const [localFiles, setLocalFiles] = useState(props.data)

  const initDataRows = async (data, clientTaxId) => {
    const jsonDataList = await getJsonRawData(data, clientTaxId)
    const parseJsonDataList = jsonDataList.map((json) => {
      const reportingPeriod = json.filePath.split('_')[2]
      const deductionType = json.filePath.split('_')[3]
      const parseResult = validSigoutourData(SigoutourMapper.toView(deductionType, reportingPeriod, json.data))
      parseResult['id'] = json.data['ticket']
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    setLocalFiles(props.data)
    initDataRows(props.data['03'], props.declareProperties.clientTaxId)
  }, [props.data, props.declareProperties.clientTaxId])


  const handleResultAllConfirmed = async () => {
    const filterData = localFiles['03'].filter((obj) => {
      const ticketId = obj.filename.split('.')[0].split('_')[3]
      return selectionModel.includes(ticketId)
    })
    const filesByTicketId = byTicketId(filterData)
    console.log('handleResultAllConfirmed', filesByTicketId)
    const result = await props.onResultAllConfirmed(filesByTicketId)
    console.log('handleResultAllConfirmed', result)
    setLocalFiles(result)
    initDataRows(result['03'], props.declareProperties.clientTaxId)
  }

  const [selectionModel, setSelectionModel] = React.useState([])

  const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel)

  const handleEditRow = async (editData) => {
    console.log('handleEditRow editData', editData)
    console.log('handleEditRow localFiles', localFiles['03'])
    const jsonDataList = await getJsonRawData(localFiles['03'], props.declareProperties.clientTaxId)
    const json = jsonDataList.filter(obj => {
      return obj.data.ticket === editData.id
    })[0]
    const sigoutourJson = SigoutourMapper.toSigoutour(json.data, editData)
    const result = await electronActions.updateSigoutourData(editData.id,editData.deductionType, editData.reportingPeriod, sigoutourJson)
    setLocalFiles(result)
    initDataRows(result['03'], props.declareProperties.clientTaxId)
  }


  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <EvidenceList data={rowData} checkboxSelection={true} handleSelection={handleSelection}
                    handleEditRow={handleEditRow} columns={IdenfiedEvidenceColumnDefinitions} />
    </div>
  )
}

export default IdentifiedEvidenceList