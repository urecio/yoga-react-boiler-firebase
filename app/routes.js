// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
/* ignore:true */
import { getAsyncInjectors, redirectToDashboardIfLoggedIn, redirectToLoginIfNotLoggedIn } from 'utils/asyncInjectors';

import NotFoundPage from 'containers/NotFoundPage';
import Login from 'containers/Auth/LoginContainer';
import Dashboard from 'containers/Dashboard';
/* ignore:false */

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer,
          injectSagas,
        } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  let isExecuted = false;

  return [
    {
      path: '/',
      onEnter: (nextState, replace) => redirectToDashboardIfLoggedIn(store, nextState, replace),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Dashboard/reducer'),
          import('containers/Dashboard/sagas'),
          import('containers/Auth/sagas'),
          import('containers/Auth'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          dashboardReducer,
          dashboardSagas,
          authSagas,
          component,
        ]) => {
          if (!isExecuted) {
            isExecuted = true;      // to prevent double saga execution

            injectReducer('dashboard', dashboardReducer.default);
            injectSagas(dashboardSagas.default);
            injectSagas(authSagas.default);
          }

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          onEnter: (nextState, replace) => redirectToDashboardIfLoggedIn(store, nextState, replace),
          path: 'login',
          component: Login,
        },
        {
          onEnter: (nextState, replace) => redirectToLoginIfNotLoggedIn(store, nextState, replace),
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: '*',
          component: NotFoundPage,
        },
      ],
    },
  ];
}
