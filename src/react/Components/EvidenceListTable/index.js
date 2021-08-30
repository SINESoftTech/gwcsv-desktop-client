import React, { useEffect, useState, useCallback } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
import ColumnDefinitions from './ColumnDefinitions'
import { Button } from '@material-ui/core'

const columns = ColumnDefinitions


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
      // console.log('handleCellEditCommit()', rowData)
      // console.log('handleCellEditCommit()', id, field, value)
      rowData[field] = value
      props.handleEditRow(rowData)
    }, [dataRows])

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={dataRows}
                columns={columns}
                page={pageNumber}
                pageSize={pageSize}
                onPageChange={e => setPageNumber(e.page)}
                onPageSizeChange={e => setPageSize(e.pageSize)}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                checkboxSelection={props.checkboxSelection}
        //todo return row id and field name ,field value
                onSelectionModelChange={props.handleSelection}
                onCellEditCommit={handleCellEditCommit}
        //TODO save return row id
                getCellClassName={getRowClassName}
      />
    </div>
  )
}

export default EvidenceList