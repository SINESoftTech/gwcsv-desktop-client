import React, {useState} from 'react';
import {DataGrid, GridRowsProp, GridColDef} from '@material-ui/data-grid';
import ColumnDefinitions from "./ColumnDefinitions";
import {Button} from "@material-ui/core";

const columns = ColumnDefinitions
const rows: GridRowsProp = [
  {
    id: 1,
    serialNumber: '1',
    evidenceNumber: 'WN70940980',
    carrierNumber: '',
    evidenceDate: '2020/11/17',
    sellerTaxId: '12345678',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '21,100',
    summary: '光泉食品咖啡',
    cellHighlight: ['buyerTaxId']
  },
  {
    id: 2,
    serialNumber: '2',
    evidenceNumber: 'TR82664064',
    carrierNumber: '',
    evidenceDate: '2020/11/18',
    sellerTaxId: '23456789',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '482',
    summary: '統一超商:衛生紙'
  },
  {
    id: 3,
    serialNumber: '3',
    evidenceNumber: '',
    carrierNumber: '',
    evidenceDate: '',
    sellerTaxId: '',
    buyerTaxId: '',
    taxType: '',
    totalAmt: '',
    rowStatus: 'error',
    summary: '格式不符'
  },
  {
    id: 4,
    serialNumber: '4',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 5,
    serialNumber: '5',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 6,
    serialNumber: '6',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 7,
    serialNumber: '7',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 8,
    serialNumber: '8',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 9,
    serialNumber: '9',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 10,
    serialNumber: '10',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 11,
    serialNumber: '11',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 12,
    serialNumber: '12',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 13,
    serialNumber: '13',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 14,
    serialNumber: '14',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 15,
    serialNumber: '15',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 16,
    serialNumber: '16',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 17,
    serialNumber: '17',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 18,
    serialNumber: '18',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 19,
    serialNumber: '19',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 20,
    serialNumber: '20',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 21,
    serialNumber: '21',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 22,
    serialNumber: '22',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 23,
    serialNumber: '23',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 24,
    serialNumber: '24',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 25,
    serialNumber: '25',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 26,
    serialNumber: '26',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 27,
    serialNumber: '27',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 28,
    serialNumber: '28',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 29,
    serialNumber: '29',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
  {
    id: 30,
    serialNumber: '30',
    evidenceNumber: 'TN39123358',
    carrierNumber: '',
    evidenceDate: '2020/11/19',
    sellerTaxId: '34567890',
    buyerTaxId: '98765432',
    taxType: '應稅',
    totalAmt: '2,520',
    summary: '關網資訊:電子發票'
  },
];




const getRowClassName = (params) =>{
  if(params.row.rowStatus === 'error'){
    return "highlight"
  }
}


const handleRowClick = (param, event) => {
  console.log("Row:");
  console.log(param);
  console.log(event);
};

const EvidenceList = () => {

  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  return (
    <div style={{height: 650, width: '100%'}}>
      <DataGrid rows={rows}
                columns={columns}
                page={pageNumber}
                pageSize={pageSize}
                onPageChange={e => setPageNumber(e.page)}
                onPageSizeChange={e => setPageSize(e.pageSize)}
                rowsPerPageOptions={[10,20,30,40,50]}
                onRowClick={handleRowClick}
                getCellClassName={getRowClassName}
      />
    </div>
  );
};

export default EvidenceList;