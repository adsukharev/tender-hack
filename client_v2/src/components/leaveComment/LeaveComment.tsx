import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AddComment } from '@material-ui/icons';
import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function LeaveComment(props:any) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={props.text ? props.text : "Оставить комментарий"}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <AddComment />
      </IconButton>
    </Paper>
  );
}
