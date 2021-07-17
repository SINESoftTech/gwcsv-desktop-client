import {Button} from "@material-ui/core";
import React from "react";
import {Done} from "@material-ui/icons";
import {GridColDef} from "@material-ui/data-grid";

const ColumnDefinitions: GridColDef[] = [
  {field: 'tools', headerName: '', width: 50, renderCell: renderActionCell},
  {field: 'serialNumber', headerName: '序號', hide: true},
  {field: 'evidenceNumber',  headerName: '發票號碼', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'carrierNumber', headerName: '憑證/載具號碼', width: 200, cellClassName: getCellClassName, editable: true},
  {field: 'evidenceDate', headerName: '憑證日期', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'sellerTaxId', headerName: '賣方統編', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'buyerTaxId', headerName: '買方統編', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'taxType', headerName: '課稅別', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'totalAmt', headerName: '總額', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'summary', headerName: '摘要', width: 150, cellClassName: getCellClassName, editable: true},
  {field: 'image', headerName: '', width: 150, renderCell:renderImageCell, editable: true},
  {field: 'rowStatus', hide: true},
  {field: 'cellHighlight', hide: true},
];

function getCellClassName(cellValues) {
  if (cellValues.row.cellHighlight && cellValues.row.cellHighlight.indexOf(cellValues.field) > -1) {
    return "highlight"
  }
}

function renderImageCell(){
  return (
    <div>Image Icon here</div>
  )
}
function renderActionCell(){
  return (
    <div>
      <Button onClick={handleButtonClicked}><Done /></Button>
    </div>
  )
}

function handleButtonClicked(event){
  console.log('handleButtonClicked event', event)
}

export default ColumnDefinitions