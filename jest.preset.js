const { defaults } = require('jest-config');

module.exports = {
  [...defaults.moduleFileExtensions, 'ts', 'tsx']
};
