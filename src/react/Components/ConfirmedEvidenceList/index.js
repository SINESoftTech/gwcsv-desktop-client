import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import EvidenceList from "../EvidenceListTable";
import * as mockData from "../../Pages/Main/mockDisplayData";
import isElectron from "is-electron";
const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const R = require('ramda');
const convertData = (fileList) => {

}

const byTicketId = R.groupBy((fileObj) => {
  return fileObj.filename.split('_')[2].split('.')[0]
})
const uploadToGateweb = (imageObj, savedResultObj) => {
  return {
    success: true
  }
}

const ConfirmedEvidenceList = (props) => {
  const [rowData, setRowData] = useState([])
  useEffect(() => {
    setRowData(convertData())
  }, [])


  const handleUpload = () => {
    var filesByTicketId = byTicketId(props.data['04'])
    let imageFileExtension = ['jpg', 'png', 'git']
    Object.keys(filesByTicketId).forEach(async ticketId => {
      let imageObj = filesByTicketId[ticketId].filter((fileObj) => {
        return imageFileExtension.indexOf(fileObj.filename.split('.')[1]) > -1
      })[0]

      let sighttourObj = filesByTicketId[ticketId].filter(fileObj => {
        return R.includes('sightour', fileObj.filename)
      })[0]

      let savedResultObj = filesByTicketId[ticketId].filter(fileObj => {
        return R.includes('saved', fileObj.filename)
      })[0]
      var uploadResult = uploadToGateweb(imageObj, savedResultObj)
      if (uploadResult.success) {
        if (ipcRenderer) {
          var updatedFiles = await ipcRenderer.invoke('evidence:uploaded', JSON.stringify(imageObj), JSON.stringify(sighttourObj), JSON.stringify(savedResultObj))
          setRowData(updatedFiles)
        }
      }
    })
  };
  return (
    <div>
      <Button variant="contained" onClick={handleUpload}>Upload to Gateweb</Button>
      <EvidenceList data={mockData.rows}></EvidenceList>
    </div>
  );
};

export default ConfirmedEvidenceList;