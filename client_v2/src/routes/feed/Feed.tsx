import React, {useEffect, useState} from "react";
import {getPosts, getProfileData} from "../../services/api";
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import styles from "../profile/Profile.module.scss";
import Article from "../../components/article";

const Feed: React.FC = () => {
  const [data, setData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPosts().then((response) => {
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
    <Grid container spacing={4} xs={12} md={6} justify="center">
      {data.map((post: any) => (
        <Article key={post.title} post={post} />
      ))}
    </Grid>
  );
};

export default Feed;