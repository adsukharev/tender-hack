import React, {useState} from 'react';
import {
  Avatar, Box, Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel, Grid, Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserStore from "../../UserStore";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://material-ui.com/">
        Tender Hack
      </Link>{' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
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

const Login: React.FC = () => {
  const classes = useStyles();

  const [login, updateLogin] = useState('');
  const [password, updatePassword] = useState('');
  const history = useHistory();

  const signIn = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (login && password) {
      console.log(UserStore.user);
      UserStore.login({ login: login, password:password }, history);
      console.log(UserStore.user);
    }
  }

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateLogin(event.target.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePassword(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate onSubmit={signIn}>
          <TextField
            onChange={onLoginChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            onChange={onPasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Зарегистрируйтесь прямо сейчас!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;