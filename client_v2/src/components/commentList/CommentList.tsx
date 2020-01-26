import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {CardActions, Paper} from "@material-ui/core";
import LeaveComment from "../leaveComment/LeaveComment";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CommentList() {
  const classes = useStyles();

  return (
    <>
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Иван Иванов" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Кооператив Ромашка"
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Иван Иванов
              </Typography>
               — Очень приятно работать!!!
            </>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Алексей Петров" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="ООО ИНГРОСТРОЙ"
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Алексей Петров
              </Typography>
               — Заказ доставили быстро!
            </>
          )}
        />
      </ListItem>
    </List>
      <CardActions>
        <LeaveComment />
      </CardActions>
    </>
  );
}