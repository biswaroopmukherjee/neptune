import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { Container, Box } from '@material-ui/core';
import ListRouter from './ListRouter';
import StaticDatePicker from './StaticDatePicker.js';
import rotini from '../rotini.png';
import neptune from '../icons/neptune5.svg';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    //   background: 'transparent',
    // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundColor: '#303030',
    boxShadow: 'none',
    borderBottom: '1px solid white',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

}));

export default function SideBar(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} borderBottom={1}>
        <Toolbar variant="dense">
          <img src={neptune} width="30px" />
          <Typography variant="h5" noWrap style={{ paddingLeft: '15px', fontFamily: 'monospace' }}>
            neptune
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >

        <div className={classes.toolbar} />
        {/* <ListRouter /> */}
        <StaticDatePicker dashboardDateChange={props.dashboardDateChange} />

      </Drawer>

    </>

  );
}
