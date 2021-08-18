import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import EvidenceList from '../EvidenceListTable'
import * as mockData from '../../Pages/Main/mockDisplayData'
import isElectron from 'is-electron'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null
const R = require('ramda')

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})
//{
//     "ticket": "0818124603395695",
//     "pageList": [
//         {
//             "page": "0818124603395695_1",
//             "photoList": [
//                 {
//                     "photo": "0818124603395695_1_1",
//                     "type": "A5002",
//                     "x": 0,
//                     "y": 87,
//                     "w": 677,
//                     "h": 2101,
//                     "result": [
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "invoiceNumber",
//                             "key": "KEY_INVN",
//                             "text": "FN51290225",
//                             "score": [
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "invoiceDate",
//                             "key": "KEY_INVD",
//                             "text": "1091023",
//                             "score": [
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "buyer",
//                             "key": "KEY_BUY",
//                             "text": "16151904",
//                             "score": [
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "seller",
//                             "key": "KEY_SEL",
//                             "text": "29278095",
//                             "score": [
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "taxType",
//                             "key": "KEY_TXT",
//                             "text": 1,
//                             "score": [
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 31,
//                             "y": 1211,
//                             "w": 204,
//                             "h": 35,
//                             "name": "salesAmount",
//                             "key": "KEY_SALA",
//                             "text": "86",
//                             "score": [
//                                 0.998,
//                                 1
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "zeroTaxSalesAmount",
//                             "key": "KEY_ZTSA",
//                             "text": "",
//                             "score": [
//                                 0
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "freeTaxSalesAmount",
//                             "key": "KEY_FTSA",
//                             "text": "",
//                             "score": [
//                                 0
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "taxAmount",
//                             "key": "KEY_TAXA",
//                             "text": "4",
//                             "score": [
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "totalAmount",
//                             "key": "KEY_TOTA",
//                             "text": "90",
//                             "score": [
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "payAmount",
//                             "key": "KEY_PAYA",
//                             "text": "90",
//                             "score": [
//                                 0.98,
//                                 0.98
//                             ]
//                         },
//                         {
//                             "x": 0,
//                             "y": 0,
//                             "w": 0,
//                             "h": 0,
//                             "name": "remark",
//                             "key": "KEY_REM",
//                             "text": "",
//                             "score": [
//                                 0
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
//TODO
const parseData = (jsonData) => {
  let json = {}
  const jsonDataBody = jsonData['pageList'][0]['photoList'][0]['result']
  console.log(jsonDataBody)
}

const getJsonRawData = async (data) => {
  try {
    const filterJsonDataFilePathList = data.filter(d => {
      return d.filename.endsWith('.json')
    }).map(d => {
      return d.fullPath
    })
    console.log('getJsonRawData', filterJsonDataFilePathList)
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:getJsonFileData', filterJsonDataFilePathList)
    }
  } catch (error) {
    //todo handler
  }
}

const IdentifiedEvidenceList = (props) => {

  const [rowData, setRowData] = useState()

  const [imageUrl, setImageUrl] = useState('')

  const [localFiles, setLocalFiles] = useState(props.data)

  useEffect(() => {
    const initDataRows = async (data) => {
      const jsonDataList = (props.data) ? await getJsonRawData(data) : []
      //parseData
      console.log('in useEffect', jsonDataList)
    }
    initDataRows(props.data['03'])
  }, [props.data, props.clientTaxId])

  const handleResultAllConfirmed = () => {
    console.log('localfiles 03', localFiles['03'])
    var filesByTicketId = byTicketId(localFiles['03'])
    let imageFileExtension = ['jpg', 'png', 'git']
    Object.keys(filesByTicketId).forEach(async ticketId => {
      if (ipcRenderer) {
        let imageObj = filesByTicketId[ticketId].filter((fileObj) => {
          return imageFileExtension.indexOf(fileObj.filename.split('.')[1]) > -1
        })[0]

        let sighttourObj = filesByTicketId[ticketId].filter(fileObj => {
          return R.includes('sightour', fileObj.filename)
        })[0]

        console.log('imageObj', imageObj)
        console.log('sightourObj', sighttourObj)
        var updatedFiles = await ipcRenderer.invoke('evidence:evidenceSaved', JSON.stringify(imageObj), JSON.stringify(sighttourObj), null)
        setLocalFiles(updatedFiles)
      }
    })
  }

  const handleReadImage = async () => {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      const image = await ipcRenderer.invoke('evidence:getImageFileContent', result['01'][0]['fullPath'])
      const blob = new Blob([image])
      setImageUrl(URL.createObjectURL(blob))
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={e => props.onGetIdentifyResult(e, localFiles['02'])}>取得辨識結果</Button>
      <Button variant='contained' onClick={handleResultAllConfirmed}>確認辨識結果</Button>
      <Button variant='contained' onClick={handleReadImage}>載入圖檔</Button>
      <EvidenceList data={mockData.rows}></EvidenceList>
    </div>
  )
}

export default IdentifiedEvidenceList