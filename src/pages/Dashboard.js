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


const drawerWidth = 240;

const API = 'https://fermi3.com/images';
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
  { name: 'name', title: 'Name' },
  { name: 'saddleSqueezeTime', title: 'saddleSqueezeTime' },
  { name: 'vortexCoolMHz', title: 'vortexCoolMHz' }];

const defaultColumnWidths = [
  { columnName: 'name', width: 280 },
  { columnName: 'saddleSqueezeTime', width: 180 },
  { columnName: 'vortexCoolMHz', width: 180 }];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      images: [],
      current_image: [],
    };
  }

  async componentDidMount() {
    try {
      const startDate = new Date('January 13 2020');
      const images = await this.loadImages(startDate);
      console.log(images);
      const current_image = await images[0];

      this.setState({
        images,
        current_image,
        startDate,
      });
    } catch (e) {
      console.log(e);
    }
  }


  async loadImages(date) {
    try {
      let startTime = new Date();
      let endTime = new Date();
      startTime.setTime(date.getTime());
      endTime.setTime(date.getTime());
      startTime.setHours(0, 0, 0, 0);
      endTime.setHours(23, 59, 59, 0);
      startTime = new Date(startTime.getTime() - startTime.getTimezoneOffset() * 60000);
      endTime = new Date(endTime.getTime() - endTime.getTimezoneOffset() * 60000);

      const apitoken = cookie.load('breadboardapitoken');
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
      images.forEach((image) => {
        for (const key in image.run.parameters) {
          image[key] = image.run.parameters[key];
        }
      });
      return images;
    } catch (e) {
      console.log(e);
    }
  }

  handleClick(e) {
    console.log(e);
    this.setState({ current_image: e });
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Container> */}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DataGrid
                dataRows={this.state.images}
                dataColumns={columns}
                defaultColumnWidths={defaultColumnWidths}
                setCurrentImage={this.handleClick}
              />
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img
                  src={this.state.current_image.odpath}
                  alt="odimage"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Paper>
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
