import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

interface IProps {
  info: IAdditionalInfo[];
}

interface IAdditionalInfo {
  name: string;
  value: string;
}

export default function InformationList(props: IProps) {
  const classes = useStyles();

  const { info } = props;

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.demo}>
          <List>
            {info.map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem>
                  <ListItemText
                    primary={item.value}
                    secondary={item.name}
                  />
                </ListItem>
                <Divider light />
              </React.Fragment>
            ))}
          </List>
        </div>
      </Grid>
    </div>
  );
}
