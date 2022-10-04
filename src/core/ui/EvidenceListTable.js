/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const getRowClassName = (params) => {
  if (params.row.rowStatus === 'error') {
    return 'highlight';
  }
};

function EvidenceListTable(props) {
  const {
    data, handleEditRow, handleDelete, handleOpenImage, columns, checkboxSelection, handleSelection,
  } = props;
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    setDataRows(data);
  }, [data]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleCellEditCommit = useCallback(({ id, field, value }) => {
    const ticketId = id;
    const rowData = dataRows.filter((d) => d.id === ticketId)[0];
    rowData[field] = value;
    handleEditRow(rowData, field);
  }, [dataRows, handleEditRow]);

  const handleCellClick = async (param, event) => {
    const { row } = param;
    if (event.target.name === 'taxType') {
      row.taxType = event.target.value;
      handleEditRow(param.row, 'taxType');
    }
    if (event.target.name === 'deductionType') {
      row.deductionType = event.target.value;
      handleEditRow(param.row, 'deductionType');
    }
    if (event.target.name === 'gwEvidenceType') {
      row.gwEvidenceType = event.target.value;
      handleEditRow(param.row, 'gwEvidenceType');
    }
    if (event.target.innerText === '打開') {
      handleOpenImage(param.row.fullPath);
    }
    if (event.target.innerText === '刪除') {
      const ticketId = param.row.id;
      handleDelete(ticketId);
    }
  };

  const handlePageChange = (e) => setPageNumber(e);

  const handlePageSizeChange = (e) => setPageSize(e);

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={dataRows}
        columns={columns}
        page={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={handleSelection}
        onCellEditCommit={handleCellEditCommit}
        getCellClassName={getRowClassName}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

EvidenceListTable.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any,
  checkboxSelection: PropTypes.any,
  handleSelection: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEditRow: PropTypes.func,
  handleOpenImage: PropTypes.func,
};
export default EvidenceListTable;
