import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#eb7125'
    },
    positive: {
      main: '#27AE60'
    },
    negative: {
      main: '#EB5757'
    },
    neutral: {
      main: '#2F80ED'
    }
  },
  background: {
    light: {
      main: '#F5F5F5'
    }
  }
})


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,

document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
