import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import {Link} from "react-router-dom";
import Like from "../like";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    width: '100%'
  },
  cardDetails: {
    flexGrow: 1,
    width: '100%'
  },
  cardMedia: {
    width: '100%',
  },
});

interface IProps {
  post: any;
}

export default function Article(props: IProps) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item className={classes.card}>
      <CardActionArea component={Link} to="/feed/1">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.dateat}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Читать
              </Typography>
            </CardContent>
            <Like iconType="like" count={post.likes}></Like>
            <Like iconType="comment" count={post.comments}></Like>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.image_title} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
