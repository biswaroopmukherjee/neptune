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
  email: '',
  password: '',
};

export default function SignIn() {
  const classes = useStyles();

  // function login(e) {
  //   console.log(e);
  //   if (false) {
  //     window.location.href = `${window.location.origin}/dashboard`;
  //   } else {
  //     alert('error logging in');
  //   }
  // }


  function onEmailChange(e) {
    state.email = e.target.value;
  }

  function onPasswordChange(e) {
    state.password = e.target.value;
  }


  async function login() {
    console.log(state.email);
    console.log(state.password);


    try {
      const response = await axios.post('https://fermi3.com/api-token-auth/', {
        username: state.email,
        password: state.password,
      });
      console.log(response);
      cookie.save('username', 'bec1', { path: '/' });
      cookie.save('breadboardapitoken', response.data.token, { path: '/' });
      console.log(document.cookie);
      window.location.href = `${window.location.origin}/dashboard`;
      // cookie.remove('userId', { path: '/' })
    } catch (error) {
      console.error(error);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link to="/dashboard" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/dashboard" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
