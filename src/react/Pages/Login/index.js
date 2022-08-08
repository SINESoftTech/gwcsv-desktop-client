import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { gwActions, useAppState, useAppDispatch, electronActions } from '../../Context'
import PropTypes from "prop-types";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.gateweb.com.tw/'>
        Gateweb Co. Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    fontsize: '0.8rem',
    color: '#bb0000'
  }
}))

const Login = (props) => {
  const classes = useStyles()
  const [accountingFirmTaxId, setAccountingFirmTaxId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { auth } = useAppState()
  console.log('Login Page')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('auth', auth)

    try {
      const response = await gwActions.loginUser(dispatch, { taxId: accountingFirmTaxId, username, password })
      console.log('login response', response)
      if (!response.token) {
        return
      }
      await handleGetYearAssign()
      props.history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetYearAssign = async () => {
    const localVersion = await electronActions.getYearAssignVersion()
    const result = await gwActions.getAssign(localVersion)
    if (result.status === 'success') {
      await electronActions.saveAssign(result.data, result.version)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {auth.errorMessage ? <p className={classes.error}>{auth.errorMessage}</p> : null}
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='accountingFirmTaxId'
            label='Firm Tax Id'
            name='accountingFirmTaxId'
            value={accountingFirmTaxId}
            onChange={e => setAccountingFirmTaxId(e.target.value)}
            autoComplete='accountingFirmTaxId'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete='username'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            id='password'
            autoComplete='current-password'
          />
          {/*<FormControlLabel*/}
          {/*  control={<Checkbox value="remember" color="primary" />}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleLogin} disabled={auth.loading}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  history: PropTypes.any
}

export default Login
