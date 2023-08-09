const path = require('path');
const { ensureDirSync, removeSync } = require("fs-extra");
const { execSync } = require('child_process');
const { streamlog } = require('../lib/utils.js');

const distPkg = path.resolve('dist');

const tempcwd = `../test_hidden_source/${String(Date.now()).slice(2)}`;
removeSync('../test_hidden_source/')

streamlog(path.resolve(tempcwd));

removeSync(tempcwd);

ensureDirSync(tempcwd);

process.chdir(tempcwd)
execSync(`git init`, {
  stdio: 'inherit',
  shell: true
});

execSync(`npm i ${distPkg}`, {
  stdio: 'inherit',
  shell: true
});
