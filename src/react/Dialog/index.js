import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import mainStyles from '../Pages/Main/mainStyles'

const toPeriodTime = (timestamp = Date.now()) => {
  const date = new Date(timestamp)
  const year = date.getFullYear() - 1911
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const years = [year - 1, year, year + 1]
  return years.flatMap(year => {
    return months.map(m => {
      return year + m
    })
  })
}

const DialogComponent = (props) => {

  const [open, setOpen] = React.useState(true)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const classes = mainStyles()

  const handleClose = () => {
    setOpen(false)
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
            // value={declareProperties.reportingPeriod}
            // onChange={handleSelectionChange}
            // disabled={disableSelection}
          >
            <MenuItem key={0} value={''}>請選擇申報期別</MenuItem>
            {toPeriodTime().filter(period => period % 2 === 0).map(period => {
              return (<MenuItem key={period} value={period}>{period}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </>
    )
  }


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>請選擇申報期別</DialogTitle>
        <DialogContent>
          {renderReportingPeriod()}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            取消
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            選擇
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}
export default DialogComponent