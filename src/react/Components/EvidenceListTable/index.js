import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { electronActions } from '../../Context'


const getRowClassName = (params) => {
  if (params.row.rowStatus === 'error') {
    return 'highlight'
  }
}

const EvidenceList = (props) => {
  useEffect(() => {
    setDataRows(props.data)
  }, [props.data])

  const [dataRows, setDataRows] = useState(props.data)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const handleCellEditCommit = useCallback(
    ({ id, field, value }) => {
      const ticketId = id
      const rowData = dataRows.filter(d => d.id === ticketId)[0]
      rowData[field] = value
      props.handleEditRow(rowData, field)
    }, [dataRows])

  const handleCellClick = async (param, event) => {
    if (event.target.name === 'taxType') {
      param.row['taxType'] = event.target.value
      props.handleEditRow(param.row, 'taxType')
    }
    if (event.target.name === 'deductionType') {
      param.row['deductionType'] = event.target.value
      props.handleEditRow(param.row)
    }
    if (event.target.innerText === '刪除') {
      const ticketId = param.row.id
      props.handleDelete(ticketId)
    }
  }

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={dataRows}
                columns={props.columns}
                page={pageNumber}
                pageSize={pageSize}
                onPageChange={e => setPageNumber(e.page)}
                onPageSizeChange={e => setPageSize(e.pageSize)}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                checkboxSelection={props.checkboxSelection}
                onSelectionModelChange={props.handleSelection}
                onCellEditCommit={handleCellEditCommit}
                getCellClassName={getRowClassName}
                onCellClick={handleCellClick}
      />
    </div>
  )
}

export default EvidenceList