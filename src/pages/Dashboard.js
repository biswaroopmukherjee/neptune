import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cookie from 'react-cookies';
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
});


// const rows = [
//   { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
//   { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
// ];

// const columns = [
//   { name: 'id', title: 'ID' },
//   { name: 'product', title: 'Product' },
//   { name: 'owner', title: 'Owner' },
// ];

const columns = [
  { name: 'id', title: 'ID' },
  { name: 'name', title: 'Name' },
  { name: 'odpath', title: 'odpath' },
  { name: 'vortexCoolMHz', title: 'vortexCoolMHz' }];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <DataGrid dataRows={this.state.images} dataColumns={columns} />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
