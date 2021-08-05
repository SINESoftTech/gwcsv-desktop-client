import React from 'react';
import clsx from "clsx";
import {AppBar, Badge, Button, Divider, Drawer, IconButton, Link, List, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import mainStyles from "./mainStyles";
import {mainListItems, secondaryListItems} from "./listItems";
import {gwActions, useAppDispatch, useAppState} from "../../Context";

const GwMenuTop = (props) => {
  const classes = mainStyles()
  const [menuOpen, setMenuOpen] = React.useState(false);
  const appState = useAppState();
  const dispatch = useAppDispatch();

  const handleSideMenuOpen = () =>{
    setMenuOpen(true);
  }

  const handleSideMenuClose = () =>{
    setMenuOpen(false);
  }
  const handleLogout = () => {
        gwActions.logout(dispatch);
        console.log(props)
        props.history.push('/login');
    };
  const renderUserMenu = () => {
        if (appState.auth) {
            return (
                <nav>
                  <Link variant="button" color="textPrimary" href="#" className={classes.link}>Welcome {appState.auth.user.username}</Link>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </nav>
            )
        }
        return (<>
            <nav>Aloha</nav>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
        </>)
    }

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, menuOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleSideMenuOpen}
            className={clsx(classes.menuButton, menuOpen && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Gateweb
          </Typography>
          {renderUserMenu()}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !menuOpen && classes.drawerPaperClose),
        }}
        open={menuOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleSideMenuClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>{mainListItems}</List>
      </Drawer>
    </>
  );
};

export default GwMenuTop;
