const { readJSONSync, existsSync, writeFileSync } = require('fs-extra');
const { CACNE_HIDDEN_SOURCE_PATH } = require('./constants.js');
const dayjs = require("dayjs");
const { DATESTAMP_FORMAT } = require("./constants.js");
const { logger } = require('hexo-log');
const chalk = require("chalk");
const hinter = logger();

function streamlog(text) {
  process.stderr.write(text + '\n');
}

function getHiddenSourceCache() {
  let ret = null;
  if (!existsSync(CACNE_HIDDEN_SOURCE_PATH)) {
    return ret;
  }

  ret = readJSONSync(CACNE_HIDDEN_SOURCE_PATH);

  return ret;
}

/**
 * @returns {string[]|null}
 */
function getSourcenames() {
  const cache = getHiddenSourceCache();
  return cache?.sourcenames || null;
}

/**
 * @param {string} item 
 * @returns {void}
 */
function addSourcename(item) {
  const cache = getHiddenSourceCache();
  if (!cache) {
    writeFileSync(CACNE_HIDDEN_SOURCE_PATH, JSON.stringify({
      sourcenames: [item]
    }, null, 2));
    return;
  }

  cache.sourcenames = Array.from(new Set([...cache.sourcenames, item]));

  writeFileSync(CACNE_HIDDEN_SOURCE_PATH, JSON.stringify(cache, null, 2));
}

function getDatestamp() {
  return dayjs().format(DATESTAMP_FORMAT);
}

module.exports = {
  streamlog,
  getSourcenames,
  addSourcename,
  getDatestamp,
  hinter,
  /**
   * 
   * @param {string} text 
   */
  hintCreated(text) {
    hinter.info(`Created: ${chalk.magentaBright(text)}`);
  }
};
