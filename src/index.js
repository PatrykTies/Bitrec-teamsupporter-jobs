import './style/style.css';
import React from 'react';
// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line no-unused-vars,react/no-deprecated
//   let createClass = React.createClass;
//   Object.defineProperty(React, 'createClass', {
//     set: (nextCreateClass) => {
//       createClass = nextCreateClass;
//     },
//   });
//   // eslint-disable-next-line global-require
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }
/* eslint-disable import/first */
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {pink900,grey400} from 'material-ui/styles/colors'
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin'
import reduxThunk from 'redux-thunk';

import JobseekerParent from "./jobseekerApp/jobseekerParent"

import I18n from "redux-i18n"

import {translations} from "./translations"

const muiTheme = getMuiTheme({
  palette: {
    textColor: pink900,
  },
  raisedButton: {
     primaryColor: '#4b1248',
     primaryTextColor:'#f0c27b'

   },
   textField: {

     hintColor: grey400,
     floatingLabelColor: pink900,
     focusColor: '#4b1248',

   },
});


injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <Route path="/" component={JobseekerParent} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </I18n>
  </Provider>
  , document.getElementById('root'));
