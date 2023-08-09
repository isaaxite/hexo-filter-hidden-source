const { addSourcename, streamlog, getSourcenames } = require('../lib/utils.js')

addSourcename(String(Date.now()).slice(2));
addSourcename('xxx');
