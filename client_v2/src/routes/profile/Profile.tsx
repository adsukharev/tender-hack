import React, { ReactNode, useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import {Link, useParams} from 'react-router-dom';
import styles from './Profile.module.scss';
import CommentList from '../../components/commentList';
import InformationList from '../../components/informationList';
import LeaveComment from '../../components/leaveComment';
import { getProfileData } from '../../services/api';
import Like from "../../components/like";

interface IProps {
  id?: number;
  children?: ReactNode;
}

const Profile: React.FC = (props: IProps) => {

  const [data, setData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProfileData(id as string).then((response) => {
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
    <Grid item xs={12} md={6} className={styles.wrapper}>
      <Card>
        <CardMedia
          component="img"
          image={data.avatar}
          height="256"
          title="Шикарная компания"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.user_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { data.info ?? 'Информация не предоставлена'}
          </Typography>
        </CardContent>
        <CardContent>
          <InformationList info={data.additional_info} />
        </CardContent>
        <CardActions classes={{ root: styles.btnGroup }} onSubmit={e => e.preventDefault()}>
          <Button size="large" color="primary">
            <Like iconType="like" count={data.likes} />
          </Button>
          <Button size="large" color="secondary">
            <Like iconType="dislike" count={data.dislikes} />
          </Button>
        </CardActions>
        <CardActions classes={{ root: styles.btnGroup }} onSubmit={e => e.preventDefault()}>
          <Button size="large" color="primary" component={Link} to="/dialog/232">
            <Like iconType="comment" count="написать сообщение" />
          </Button>
        </CardActions>
        <CardContent>
          <CommentList />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Profile;