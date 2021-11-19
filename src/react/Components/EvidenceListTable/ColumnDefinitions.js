import { Button, FormControl, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { GridColDef } from '@material-ui/data-grid'
import { SIGOUTOUR_EVIDENCE_TYPE } from '../../Mapper/sigoutour_mapper'
import mainStyles from '../../Pages/Main/mainStyles'

const R = require('ramda')


export const ConfirmedColumnDefinitions: GridColDef[] = [
  { field: '', headerName: '', width: 80, renderCell: renderDeleteBtnCell },
  { field: 'sn', headerName: '序號', width: 110, editable: false },
  { field: 'errorMsg', headerName: '上傳錯誤訊息', width: 150, editable: false, renderCell: renderSn },
  {
    field: 'gwEvidenceType', headerName: 'GW憑證類型', width: 200, editable: false, renderCell: cellValues => {
      return SIGOUTOUR_EVIDENCE_TYPE[cellValues.value].name
    }
  },
  { field: 'reportingPeriod', headerName: '申報期別', width: 150, editable: false },
  { field: 'evidenceNumber', headerName: '憑證號碼', width: 150, editable: false },
  { field: 'declarationId', headerName: '報單/文件號碼', width: 200, editable: false },
  { field: 'evidenceDate', headerName: '憑證日期', width: 150, editable: false },
  { field: 'buyerTaxId', headerName: '買方統編', width: 150, editable: false },
  { field: 'sellerTaxId', headerName: '賣方統編', width: 150, editable: false },
  { field: 'taxType', headerName: '課稅別', width: 150, editable: false },
  { field: 'taxableSalesValue', headerName: '應稅銷售額', width: 150, editable: false },
  { field: 'dutyFreeSalesValue', headerName: '免稅銷售額', width: 150, editable: false },
  { field: 'zeroTaxSalesValue', headerName: '零税銷售額', width: 150, editable: false },
  { field: 'businessTaxValue', headerName: '税額', width: 150, editable: false },
  { field: 'otherFee', headerName: '其他金額', width: 150, editable: false },
  { field: 'totalAmount', headerName: '總額', width: 150, editable: false },
  { field: 'totalPayAmount', headerName: '付款總金額', width: 150, editable: false }
]

export const IdenfiedEvidenceColumnDefinitions: GridColDef[] = [
  { field: '', headerName: '', width: 80, renderCell: renderDeleteBtnCell },
  { field: 'sn', headerName: '序號', width: 110, cellClassName: getCellClassName, editable: false },
  {
    field: 'gwEvidenceType',
    headerName: 'GW憑證類型',
    width: 200,
    cellClassName: getCellClassName,
    editable: false,
    renderCell: renderEvidenceType
  },
  {
    field: 'evidenceType',
    headerName: '辨識憑證類型',
    width: 200,
    cellClassName: getCellClassName,
    editable: false,
    renderCell: cellValues => {
      if (cellValues.row.evidenceType !== undefined || cellValues.row.evidenceType !== '') {
        return SIGOUTOUR_EVIDENCE_TYPE[cellValues.value].name
      }
      return ''
    }
  },
  { field: 'reportingPeriod', headerName: '申報期別', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'evidenceNumber', headerName: '憑證號碼', width: 200, cellClassName: getCellClassName, editable: true },
  { field: 'declarationId', headerName: '報單/文件號碼', width: 200, cellClassName: getCellClassName, editable: true },
  { field: 'evidenceDate', headerName: '憑證日期', width: 150, cellClassName: getCellClassName, editable: true },
  {
    field: 'deductionType',
    headerName: '扣抵代號',
    width: 150,
    cellClassName: getCellClassName,
    editable: true,
    renderCell: renderDeductionType
  },
  { field: 'buyerTaxId', headerName: '買方統編', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'sellerTaxId', headerName: '賣方統編', width: 150, cellClassName: getCellClassName, editable: true },
  {
    field: 'taxType',
    headerName: '課稅別',
    width: 150,
    cellClassName: getCellClassName,
    editable: true,
    renderCell: renderTaxType
  },
  { field: 'taxableSalesValue', headerName: '應稅銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'dutyFreeSalesValue', headerName: '免稅銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'zeroTaxSalesValue', headerName: '零税銷售額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'businessTaxValue', headerName: '税額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'otherFee', headerName: '其他金額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'totalAmount', headerName: '總額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'totalPayAmount', headerName: '付款總金額', width: 150, cellClassName: getCellClassName, editable: true },
  { field: 'cellHighlight', hide: true }
]


function renderEvidenceType(param) {
  const keyList = R.keys(SIGOUTOUR_EVIDENCE_TYPE)
  return (
    <>
      <FormControl className={mainStyles().formControl}>
        <Select
          labelId='evidence-type-select-label'
          id='evidence-type-select'
          name='gwEvidenceType'
          value={param.value}
        >
          {keyList.map(key => {
            const name = SIGOUTOUR_EVIDENCE_TYPE[key].name
            return <MenuItem value={key}>{name}</MenuItem>
          })
          }
        </Select>
      </FormControl>
    </>
  )

}


function renderDeductionType(param) {
  console.log('renderDeductionType', param.row.deductionType)
  const deductionType = param.row.deductionType === undefined || param.row.deductionType === '' ? '1' : param.row.deductionType
  return (
    <FormControl>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='deductionType'
        value={deductionType}
      >
        <MenuItem value={'1'}>1 進項可扣抵之進貨及費用</MenuItem>
        <MenuItem value={'2'}>2 進項可扣抵之固定資產</MenuItem>
        <MenuItem value={'3'}>3 進項不可扣抵之進貨及費用</MenuItem>
        <MenuItem value={'4'}>4 進項不可扣抵之固定資產</MenuItem>
      </Select>
    </FormControl>
  )
}

function renderTaxType(param) {
  const taxType = param.row.taxType === undefined || param.row.taxType === '' ? '' : param.row.taxType
  return (
    <FormControl>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='taxType'
        value={taxType}
      >
        <MenuItem value={1}>應</MenuItem>
        <MenuItem value={2}>零</MenuItem>
        <MenuItem value={3}>免</MenuItem>
      </Select>
    </FormControl>
  )
}


function renderSn(cellValues) {
  const value = cellValues.value
  const style = {
    color: 'red'
  }
  if (value === '' || value === undefined) {
    return <div></div>
  } else {
    return <div style={style}>{value}</div>
  }

}

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
