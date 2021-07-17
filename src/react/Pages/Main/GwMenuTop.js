import React from 'react';
import clsx from "clsx";
import {AppBar, Badge, Divider, Drawer, IconButton, List, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import mainStyles from "./mainStyles";
import {mainListItems, secondaryListItems} from "./listItems";

const GwMenuTop = () => {
  const classes = mainStyles()
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleSideMenuOpen = () =>{
    setMenuOpen(true);
  }

  const handleSideMenuClose = () =>{
    setMenuOpen(false);
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