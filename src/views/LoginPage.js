import React, { useState } from 'react';
import {
  Avatar, Box, Button, Container, CssBaseline, Link, TextField, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  gwActions, useAppState, useAppDispatch, electronActions,
} from '../react/Context';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    fontsize: '0.8rem',
    color: '#bb0000',
  },
}));
function LoginPage(props) {
  const classes = useStyles();
  const [accountingFirmTaxId, setAccountingFirmTaxId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { auth } = useAppState();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('auth', auth);

    try {
      const response = await gwActions.loginUser(
        dispatch,
        { taxId: accountingFirmTaxId, username, password },
      );
      console.log('login response', response);
      if (!response.token) {
        return;
      }
      await handleGetYearAssign();
      props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetYearAssign = async () => {
    const localVersion = await electronActions.getYearAssignVersion();
    const result = await gwActions.getAssign(localVersion);
    if (result.status === 'success') {
      await electronActions.saveAssign(result.data, result.version);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container omponent="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          {auth.errorMessage ? <p className={classes.error}>{auth.errorMessage}</p> : null}
          <Box component="form" noValidate sx={{ my: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="accountingFirmTaxId"
              label="Firm Tax ID"
              name="accountingFirmTaxId"
              value={accountingFirmTaxId}
              onChange={(e) => setAccountingFirmTaxId(e.target.value)}
              autoComplete="accountingFirmTaxId"
              autoFocus
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              disabled={auth.loading}
              sx={{ my: 2 }}
            >
              Sign In
            </Button>

          </Box>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.gateweb.com.tw/">
              Gateweb Co. Ltd.
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

LoginPage.propTypes = {
  history: PropTypes.any,
};

export default LoginPage;
