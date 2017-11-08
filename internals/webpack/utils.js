const path = require('path');
const configJSON = require(path.resolve(process.cwd(), `config/${process.env.NODE_ENV || 'development'}.json`));

module.exports = {
  getConfigJSON: () => Object.assign({}, configJSON),
};
