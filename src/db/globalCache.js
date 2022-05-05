const NodeCache = require('node-cache');

const globalCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = { globalCache };
