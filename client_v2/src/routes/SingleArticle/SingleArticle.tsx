import React from "react";
import {Button, Card, CardActions, CardContent, Grid, Paper} from "@material-ui/core";
import Markdown from "../Markdown/Markdown";
import post from "../../static/post";
import styles from "../profile/Profile.module.scss";
import {ThumbDown, ThumbUp} from "@material-ui/icons";
import CommentList from "../../components/commentList/CommentList";
import LeaveComment from "../../components/leaveComment/LeaveComment";

export default function SingleArticle() {
  return (
    <Grid item xs={12} md={6}>
      <Paper  style={{padding: '32px'}}>
        <Markdown>
          {post}
        </Markdown>
        <div className={styles.btnGroup} onSubmit={e => e.preventDefault()}>
          <Button size="large" color="primary">
            <ThumbUp />
          </Button>
          <Button size="large" color="secondary">
            <ThumbDown />
          </Button>
        </div>
        <CardContent>
          <CommentList />
        </CardContent>
      </Paper>
    </Grid>
  );
}