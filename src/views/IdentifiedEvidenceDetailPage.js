/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  CssBaseline, Button, IconButton, FormControl, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Box, Typography, Container, Grid, Link, Stack
} from '@mui/material';
import { ImageSearch, KeyboardBackspace, PlaylistRemove, Save } from '@mui/icons-material';
import { identifiedEvidenceTableRow } from '../core/database/identifiedEvidenceTableRow';
import DesktopNavbar from '../core/layout/DesktopNavbar';
import mainStyles from '../core/styles/mainStyles';

function IdentifiedEvidenceDetailPage() {
  const classes = mainStyles();
  return (
    <>
      <CssBaseline />
      <DesktopNavbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Stack spacing={2} direction="row" my={3}></Stack>
              </Box>
              <Stack direction="row" spacing={2} mb={2}>
                <Button
                  variant="text"
                  component={Link} href="/"
                  startIcon={<KeyboardBackspace />}
                  disableElevation="true"
                >
                  返回辨識結果
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PlaylistRemove />}
                  disableElevation="true"
                >
                  刪除
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  disableElevation="true"
                >
                  儲存
                </Button>
              </Stack>
              <Paper className={classes.paper}>
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
                      <TableRow>
                        <TableCell align='center'>{''}</TableCell>
                        <TableCell align='center'>{1}</TableCell>
                        <TableCell align='center'>
                          <IconButton>
                            <ImageSearch color="primary"></ImageSearch>
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>{'11008'}</TableCell>
                        <TableCell align='center'>
                          <FormControl>
                            <TextField select variant="standard">
                              <MenuItem value={true}>{'是'}</MenuItem>
                              <MenuItem value={false}>{'否'}</MenuItem>
                            </TextField>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl>
                            <TextField select variant="standard">
                              <MenuItem>三聯式統一發票</MenuItem>
                              <MenuItem>二聯式收銀發票</MenuItem>
                            </TextField>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl>
                            <TextField select variant="standard">
                              <MenuItem value={1}>應</MenuItem>
                              <MenuItem value={2}>零</MenuItem>
                              <MenuItem value={3}>免</MenuItem>
                            </TextField>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl>
                            <TextField select variant="standard">
                              <MenuItem value={true}>Y</MenuItem>
                              <MenuItem value={false}>N</MenuItem>
                            </TextField>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl>
                            <TextField variant="standard" value="11008"></TextField>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center'>
                          <TextField variant="standard" value="AA12345678"></TextField>
                        </TableCell>
                        <TableCell align='center'><TextField variant="standard" value="22335566"></TextField></TableCell>
                        <TableCell align='center'><TextField variant="standard" value="77889900"></TextField></TableCell>
                        <TableCell align='center'><TextField variant="standard" value="1000"></TextField></TableCell>
                        <TableCell align='center'><TextField variant="standard" value="50"></TextField></TableCell>
                        <TableCell align='center'><TextField variant="standard" value="1050"></TextField></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ whiteSpace: 'nowrap' }}>
                      <TableCell>課稅別</TableCell>
                      <TableCell>扣抵代碼</TableCell>
                      <TableCell>銷售額</TableCell>
                      <TableCell>稅額</TableCell>
                      <TableCell>總金額</TableCell>
                      <TableCell>備註</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>應稅</TableCell>
                      <TableCell>可扣抵支出</TableCell>
                      <TableCell>1000</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell rowspan="3">1100</TableCell>
                      <TableCell>--</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>免稅</TableCell>
                      <TableCell>不可扣抵支出</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>--</TableCell>
                      <TableCell>--</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>零稅</TableCell>
                      <TableCell>不可扣抵支出</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>--</TableCell>
                      <TableCell>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A aliquam consequatur ipsum,
                        provident corporis hic esse nostrum cupiditate numquam eveniet.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://material-ui.com/">
                Your Website
              </Link>
              {' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </main>
    </>
  )


}

export default IdentifiedEvidenceDetailPage