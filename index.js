module.exports = process.env.GROUP_COV
  ? require('./lib-cov/group.js')
  : require('./lib/group.js');
