import React from 'react';
import {IconButton,} from '@mui/material'
import {GW_EVIDENCE_TYPE} from '../Mapper/gw_mapper';
import {Delete, ImageSearch} from "@mui/icons-material";

const R = require('ramda');

export const ConfirmedColumnDefinitions = [
    {
        field: '', headerName: '', width: 80, renderCell: renderDeleteBtnCell,
    },
    {
        field: 'sn', headerName: '序號', width: 110, editable: false,
    },
    {
        field: 'errorMsg', headerName: '上傳錯誤訊息', width: 150, editable: false, renderCell: renderSn,
    },
    {
        field: 'gwEvidenceType',
        headerName: 'GW憑證類型',
        width: 200,
        editable: false,
        renderCell: (cellValues) => GW_EVIDENCE_TYPE[cellValues.value].name,
    },
    {
        field: 'reportingPeriod', headerName: '申報期別', width: 150, editable: false,
    },
    {
        field: 'evidenceNumber', headerName: '憑證號碼', width: 150, editable: false,
    },
    {
        field: 'declarationId', headerName: '報單/文件號碼', width: 200, editable: false,
    },
    {
        field: 'evidenceDate', headerName: '憑證日期', width: 150, editable: false,
    },
    {
        field: 'buyerTaxId', headerName: '買方統編', width: 150, editable: false,
    },
    {
        field: 'sellerTaxId', headerName: '賣方統編', width: 150, editable: false,
    },
    {
        field: 'taxType', headerName: '課稅別', width: 150, editable: false,
    },
    {
        field: 'taxableSalesValue', headerName: '應稅銷售額', width: 150, editable: false,
    },
    {
        field: 'dutyFreeSalesValue', headerName: '免稅銷售額', width: 150, editable: false,
    },
    {
        field: 'zeroTaxSalesValue', headerName: '零税銷售額', width: 150, editable: false,
    },
    {
        field: 'businessTaxValue', headerName: '税額', width: 150, editable: false,
    },
    {
        field: 'otherFee', headerName: '其他金額', width: 150, editable: false,
    },
    {
        field: 'totalAmount', headerName: '總額', width: 150, editable: false,
    },
    {
        field: 'totalPayAmount', headerName: '付款總金額', width: 150, editable: false,
    },
];

export const IdentifiedEvidenceColumnDefinitions = [
    {
        field: 'image',
        headerName: '圖檔',
        width: 70,
        cellClassName: renderCellClassName,
        editable: false,
        renderCell: (cellValues) => <ImageSearch color='primary'>打開</ImageSearch>
    },
    {
        field: 'sn', headerName: '序號', width: 110, cellClassName: renderCellClassName, editable: false,
    },
    {
        field: 'reportingPeriod', headerName: '申報期別', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'isDeclareBusinessTax', headerName: '申報', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'evidenceType',
        headerName: '憑證類型',
        width: 200,
        cellClassName: renderCellClassName,
        editable: true,
        type: 'singleSelect',
        valueOptions: renderEvidenceType()
    },

    {
        field: 'taxType',
        headerName: '課稅別',
        width: 150,
        cellClassName: renderCellClassName,
        editable: true,
    },
    //todo
    // {
    //     field: 'other', headerName: '其他代收代付', width: 110, cellClassName: renderCellClassName, editable: true,
    // },
    {
        field: 'evidenceDate', headerName: '憑證日期', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'evidenceNumber', headerName: '憑證號碼', width: 200, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'buyerTaxId', headerName: '買方統編', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'sellerTaxId', headerName: '賣方統編', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'taxableSalesValue',
        headerName: '應稅銷售額',
        width: 150,
        cellClassName: renderCellClassName,
        editable: true,
    },
    {
        field: 'dutyFreeSalesValue',
        headerName: '免稅銷售額',
        width: 150,
        cellClassName: renderCellClassName,
        editable: true,
    },
    {
        field: 'zeroTaxSalesValue',
        headerName: '零税銷售額',
        width: 150,
        cellClassName: renderCellClassName,
        editable: true,
    },

    {
        field: 'businessTaxValue', headerName: '税額', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'deductionType',
        headerName: '扣抵代號',
        width: 150,
        cellClassName: renderCellClassName,
        editable: true,
    },
    {
        field: 'otherFee', headerName: '其他金額', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'totalAmount', headerName: '總額', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'totalPayAmount', headerName: '付款總金額', width: 150, cellClassName: renderCellClassName, editable: true,
    },
    {
        field: 'cellHighlight', hide: true
    },
    {
        field: 'delete', headerName: '刪除', width: 110, renderCell: renderDeleteBtnCell,
    }
];

function renderEvidenceType() {
    const keyList = R.keys(GW_EVIDENCE_TYPE);
    const result = keyList
        .map(key => {
            const {name} = GW_EVIDENCE_TYPE[key]
            return name
        })
    return result
}


// function renderDeductionType(param) {
//     const deductionType = param.row.deductionType === undefined || param.row.deductionType === '' ? '1' : param.row.deductionType;
//     return (
//         <FormControl>
//             <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 name="deductionType"
//                 value={deductionType}
//             >
//                 <MenuItem value="1">1 進項可扣抵之進貨及費用</MenuItem>
//                 <MenuItem value="2">2 進項可扣抵之固定資產</MenuItem>
//                 <MenuItem value="3">3 進項不可扣抵之進貨及費用</MenuItem>
//                 <MenuItem value="4">4 進項不可扣抵之固定資產</MenuItem>
//             </Select>
//         </FormControl>
//     );
// }


// function renderTaxType(param) {
//     const taxType = param.row.taxType === undefined || param.row.taxType === '' ? '' : param.row.taxType;
//     return (
//         <FormControl>
//             <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 name="taxType"
//                 value={taxType}
//             >
//                 <MenuItem value={1}>應</MenuItem>
//                 <MenuItem value={2}>零</MenuItem>
//                 <MenuItem value={3}>免</MenuItem>
//             </Select>
//         </FormControl>
//     );
// }

function renderSn(cellValues) {
    const {value} = cellValues;
    const style = {
        color: 'red',
    };
    if (value === '' || value === undefined) {
        return <div/>;
    }
    return <div style={style}>{value}</div>;
}

function renderCellClassName(cellValues) {
    if (cellValues.row.cellHighlight && cellValues.row.cellHighlight.indexOf(cellValues.field) > -1) {
        return 'highlight'
    }
}


function renderDeleteBtnCell() {
    return <IconButton aria-label='delete' color='primary'>
        <Delete/>
    </IconButton>
}