import React from 'react';
import {
  AppBar,
  Button,
  Divider, Drawer,
  IconButton,
  List,
  ListItem, ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { DynamicFeed, Person} from '@material-ui/icons';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
        <ListItem button key="profile" component={Link} to="/profile/1">
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItem>
        <ListItem button key="feed" component={Link} to="/feed">
          <ListItemIcon><DynamicFeed /></ListItemIcon>
          <ListItemText primary="Лента" />
        </ListItem>
      </List>
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
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </header>
  );
};

export default Header;