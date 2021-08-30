import { Button } from '@material-ui/core'
import React from 'react'
import { GridColDef } from '@material-ui/data-grid'
import { electronActions, sightTourActions } from '../../Context'

const ColumnDefinitions: GridColDef[] = [
  { field: '', headerName: '', width: 150, renderCell: renderDeleteBtnCell },
  { field: 'evidenceType', headerName: '憑證類型', width: 150, cellClassName: getCellClassName, editable: false },
  { field: 'reportingPeriod', headerName: '申報期別', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'evidenceNumber', headerName: '憑證號碼', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'declarationId', headerName: '報單/文件號碼', width: 200, cellClassName: getCellClassName, editable: true },
  { field: 'evidenceDate', headerName: '憑證日期', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'buyerTaxId', headerName: '買方統編', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'sellerTaxId', headerName: '賣方統編', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'taxType', headerName: '課稅別', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'taxableSalesValue', headerName: '應稅銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'dutyFreeSalesValue', headerName: '免稅銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'zeroTaxSalesValue', headerName: '零税銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'businessTaxValue', headerName: '税額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'otherFee', headerName: '其他金額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'totalAmount', headerName: '總額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'totalPayAmount', headerName: '付款總金額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'rowStatus', hide: true },
  { field: 'cellHighlight', hide: true }
]

function getCellClassName(cellValues) {
  if (cellValues.row.cellHighlight && cellValues.row.cellHighlight.indexOf(cellValues.field) > -1) {
    return 'highlight'
  }
}

function renderImageCell() {
  return (
    <div>Image Icon here</div>
  )
}

function renderDeleteBtnCell(param) {
  return <Button variant='contained' color='primary'>刪除</Button>
}
export default ColumnDefinitions