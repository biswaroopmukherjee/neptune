import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { signedin: false, loaded: false };
  // }

  // async componentDidMount() {
  //   const apitoken = cookie.load('breadboardapitoken');
  //   try {
  //     const res = await axios.get('https://fermi3.com', {
  //       headers: { Authorization: `Token ${apitoken}` },
  //     });
  //     if (res.status === 200) {
  //       this.setState({ signedIn: true, loaded: true });
  //       if (window.location.href !== `${window.location.origin}/dashboard`) { window.location.href = `${window.location.origin}/dashboard`; }
  //     } else {
  //       this.reSignIn();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.reSignIn();
  //   }
  //   console.log(this.state);
  // }

  // reSignIn() {
  //   this.setState({ signedIn: false, loaded: true });
  //   cookie.remove('breadboardapitoken', { path: '/' });
  //   if (window.location.href !== `${window.location.origin}/`) { window.location.href = `${window.location.origin}/`; }
  // }

  // loading() {
  //   return (
  //     <div className="App">
  //       <ThemeProvider theme={theme}>
  //         <CssBaseline />
  //         Loading
  //       </ThemeProvider>
  //     </div>
  //   );
  // }


  // renderLoaded() {
  //   return (
  //     <div className="App">
  //       <ThemeProvider theme={theme}>
  //         <CssBaseline />

  //         <Router>
  //           <Switch>
  //             <Route exact path="/">
  //               <SignIn />
  //             </Route>
  //             <Route exact path="/dashboard">
  //               <ClippedDrawer />
  //             </Route>
  //           </Switch>

  //         </Router>

  //       </ThemeProvider>
  //     </div>
  //   );
  // }

  // render() {
  //   if (this.state.loaded) {
  //     return this.renderLoaded();
  //   }
  //   return this.loading();
  // }
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router>
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>

          </Router>

        </ThemeProvider>
      </div>
    );
  }
}

export default App;
