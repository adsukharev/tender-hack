import React, {useEffect, useState} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './components/header';
import Profile from './routes/profile';
import Login from './routes/login';
import io from "socket.io-client";
import Feed from "./routes/feed";

const socket = io('http://localhost:5000/api/socket');

const App: React.FC = () => {
  const [state, setState] = useState({} as any);

  useEffect(() => {
    socket.on("connect", (data:any) => setState(data));
    socket.emit("connect_logged_user(user_id)", "1")
  },[])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Grid container justify="center" xs={12}>
          <Route
            path="/profile/:id"
            component={Profile}
          />
          <Route
            path="/feed"
            component={Feed}
          />
          <Route
            path="/login"
            component={Login}
          />
        </Grid>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
