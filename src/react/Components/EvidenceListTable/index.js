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


const handleRowClick = (param, event) => {
  console.log('Row:')
  console.log(param)
  console.log(event)
}
const handleCellDoubleClicked = (param, event) => {
  console.log('handleCellDoubleClicked param', param)
  console.log('handleCellDoubleClicked event', event)
}

const handleEditRowModeChanged = (param, event) => {
  console.log('handleEditRowModeChanged param', param)
  console.log('handleEditRowModeChanged event', event)
}
const handleRowLeft = (param, event) => {
  console.log('handleRowLeft param', param)
  console.log('handleRowLeft event', event)
}

const handleRowOut = (param, event) => {
  console.log('handleRowOut param', param)
  console.log('handleRowOut event', event)
}

const EvidenceList = (props) => {

  useEffect(() => {
    setDataRows(props.data)
  }, [props.data])

  const [dataRows, setDataRows] = useState(props.data)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  //TODO
  const handleCellEditCommit = useCallback(
    ({ id, field, value }) => {
      console.log('handleCellEditCommit', id, field, value)
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
                checkboxSelection
                //todo return row id and field name ,field value
                onCellEditCommit={handleCellEditCommit}
                //TODO save return row id
                onSelectionModelChange={(e) => console.log('onSelectionModelChange', e)}
                getCellClassName={getRowClassName}
      />
    </div>
  )
}

export default EvidenceList