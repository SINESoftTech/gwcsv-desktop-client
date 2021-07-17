import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import EvidenceList from "../EvidenceListTable";
import * as mockData from "../../Pages/Main/mockDisplayData";
import isElectron from "is-electron";
const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const sendToIdentify = async (fileObj) => {
  // const result = await ipcRenderer.invoke('evidence:getImageFileContent')
  return {
    result: 'true',
    ticket: {
      id: '8c869dbd-1bb5-4fe2-ac60-9b4215edffb8'
    }
  }
}

const ScannedImageList = (props) => {
  const [rowData, setRowData] = useState(props.data)

  const handleSendToIdentify = () => {
    props.data.forEach(async (fileObj) => {
      var ticket = await sendToIdentify(fileObj)

      if (ipcRenderer) {
        console.log('ticket', ticket)
        var updatedFiles = await ipcRenderer.invoke('evidence:identifySent', JSON.stringify(props.user), JSON.stringify(props.client), JSON.stringify(ticket.ticket), JSON.stringify(fileObj))
        console.log('updatedFiles', updatedFiles)
        setRowData(updatedFiles)
      }
    })

  };

  const handleScan = async () => {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:scan')
      setRowData(result)
    }
  };



  return (
    <div>
        <Button variant="contained" onClick={handleScan}>掃描文件</Button>
        <Button variant="contained" onClick={handleSendToIdentify}>送出辨識</Button>
        <EvidenceList data={mockData.rows2}></EvidenceList>
    </div>
  );
};

export default ScannedImageList;