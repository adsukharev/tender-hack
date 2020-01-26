import React, {useEffect, useState} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import Header from './components/header';
import Profile from './routes/profile';
import Login from './routes/login';
import io from "socket.io-client";
import Feed from "./routes/feed";
import Markdown from "./routes/Markdown";
// @ts-ignoreblogpost.1.md
import post from "./static/post";
// @ts-ignore


import SingleArticle from "./routes/SingleArticle/SingleArticle";
import UserStore from "./UserStore";
import Chat from "./routes/chat";
import Rating from "./routes/rating";

const socket = io('http://localhost:5000/api/socket');

const App: React.FC = () => {
  const [state, setState] = useState({} as any);
   console.log(UserStore.user);

  useEffect(() => {
    socket.on("connect", (data:any) => setState(data));
    socket.emit("connect_logged_user(user_id)", "1")
  },[])

  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }

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
            exact
          />
          <Route
            path="/feed/:post_id"
          >
            <SingleArticle/>
          </Route>
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/dialog/:id"
            component={Chat}
          />
          <Route
            path="/rating"
            component={Rating}
          />
        </Grid>
      </Switch>

    </BrowserRouter>
  );
};

export default App;
