'use strict';

const { readdirSync, writeFileSync, readFileSync, existsSync } = require('fs-extra');
const path = require('path');
const { load } = require('js-yaml');
const { getSourcenames } = require('./utils.js');
const { FENCE, PLACEHOLDER_CONTENT } = require('./constants.js');

function matchFrontmatter(txt) {
  const regexStr = `^${FENCE.start}\n([\\s\\S]*?)\n${FENCE.end}$`;
  const regex = new RegExp(regexStr, 'm');
  const match = regex.exec(txt);
  return match;
}

function genListPageItem(entryDirName) {
  const postDirpath = `source/${entryDirName}`;
  if (!existsSync(postDirpath)) {
    return;
  }

  const dirnames = readdirSync(postDirpath).filter(s => path.parse(s).name !== 'index');
  const postPaths = dirnames.map(s => path.join(postDirpath, s, 'index.md'));
  const metadatas = postPaths.map(postPath => {
    const dirname = path.dirname(postPath);
    const ret = {
      title: dirname,
      dirname: dirname
    };
    const content = readFileSync(postPath, 'utf8');
    const match = matchFrontmatter(content);
    if (match) {
      const frontamtter = load(match[1]);
      ret.title = frontamtter.title || ret.title;
      return ret;
    }
    return ret;
  });

  const template = readFileSync(`source/${entryDirName}/index.template`, 'utf8');
  const listPagecontent = template.replace(
    PLACEHOLDER_CONTENT,
    metadatas.map(({ title, dirname }) => `- [${title}](${entryDirName}/${encodeURI(dirname)})`).join('\n')
  );

  writeFileSync(`source/${entryDirName}/index.md`, listPagecontent);
}

function genListPage() {
  const sourcenames = getSourcenames();

  if (!sourcenames) {
    // console.info('!cache.sourcenames');
    return;
  }

  for (const it of sourcenames) {
    genListPageItem(it);
  }
}

module.exports = {
  genListPage
};
