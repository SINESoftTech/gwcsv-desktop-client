import React, { useEffect, useState } from 'react';
import {
  Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell,Link,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material';
import { BorderColor, Delete, ImageSearch, PlaylistAddCheck, ReadMore, } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { electronActions, sightTourActions } from '../../../react/Context';
import { getJsonRawData } from '../../../react/Actions/electionActions';
import { validData } from '../../../react/Valid/valid';
import { IdentifiedEvidenceColumnDefinitions } from '../../../react/Components/ColumnDefinitions';
import SigoutourMapper from '../../../react/Mapper/sigoutour_mapper';
import { identifiedEvidenceTableRow } from '../../../core/database/identifiedEvidenceTableRow';

const validEvidence = (evidenceObj, businessEntityTaxId, assignMap) => Object.keys(evidenceObj)
  .map((ticketId, idx) => {
    const obj = evidenceObj[ticketId];
    const data = validData(
      businessEntityTaxId,
      SigoutourMapper.toView(obj, ticketId, idx + 1),
      assignMap,
    );
    return data;
  });

function IdentifiedEvidenceListTable(props) {
  const {
    data, declareProperties, assignMap, onResultAllConfirmed,
    onViewImage, OnDeleteEvidence, onGetIdentifyResult,
  } = props;
  const [rowData, setRowData] = useState([]);
  const [localFiles, setLocalFiles] = useState(data);
  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    const init = async () => {
      // const assignMap = await getAssign()
      // setAssignMap(assignMap)
      setLocalFiles(data);
      if (Object.keys(data).length > 0) {
        setRowData(validEvidence(data['03'], declareProperties.clientTaxId, assignMap));
      }
    };
    init();
  }, [assignMap, data, declareProperties.clientTaxId]);

  const handleResultAllConfirmed = async () => {
    const errorTicketIdList = rowData.filter((obj) => obj.cellHighlight.length > 0).map((obj) => obj.ticketId);
    const filterTicketIdList = Object.keys(localFiles['03'])
      .filter((key) => {
        const ticketId = localFiles['03'][key].ticketId.result;
        return selectionModel.includes(ticketId);
      }).filter((key) => {
        const ticketId = localFiles['03'][key].ticketId.result;
        return !errorTicketIdList.includes(ticketId);
      });
    const result = await onResultAllConfirmed(declareProperties.clientTaxId, filterTicketIdList);
    setLocalFiles(result);
    const validResult = validEvidence(result['03'], declareProperties.clientTaxId, assignMap);
    setRowData(validResult);
  };

  const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel);

  const handleEditRow = async (editData, field = '') => {
    const jsonData = await getJsonRawData(editData.ticketId, declareProperties.clientTaxId);
    jsonData[field].result = editData[field];
    const validatingData = validData(declareProperties.clientTaxId, SigoutourMapper.toView(jsonData, jsonData.ticketId.result, 1), assignMap).cellHighlight;

    if (!validatingData.includes(field)) {
      sightTourActions.sendConfirmedResult(SigoutourMapper.toSighoutFeedBack(field, editData[field], editData.photoId));
    }
    const result = await electronActions.updateData(declareProperties.clientTaxId, jsonData);
    const validResult = validEvidence(result['03'], declareProperties.clientTaxId, assignMap);
    setLocalFiles(result);
    setRowData(validResult);
  };

  const handleOpenImage = async (fullPath) => {
    onViewImage({
      fullPath,
    });
  };

  const handleDelete = async (ticket) => {
    await OnDeleteEvidence(declareProperties.clientTaxId, '03', ticket);
  };

  const [selected, setSelected] = React.useState([]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = (props) => {
    console.log('12345')
    props.history.push('/');
  }

  // TablePagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<ReadMore />}
          disableElevation={true}
          onClick={(e) => onGetIdentifyResult(e, localFiles['02'])}
        >
          取得辨識結果
        </Button>
        <Button
          variant="contained"
          startIcon={<PlaylistAddCheck />}
          disableElevation={true}
          onClick={handleResultAllConfirmed}
        >
          確認辨識結果
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {identifiedEvidenceTableRow.map((thead) => (
                <TableCell
                  key={thead.headerName}
                  align='center'
                  sx={{ flex: 1, whiteSpace: 'nowrap' }}>{thead.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.name)}
                role="checkbox"
                tabIndex={-1}
                key={row.name}
              // selected={isItemSelected}
              >
                <TableCell
                  padding="checkbox"
                  align='center'
                >
                  <Checkbox
                    color="primary"
                  // checked={isItemSelected}
                  />
                </TableCell>
                <TableCell align='center'>{row.sn}</TableCell>
                <TableCell align='center'>
                  <IconButton>
                    <ImageSearch color="primary" onClick={handleOpenImage}></ImageSearch>
                  </IconButton>
                </TableCell>
                <TableCell align='center'>{row.reportingPeriod}</TableCell>
                <TableCell align='center'>{row.isDeclareBusinessTax ? '是' : '否'}</TableCell>
                <TableCell align='center'>{row.gwEvidenceType}</TableCell>
                <TableCell align='center'>{row.taxType}</TableCell>
                <TableCell align='center'>{row.otherFee}</TableCell>
                <TableCell align='center'>{row.evidenceDate}</TableCell>
                <TableCell align='center'>{row.evidenceNumber}</TableCell>
                <TableCell align='center'>{row.buyerTaxId}</TableCell>
                <TableCell align='center'>{row.sellerTaxId}</TableCell>
                <TableCell align='center'>{row.taxableSalesValue}</TableCell>
                <TableCell align='center'>{row.totalAmount}</TableCell>
                <TableCell align='center'>{row.totalPayAmount}</TableCell>
                {/* <TableCell align='center'>
                  <IconButton aria-label="edit" color="primary" onClick={handleEdit}>
                    <BorderColor />
                  </IconButton>
                </TableCell> */}
                <TableCell align='center'>
                  <Link color="primary" href="/identified-evidence-detail">
                    <BorderColor />
                  </Link>
                </TableCell>
                <TableCell align='center' handleDelete={handleDelete}>
                  <IconButton aria-label="delete" color="primary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={IdentifiedEvidenceColumnDefinitions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
IdentifiedEvidenceListTable.propTypes = {
  data: PropTypes.any,
  declareProperties: PropTypes.any,
  OnDeleteEvidence: PropTypes.func,
  onViewImage: PropTypes.func,
  onGetIdentifyResult: PropTypes.func,
  assignMap: PropTypes.any,
  onResultAllConfirmed: PropTypes.func,
};

export default IdentifiedEvidenceListTable;
