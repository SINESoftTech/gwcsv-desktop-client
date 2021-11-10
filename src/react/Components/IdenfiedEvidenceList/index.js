import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import { getAssign, getJsonRawData } from '../../Actions/electionActions'
import SigoutourMapper, {
  SIGOUTOUR_EVIDENCE_TYPE_REVERSE,
  SIGOUTOUR_FIELD_TYPE
} from '../../Mapper/sigoutour_mapper'
import { validSigoutourData } from '../../Valid/valid'
import { electronActions, sightTourActions } from '../../Context'
import { IdenfiedEvidenceColumnDefinitions } from '../EvidenceListTable/ColumnDefinitions'
import ReverseIndex from '../../Util/ReverseIndex'


const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})

export const handleSendConfirmedResultData = (field, editData, sigoutourJson) => {
  const reverse = ReverseIndex.reverseIndex(SIGOUTOUR_FIELD_TYPE)
  if (field === 'evidenceNumber' && editData['carrierNumber'] !== undefined) {
    field = 'carrierNumber'
  }
  const data = {
    'id': reverse[field],
    'text': editData[field]
  }
  const photoId = sigoutourJson['pageList'][0]['photoList'][0]['photo']
  return {
    data: data,
    photoId: photoId
  }
}


const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  const [localFiles, setLocalFiles] = useState(props.data)
  const [selectionModel, setSelectionModel] = React.useState([])
  const [assignMap, setAssignMap] = React.useState()

  const initDataRows = async (data, clientTaxId, assignMap) => {

    const jsonDataList = await getJsonRawData(data, clientTaxId)
    //read assign
    const parseJsonDataList = jsonDataList.map((json, idx) => {
      const reportingPeriod = json.filePath.split('_')[2]
      const deductionType = json.filePath.split('_')[3]
      const ticketId = json.filePath.split('_')[6]
      const gwEvidenceType = json.filePath.split('_')[5]
      const clientTaxId = json.filePath.split('_')[1]
      const parseResult = validSigoutourData(clientTaxId, SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, gwEvidenceType, json.data), assignMap)
      parseResult['sn'] = idx + 1
      parseResult['id'] = json.data['ticket']
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    const init = async () => {
      const result = await getAssign()
      setAssignMap(result)
      setLocalFiles(props.data)
      initDataRows(props.data['03'], props.declareProperties.clientTaxId, result)
    }
    init()
  }, [props.data, props.declareProperties.clientTaxId])


  const handleResultAllConfirmed = async () => {
    const errorTicketIdList = rowData.filter(obj => {
      return obj.cellHighlight.length > 0
    }).map(obj => {
      return obj.ticketId
    })
    const filterData = localFiles['03'].filter((obj) => {
      const ticketId = obj.filename.split('.')[0].split('_')[6]
      return selectionModel.includes(ticketId)
    }).filter(obj => {
      const ticketId = obj.filename.split('.')[0].split('_')[6]
      return !errorTicketIdList.includes(ticketId)
    })
    const filesByTicketId = byTicketId(filterData)
    const result = await props.onResultAllConfirmed(filesByTicketId)
    setLocalFiles(result)
    initDataRows(result['03'], props.declareProperties.clientTaxId)
  }


  const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel)

  const handleEditRow = async (editData, field = '') => {
    console.log('handleEditRow()', editData)
    console.log('handleEditRow() field', field)
    const jsonDataList = await getJsonRawData(localFiles['03'], props.declareProperties.clientTaxId)
    const json = jsonDataList.filter(obj => {
      return obj.data.ticket === editData.id
    })[0]
    console.log('handleEditRow() json=', json)
    const sigoutourJson = SigoutourMapper.toSigoutour(json.data, editData)
    console.log('handleEditRow() sigoutourJson=', sigoutourJson)
    const result = await electronActions.updateSigoutourData(editData.id, editData.deductionType, editData.reportingPeriod, SIGOUTOUR_EVIDENCE_TYPE_REVERSE[editData.gwEvidenceType], sigoutourJson)
    const validResult = validSigoutourData(props.declareProperties.clientTaxId, editData, assignMap)['cellHighlight']
    if (!validResult.includes(field)) {
      const sendSigoutourFeedBackData = handleSendConfirmedResultData(field, editData, json.data)
      sightTourActions.sendConfirmedResult(sendSigoutourFeedBackData)
    }
    setLocalFiles(result)
    initDataRows(result['03'], props.declareProperties.clientTaxId, assignMap)
  }


  const handleDelete = async (ticket) => {
    await props.OnDeleteEvdience('identifyResultReceived', ticket)
  }

  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <EvidenceList data={rowData} checkboxSelection={true} handleSelection={handleSelection}
                    handleEditRow={handleEditRow} columns={IdenfiedEvidenceColumnDefinitions}
                    handleDelete={handleDelete} />
    </div>
  )
}

export default IdentifiedEvidenceList