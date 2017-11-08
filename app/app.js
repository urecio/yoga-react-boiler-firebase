/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// TODO:
// add rtc and wait for a message to come in from the counsellor
// FIX token not refreshing
// document the generator
// mind that everything is contained within a card (all the content)
// create reset password page (will accept a token on the url, and won't be valid on any other url)
// create verify email page, it should redirect to the welcome page
// create welcome page
// create chat and video container

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

// import opentok (will differ depending on the browser)
const ua = window.navigator.userAgent;
const trident = ua.indexOf('Trident/');
let ieVersion;
if (trident > 0) {
  // IE 11 => return version number
  const rv = ua.indexOf('rv:');
  ieVersion = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
}

if (ieVersion === 11) require('vendor/opentokIE.min.js'); // eslint-disable-line
else require('vendor/opentok.min.js'); // eslint-disable-line

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
// import '!file-loader?name=[name].[ext]!./favicon.ico';
// import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import CSS reset, Global Styles and layouts
import './assets/styles/global';

// Import root routes
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={rootRoute}
      render={
        applyRouterMiddleware(useScroll())
      }
    />
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV !== 'development') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}