import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, MenuItem, Stack, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { SIGOUTOUR_EVIDENCE_TYPE } from '../../../react/Mapper/sigoutour_mapper';

const R = require('ramda');

function DialogComponent(props) {
  const [renderEvidenceTypeList, setRenderEvidenceTypeList] = useState([]);

  const handleChange = (event) => {
    props.handleSelectionChange(event);
  };

  useEffect(() => {
    const keyList = R.keys(SIGOUTOUR_EVIDENCE_TYPE);
    const { isDeclareBusinessTax } = props.declareProperties;
    if (isDeclareBusinessTax === 'true') {
      const data = keyList
        .filter((key) => SIGOUTOUR_EVIDENCE_TYPE[key].id !== '').map((key) => {
          const id = `${SIGOUTOUR_EVIDENCE_TYPE[key].id} `;
          const { name } = SIGOUTOUR_EVIDENCE_TYPE[key];
          return (
            <MenuItem
              key={key}
              value={key}
            >
              {(id + name)}
            </MenuItem>
          );
        });
      setRenderEvidenceTypeList([...data]);
    } else {
      const data = keyList
        .map((key) => {
          const id = SIGOUTOUR_EVIDENCE_TYPE[key].id === '' ? '99 ' : `${SIGOUTOUR_EVIDENCE_TYPE[key].id} `;
          const { name } = SIGOUTOUR_EVIDENCE_TYPE[key];
          return (
            <MenuItem
              key={key}
              value={key}
            >
              {(id + name)}
            </MenuItem>
          );
        });
      setRenderEvidenceTypeList([...data]);
    }
  }, [props.declareProperties, props.declareProperties.isDeclareBusinessTax]);

  // const renderReportingPeriod = () => {
  //   return (
  //     <FormControl fullWidth>
  //       <TextField
  //         id="reporting-period-select-label"
  //         name="reportingPeriod"
  //         select
  //         label="申報期別"
  //         value={props.declareProperties.reportingPeriod}
  //         onChange={handleChange}
  //       >
  //         <MenuItem key={0} value=''>請選擇申報期別</MenuItem>
  //         {toPeriodList().filter(period => period % 2 === 0).map(period => {
  //           return (<MenuItem key={period} value={period}>{period}</MenuItem>)
  //         })}
  //       </TextField>
  //     </FormControl>
  //   )
  // }

  const renderIsDeclareBusinessTax = () => (
    <FormControl fullWidth>
      <TextField
        id="is-declare-business-select"
        name="isDeclareBusinessTax"
        select
        value={props.declareProperties.isDeclareBusinessTax}
        onChange={handleChange}
        label="是否申報營業稅"
        defaultValue={`${true}`}
      >
        <MenuItem key={1} value={`${true}`}>是</MenuItem>
        <MenuItem key={2} value={`${false}`}>否</MenuItem>
      </TextField>
    </FormControl>
  );

  const renderEvidenceType = (evidenceTypeList) => (
    <FormControl fullWidth>
      <TextField
        id="evidence-type-select"
        name="evidenceType"
        select
        value={props.declareProperties.evidenceType}
        onChange={handleChange}
        label="請選擇憑證種類"
        defaultValue=""
      >
        <MenuItem key={0} value="">請選擇憑證種類</MenuItem>
        {evidenceTypeList}
      </TextField>
    </FormControl>
  );

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      aria-labelledby="設定是否申報營業稅與選擇憑證種類"
    >
      <DialogTitle id="responsive-dialog-title">設定</DialogTitle>

      <DialogContent>
        <Stack spacing={2} my={2}>
          {/* {renderReportingPeriod()} */}
          {renderIsDeclareBusinessTax()}
          {renderEvidenceType(renderEvidenceTypeList)}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={(e) => {
            props.handleClose();
            props.handleReset();
          }}
          color="primary"
        >
          取消
        </Button>
        <Button
          variant="contained"
          disableElevation={true}
          onClick={(e) => {
            props.handleClose();
            props.onScan();
          }}
          color="primary"
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogComponent.propTypes = {
  declareProperties: PropTypes.any,
  open: PropTypes.any,
  handleSelectionChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleReset: PropTypes.func,
  onScan: PropTypes.func,
};

export default DialogComponent;
