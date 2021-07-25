import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import isElectron from "is-electron";
import PropTypes from "prop-types";
import scannedImageListStyles from "./scannedImageListStyles";
import ColumnDefinitions from "./columnDefinitions";
import {DataGrid} from "@material-ui/data-grid";
import {sequence} from "ramda";
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
  const classes = scannedImageListStyles();
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

  const dataRows = (props.data) ? props.data.map((item, index) => {
    console.log('in render dataRow item', item)
    return {id: index+1, fileName: item.filename}
  }) : []
  console.log('dataRows', dataRows)
  const columns = ColumnDefinitions

  return (
      <div style={{height: 650, width: '100%'}}>
        <Button variant="contained" onClick={props.onScanClick}>掃描文件</Button>
        <Button variant="contained" onClick={props.onSendToIdentifyClick}>送出辨識</Button>
        <DataGrid rows={dataRows}
                  columns={columns}
        />
    </div>
  );
};

ScannedImageList.propTypes = {
  onScanClick: PropTypes.func,
  onSendToIdentifyClick: PropTypes.func,
  data: PropTypes.array
};

export default ScannedImageList;