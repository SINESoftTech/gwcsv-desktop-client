import {GridColDef} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";
import React from "react";

const ColumnDefinitions: GridColDef[] = [
  {field: 'tools', headerName: '工具', width: 150, renderCell: renderActionCell},
  {field: 'serialNumber', headerName: '序號', hide: true},
  {field: 'evidenceNumber', headerName: '發票號碼', width: 150, cellClassName: getCellClassName},
  {field: 'carrierNumber', headerName: '憑證/載具號碼', width: 200, cellClassName: getCellClassName},
  {field: 'evidenceDate', headerName: '憑證日期', width: 150, cellClassName: getCellClassName},
  {field: 'sellerTaxId', headerName: '賣方統編', width: 150, cellClassName: getCellClassName},
  {field: 'buyerTaxId', headerName: '買方統編', width: 150, cellClassName: getCellClassName},
  {field: 'taxType', headerName: '課稅別', width: 150, cellClassName: getCellClassName},
  {field: 'totalAmt', headerName: '總額', width: 150, cellClassName: getCellClassName},
  {field: 'summary', headerName: '摘要', width: 150, cellClassName: getCellClassName},
  {field: 'image', headerName: '', width: 150, renderCell:renderImageCell},
  {field: 'actions', headerName: '', width: 150, renderCell:renderActionCell},
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
      <Button>Delete</Button>
      <Button>Edit</Button>
    </div>
  )
}


export default ColumnDefinitions