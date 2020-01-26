import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import { getUsers} from "../../services/api";
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import styles from "../profile/Profile.module.scss";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Like from "../../components/like";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";

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

const Rating: any = (props: any) => {
  const [data, setData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Backdrop className={styles.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
   <Grid container xs={12} md={6} spacing={4}>
     <Typography component="h1" variant="h2">
       Рейтинг компаний
     </Typography>
     {
       data.map((item: any, idx: number) => {
       return (
         <Grid item key={item.user_id} xs={12} md={12}>
           <CardActionArea component={Link} to={`/profile/${item.user_id}`}>
             <Card className={classes.card}>
               <div className={classes.cardDetails}>
                 <CardContent>
                   <Typography component="h2" variant="h5">
                     {item.user_name}
                   </Typography>
                   <Typography variant="subtitle1" color="textSecondary">
                     {item.info}
                   </Typography>
                   <Typography variant="subtitle1" paragraph>
                   </Typography>
                 </CardContent>
                 <Like iconType="like" count={item.likes}></Like>
                 <Like iconType="dislike" count={item.dislikes}></Like>
               </div>
               <Hidden xsDown>
                 <CardMedia className={classes.cardMedia} image={item.avatar}/>
               </Hidden>
             </Card>
           </CardActionArea>
         </Grid>
       );
     })
     }
   </Grid>
 )
}

export default Rating;