import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ListRouter from './ListRouter';
import StaticDatePicker from './StaticDatePicker.js';

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

}));

export default function SideBar(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} borderBottom={1}>
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap>
            Neptune
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
