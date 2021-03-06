/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

import SideBar from '../components/SideBar';
import DataGrid from '../components/DataGrid';
import DataChart from '../components/DataChart';
import logo from '../logo.svg';


const drawerWidth = 240;

const API = 'https://fermi3.com/images/';
const apitoken = cookie.load('breadboardapitoken');

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


const columns = [
  { name: 'id', title: '#' },
  { name: 'name', title: 'Name' },
  { name: 'notes', title: 'Notes' },
  { name: 'saddleSqueezeTime', title: 'saddleSqueezeTime' },
  { name: 'vortexCoolMHz', title: 'vortexCoolMHz' }];

const defaultColumnWidths = [
  { columnName: 'id', width: 110, editingEnabled: false },
  { columnName: 'name', width: 280, editingEnabled: false },
  { columnName: 'notes', width: 180, editingEnabled: true },
  { columnName: 'saddleSqueezeTime', width: 150, editingEnabled: false },
  { columnName: 'vortexCoolMHz', width: 150, editingEnabled: false }];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      images: [],
      currentImage: [],
      cursor: {},
    };
  }

  async componentDidMount() {
    try {
      const startDate = new Date('January 13 2020');
      const images = await this.loadImages(startDate);
      console.log(images);
      const currentImage = await images[0]; 

      this.setState({
        images,
        currentImage,
        startDate,
      });
    } catch (e) {
      console.log(e);
    }
  }

  setCurrentImageSrc() {
    if (this.state.currentImage) {
      return this.state.currentImage.odpath;
    }
    console.log(logo)
    return logo;
  }

  async dashboardDateChange(date) {
    try {
      const images = await this.loadImages(date);
      const currentImage = await images ? images[0] : { odpath: null };
      console.log(currentImage);

      this.setState({
        images,
        currentImage,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleRowClick(image) {
    this.setState({ currentImage: image });
  }


  async loadImages(date) {
    try {
      let startTime = new Date();
      let endTime = new Date();
      startTime.setTime(date.getTime());
      endTime.setTime(date.getTime());
      startTime.setHours(0, 0, 0, 0);
      endTime.setHours(23, 59, 57, 0);
      startTime = new Date(startTime.getTime() - startTime.getTimezoneOffset() * 60000);
      endTime = new Date(endTime.getTime() - endTime.getTimezoneOffset() * 60000);


      const CONFIG = {
        headers: { Authorization: `Token ${apitoken}` },
        params: {
          start_datetime: startTime.toISOString(),
          end_datetime: endTime.toISOString(),
          lab: 'fermi3',
        },
      };

      console.log(CONFIG);
      const res = await axios.get(API, CONFIG);
      console.log(res.status);
      console.log(res.data);
      const images = await res.data.results.filter((image) => image.odpath && image.run);
      images.forEach((image, index) => {
        const keys = Object.keys(image.run.parameters);
        for (const key of keys) {
          image[key] = image.run.parameters[key];
        }
        image.breadboardId = image.id;
        image.id = index;
      });
      return images;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async editNotes(image) {
    try {
      const URL = `https://fermi3.com/images/${image.breadboardId}/`;
      const CONFIG = {
        headers: {
          Authorization: `Token ${apitoken}`,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        notes: image.notes,
        name: image.name,
      };

      console.log(URL);
      console.log(CONFIG);
      console.log(data);
      const response = await axios.put(URL, data, CONFIG);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  updateCursor=(e) =>{
    const newcursor = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    console.log(newcursor);
    this.setState({ cursor: newcursor });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <SideBar dashboardDateChange={(d) => { this.dashboardDateChange(d); }} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Container> */}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DataGrid
                dataRows={this.state.images}
                dataColumns={columns}
                defaultColumnWidths={defaultColumnWidths}
                setCurrentImage={this.handleRowClick}
                setRows={(images) => { this.setState({ images }); }}
                editNotes={(i) => { this.editNotes(i); }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item>
                    <Paper className={classes.paper} id='odimageParent'>
                    <img
                      id='odimage'
                      src={this.setCurrentImageSrc()}
                      alt="odimage"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onMouseDown={this.updateCursor}
                    />
                  </Paper>
                </Grid>
                {/* <Grid item>
                  <Paper className={classes.paper}>
                    <DataChart />
                  </Paper>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {/* </Container> */}

        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
