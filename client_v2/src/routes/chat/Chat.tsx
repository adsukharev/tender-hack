import React, {useState} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid, IconButton,
  InputBase,
  Paper,
  Typography
} from "@material-ui/core";
import styles from './Chat.module.scss';
import LeaveComment from "../../components/leaveComment/LeaveComment";
import {AddComment} from "@material-ui/icons";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

const initialMessages: any = [
  {from: false, time:"12:31",message:"Привет"},
  {from: false, time:"12:31",message:"Привет"},
  {from: true, time:"12:31",message:"Привет"},
  {from: false, time:"12:31",message:"Привет"},
]

const Chat: React.FC = (props: any) => {
  const classes = useStyles();
  const [message, updateMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);



  const send = () => {
    console.log(message);
    setMessages([...messages, {
      from: true,
      time: new Date().toTimeString().slice(0,5),
      message: message
    }]);

    updateMessage('');

  }
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage(event.target.value);
  }

  return (
    <Grid item xs={12} md={6}>
      <Paper className={styles.container}>
        {messages.map((item:any,idx:number) => {
          return (
            <Card key={idx} classes={{root: item.from ? styles.from : styles.to}}>
              <CardContent>{item.message}</CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.time}
              </Typography>
            </Card>
          );
        })

        }

      </Paper>
      <Paper component="form" className={classes.root} onSubmit={send}>
        <InputBase
          className={classes.input}
          placeholder="Отправить сообщение"
          onChange={onInputChange}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton onClick={send} color="primary" className={classes.iconButton} aria-label="directions">
          <AddComment />
        </IconButton>
      </Paper>
    </Grid>
  );
}

export default Chat;