import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';

import axios from 'axios';
import cookie from 'react-cookies';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const state = {
  username: '',
  password: '',
};

export default function SignIn() {
  const classes = useStyles();


  function onUsernameChange(e) {
    state.username = e.target.value;
  }

  function onPasswordChange(e) {
    state.password = e.target.value;
  }


  async function login() {
    try {
      const response = await axios.post('https://fermi3.com/api-token-auth/', {
        username: state.username,
        password: state.password,
      });
      console.log(response);
      cookie.save('username', 'bec1', { path: '/' });
      cookie.save('breadboardapitoken', response.data.token, { path: '/' });
      window.location.href = `${window.location.origin}/dashboard`;
    } catch (error) {
      alert('error logging in');
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={onUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            component={RouterLink}
            onClick={login}
          >
            Sign In
          </Button>

        </form>
      </div>
    </Container>
  );
}
