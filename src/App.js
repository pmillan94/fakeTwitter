import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import jwtDecode from 'jwt-decode';
//redux stuff
import { Provider } from 'react-redux';
import store from './Redux/store';
import { SET_AUTHENTICATED } from './Redux/types';
import { logoutUser, getUserData } from './Redux/actions/userActions';

//Components
import Navbar from './Components/Layout/Navbar';
import themeObject from './Util/theme';
import AuthRoute from './Util/AuthRoute';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import home from './Pages/home';
import Login from './Pages/login';
import signup from './Pages/signup';
import user from './Pages/user';

import axios from 'axios';


// axios.defaults.baseURL =
//   'https://us-central1-testproject-ce760.cloudfunctions.net/api';

//Create theme and colors for entire website
const theme = createMuiTheme(themeObject);

//create func to handle token
const token = localStorage.FBIdToken;
//if we dont have a token, then the following code will not run
if (token) {
  //create var to decode token
  const decodedToken = jwtDecode(token);
  //if token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    //if token exp logout
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    //if token is good let in
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
