import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import mainStyles from '../Pages/Main/mainStyles'
import { toPeriodList } from '../Util/Time'

const DialogComponent = (props) => {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const classes = mainStyles()

  const handleChange = (event) => {
    props.handleSelectionChange(event)
  }

  const renderReportingPeriod = () => {
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='reporting-period-select-label'>申報期別</InputLabel>
          <Select
            labelId='reporting-period-select-label'
            id='reporting-period-select'
            name='reportingPeriod'
            value={props.declareProperties.reportingPeriod}
            onChange={handleChange}
          >
            <MenuItem key={0} value={''}>請選擇申報期別</MenuItem>
            {toPeriodList().filter(period => period % 2 === 0).map(period => {
              return (<MenuItem key={period} value={period}>{period}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </>
    )
  }
  const renderIsDeclareBusinessTax = () => {
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id='is-declare-business-select-label'>是否申報營業稅</InputLabel>
          <Select
            labelId='is-declare-business-select'
            id='is-declare-business-select'
            name='isDeclareBusinessTax'
            value={props.declareProperties.isDeclareBusinessTax}
            onChange={handleChange}
          >
            <MenuItem key={0} value={''}>請選擇是否申報營業稅</MenuItem>
            <MenuItem key={1} value={true + ''}>是</MenuItem>
            <MenuItem key={2} value={false + ''}>否</MenuItem>
          </Select>
        </FormControl>
      </>
    )
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>請選擇</DialogTitle>

        <DialogContent>
          {renderReportingPeriod()}
          {renderIsDeclareBusinessTax()}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {
            props.handleClose()
            props.onScan()
          }} color='primary'>
            確認
          </Button>
          <Button onClick={(e) => {
            props.handleClose()
            props.handleReset()
          }} color='primary'>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}
export default DialogComponent