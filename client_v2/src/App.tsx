import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './components/header';
import Profile from './routes/profile';
import Login from "./routes/login";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Grid container justify="center">
          <Route
            path="/profile/:id"
            component={Profile}
          />
          <Route
            path="/login"
            component={Login}
          />
        </Grid>
      </Switch>
    </HashRouter>
  );
};

export default App;
