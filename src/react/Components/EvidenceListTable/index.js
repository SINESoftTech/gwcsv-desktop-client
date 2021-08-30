import React, { useEffect, useState, useCallback } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
import ColumnDefinitions from './ColumnDefinitions'
import { Button } from '@material-ui/core'
import { electronActions } from '../../Context'

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
      rowData[field] = value
      props.handleEditRow(rowData)
    }, [dataRows])

  const handleCellClick = async (param, event) => {
    if (event.target.innerText === '刪除') {
      const ticketId = param.row.id
      const filePathList = await electronActions.deleteSigoutourData(ticketId)
      const filterDeleteData = props.data.filter(d => {
        return d.id !== ticketId
      })
      setDataRows(filterDeleteData)
    }
  }

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
                onSelectionModelChange={props.handleSelection}
                onCellEditCommit={handleCellEditCommit}
                getCellClassName={getRowClassName}
                onCellClick={handleCellClick}
      />
    </div>
  )
}

export default EvidenceList