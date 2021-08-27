import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import isElectron from 'is-electron'
import { getJsonRawData } from '../../Actions/electionActions'
import SigoutourMapper from '../../Mapper/sigoutour_mapper'


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
    const parseJsonDataList = jsonDataList.map((json, idx) => {
      console.log('initDataRows', json, idx)
      const parseResult = SigoutourMapper.toView(json.data)
      parseResult['id'] = idx + 1
      return parseResult
    })
    setRowData(parseJsonDataList)
  }

  useEffect(() => {
    initDataRows(props.data['03'], props.clientTaxId)
    setLocalFiles(props.data)
  }, [props.data, props.clientTaxId])


  const handleResultAllConfirmed = async () => {
    const filesByTicketId = byTicketId(localFiles['03'])
    const result = await props.onResultAllConfirmed(filesByTicketId)
    initDataRows(result['03'], props.clientTaxId)
  }

  // const handleReadImage = async () => {
  //   if (ipcRenderer) {
  //     const result = await ipcRenderer.invoke('evidence:getFileLists')
  //     const image = await ipcRenderer.invoke('evidence:getImageFileContent', result['01'][0]['fullPath'])
  //     const blob = new Blob([image])
  //     setImageUrl(URL.createObjectURL(blob))
  //   }
  // }

  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <EvidenceList data={rowData} checkboxSelection={true}></EvidenceList>
    </div>
  )
}

export default IdentifiedEvidenceList