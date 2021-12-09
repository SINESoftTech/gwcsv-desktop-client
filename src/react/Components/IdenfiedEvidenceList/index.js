import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import { getJsonRawData } from '../../Actions/electionActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'
import { validData } from '../../Valid/valid'
import { electronActions, sightTourActions } from '../../Context'
import { IdenfiedEvidenceColumnDefinitions } from '../EvidenceListTable/ColumnDefinitions'


const validEvidence = (evidenceObj, businessEntityTaxId, assignMap) => {
  return Object.keys(evidenceObj)
    .map((ticketId, idx) => {
      const obj = evidenceObj[ticketId]
      const data = validData(businessEntityTaxId, SigoutourMapper.toView(obj, ticketId, idx + 1), assignMap)
      return data
    })
}


const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState([])
  const [localFiles, setLocalFiles] = useState(props.data)
  const [selectionModel, setSelectionModel] = React.useState([])
  // const [assignMap, setAssignMap] = React.useState()


  useEffect(() => {
    const init = async () => {
      // const assignMap = await getAssign()
      // setAssignMap(assignMap)
      setLocalFiles(props.data)
      if (Object.keys(props.data).length > 0) {
        setRowData(validEvidence(props.data['03'], props.declareProperties.clientTaxId, props.assignMap))
      }
    }
    init()
  }, [props.data, props.declareProperties.clientTaxId])

  const handleResultAllConfirmed = async () => {
    const errorTicketIdList = rowData.filter(obj => {
      return obj.cellHighlight.length > 0
    }).map(obj => {
      return obj.ticketId
    })
    const filterTicketIdList = Object.keys(localFiles['03'])
      .filter((key) => {
        const ticketId = localFiles['03'][key]['ticketId'].result
        return selectionModel.includes(ticketId)
      }).filter(key => {
        const ticketId = localFiles['03'][key]['ticketId'].result
        return !errorTicketIdList.includes(ticketId)
      })
    const result = await props.onResultAllConfirmed(props.declareProperties.clientTaxId, filterTicketIdList)
    setLocalFiles(result)
    const validResult = validEvidence(result['03'], props.declareProperties.clientTaxId, props.assignMap)
    setRowData(validResult)
  }

  const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel)

  const handleEditRow = async (editData, field = '') => {
    const jsonData = await getJsonRawData(editData['ticketId'], props.declareProperties.clientTaxId)
    jsonData[field].result = editData[field]
    const data = validData(props.declareProperties.clientTaxId, SigoutourMapper.toView(jsonData, jsonData['ticketId'].result, 1), props.assignMap)['cellHighlight']

    if (!data.includes(field)) {
      sightTourActions.sendConfirmedResult(SigoutourMapper.toSighoutFeedBack(field, editData[field], editData['photoId']))
    }
    const result = await electronActions.updateData(props.declareProperties.clientTaxId, jsonData)
    const validResult = validEvidence(result['03'], props.declareProperties.clientTaxId, props.assignMap)
    setLocalFiles(result)
    setRowData(validResult)
  }

  const handleOpenImage = async (fullPath) => {
    props.onViewImage({
      fullPath: fullPath
    })
  }

  const handleDelete = async (ticket) => {
    await props.OnDeleteEvdience(props.declareProperties.clientTaxId, '03', ticket)
  }

  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <EvidenceList data={rowData} checkboxSelection={true} handleSelection={handleSelection}
                    handleEditRow={handleEditRow}
                    handleOpenImage={handleOpenImage}
                    columns={IdenfiedEvidenceColumnDefinitions}
                    handleDelete={handleDelete} />
    </div>
  )
}

export default IdentifiedEvidenceList