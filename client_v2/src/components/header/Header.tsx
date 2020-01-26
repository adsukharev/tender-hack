import React, {useEffect} from 'react';
import {
  AppBar,
  Button,
  Divider, Drawer,
  IconButton,
  List,
  ListItem, ListItemAvatar, ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useHistory} from 'react-router-dom';
import {DynamicFeed, Message, People, Person} from '@material-ui/icons';
import styles from './Header.module.scss';
import UserStore from "../../UserStore";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const history = useHistory();

  const logout = () => {
    UserStore.logout(history).then(() => {
      setUser(UserStore.user);
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setUser(UserStore.user);
    }, 1000)
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const sideList = () => (
    <div
      className={styles.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="avatar" component={Link} to="/profile/1">
          <ListItemAvatar>ВТБ</ListItemAvatar>
          <ListItemText primary="Иван Иванов" />
        </ListItem>
        <Divider light />
        <ListItem button key="profile" component={Link} to="/rating">
          <ListItemIcon><People/></ListItemIcon>
          <ListItemText primary="Рейтинг" />
        </ListItem>
        <ListItem button key="dialogs" component={Link} to="/dialog/1">
          <ListItemIcon><Message /></ListItemIcon>
          <ListItemText primary="Диалоги" />
        </ListItem>
        <ListItem button key="feed" component={Link} to="/feed">
          <ListItemIcon><DynamicFeed /></ListItemIcon>
          <ListItemText primary="Лента" />
        </ListItem>
        <Divider />
        <ListItem button key="dialog" component={Link} to="/dialog/general">
          <ListItemIcon><Message /></ListItemIcon>
          <ListItemText primary="Чат с платформой" />
        </ListItem>
      </List>
      { user != null &&
        <Button
          color="inherit"
          onClick={() => logout()}
          className={styles.logout}
        >Log out</Button>
      }
    </div>
  );

  return (
    <header className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
                        Tender App
          </Typography>
          { user == null && <Button color="inherit" component={Link} to="/login">Login</Button>}
        </Toolbar>
      </AppBar>
      <Drawer open={isOpen} onClose={toggleDrawer(false)} variant="permanent">
        {sideList()}
      </Drawer>
    </header>
  );
};

export default Header;