const path = require('path');
const prompts = require('prompts');
const { ensureFileSync, writeFileSync, existsSync } = require('fs-extra');
const { SOURCE_DIR_PATH, TEMPLATE, PLACEHOLDER_TITLE, TEMPLATE_FRONTMATTER, PLACEHOLDER_DATE, TEMPLATE_INDEX_NAME } = require('./constants.js');
const {
  getDatestamp,
  hinter,
  hintCreated,
  addSourcename,
  getSourcenames,
  sourcenameIfExist
} = require('./utils.js');

function newSource({ title, dirname }) {
  const hiddenSourceDirPath = path.join(SOURCE_DIR_PATH, dirname);
  const homepagePath = path.join(hiddenSourceDirPath, TEMPLATE_INDEX_NAME);

  if (existsSync(hiddenSourceDirPath)) {
    hinter.info(`[${hiddenSourceDirPath}] is existed!`);
    if (!sourcenameIfExist(dirname)) {
      addSourcename(dirname);
      hinter.info(`Add ${dirname} to sourcenames cache`);
    }
    return;
  }


  ensureFileSync(homepagePath);

  const homeContent = TEMPLATE.replace(PLACEHOLDER_TITLE, title);
  writeFileSync(homepagePath, homeContent);
  addSourcename(dirname);
  hintCreated(homepagePath);
}

async function newPost(argv) {
  const { postname } = argv;
  let source = argv.source;

  if (!source) {
    const sourcenames = getSourcenames();
    if (!sourcenames) {
      return;
    }

    const choices = sourcenames.map((sourcename) => ({
      title: sourcename,
      value: `source/${sourcename}`,
    }));
    source = (await prompts({
      type: 'select',
      name: 'value',
      message: 'Pick source dir',
      choices,
    })).value;
  }

  const indexTemplatePath = path.join(source, TEMPLATE_INDEX_NAME);
  const postfilepath = path.join(source, postname,'index.md');

  if (!existsSync(indexTemplatePath)) {
    hinter.info(`Source not created, expect ${TEMPLATE_INDEX_NAME}`);
    hinter.info(`node ${argv['$0']} new-source -t <source title> -d ${source}`);
    return;
  }

  if (existsSync(postfilepath)) {
    hinter.info(`${postfilepath} already exist!`);
    return;
  }

  const initalContent = TEMPLATE_FRONTMATTER
    .replace(PLACEHOLDER_DATE, getDatestamp())
    .replace(PLACEHOLDER_TITLE, postname);

  ensureFileSync(postfilepath);

  writeFileSync(postfilepath, initalContent);

  hintCreated(postfilepath);
}

module.exports = {
  newSource,
  newPost
};
