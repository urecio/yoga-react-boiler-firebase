/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');
const trimTemplateFile = require('../utils/trimTemplateFile');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'list',
    name: 'component',
    message: 'Select a base component:',
    default: 'PureComponent',
    choices: () => ['PureComponent', 'Component'],
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tuple for this container?',
  },
  {
    type: 'confirm',
    name: 'wantAsyncRequests',
    default: true,
    message: 'Do you want to create async requests to your api?',
  },
  {
    when: (answers) => answers.wantAsyncRequests,
    type: 'input',
    name: 'asyncRequests',
    validate: (answer) => /^[(a-z|A-Z|0-9)]+(,[$1]+)*$/g.test(answer) || 'Incorrect format',
    message: 'Enter a comma separated list of names (will be used on constants and actions)',
  },
  {
    when: (answers) => answers.wantAsyncRequests,
    type: 'input',
    name: 'asyncRequestsApiRoute',
    validate: (answer, answers) => (
      /^[($|{|}|a-z|A-Z|0-9|/|.|_)]+(,[$1]+)*$/g.test(answer)
      && answers.asyncRequests.split(',').length === answer.split(',').length
    ) || 'Incorrect format',
    message: 'In the same order as above, enter the API path for the requests',
  },
  {
    when: (answers) => answers.wantAsyncRequests,
    type: 'input',
    name: 'asyncRequestsApiRequestMethods',
    validate: (answer, answers) => (/^[a-z|A-Z|0-9]+(,[a-z|A-Z|0-9]+)*$/g.test(answer)
      && answers.asyncRequests.split(',').length === answer.split(',').length
    ) || 'Incorrect format',
    message: 'In the same order as above, enter the METHOD for the requests',
  },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      /* eslint-disable no-param-reassign */
      if (data.wantAsyncRequests) {
        const asyncRequestsArr = data.asyncRequests.split(',');
        const asyncRequestsApiRouteArr = data.asyncRequestsApiRoute.split(',');
        const asyncRequestsApiRequestMethodsArr = data.asyncRequestsApiRequestMethods.split(',');
        data.getAsyncRequests = [];
        data.postAsyncRequests = [];
        data.putAsyncRequests = [];

        const asyncRequestFactory = (index) => ({
          name: asyncRequestsArr[index],
          route: asyncRequestsApiRouteArr[index],
          method: asyncRequestsApiRequestMethodsArr[index],
        });

        // Maps the async requests so that the templates can use them
        data.asyncRequests = asyncRequestsArr.map((name, index) => {
          const asyncRequest = asyncRequestFactory(index);

          // will push to a collection called data.get|put|post+AsyncRequests
          data[`${asyncRequestsApiRequestMethodsArr[index]}AsyncRequests`].push(asyncRequest);
          return asyncRequest;
        });
      }
      /* eslint-disable no-param-reassign */

      // Actions
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });

      // Sagas
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/sagas.js',
        templateFile: './container/sagas.js.hbs',
        abortOnFail: true,
      });

      ['get', 'post', 'put'].forEach((method) => {
        if (data[`${method}AsyncRequests`].length > 0) {
          actions.push({
            type: 'modify',
            path: '../../app/utils/Api.js',
            pattern: /(export\s{)/g,
            template: trimTemplateFile('container', `${method}.js.hbs`),
          });
        }
      });

      actions.push({
        type: 'modify',
        path: '../../app/utils/Api.js',
        pattern: /(export\s{)/g,
        template: trimTemplateFile('container', 'apiexports.js.hbs'),
      });

      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/{{ properCase name }}Component.js',
        templateFile: './container/indexcomponent.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
