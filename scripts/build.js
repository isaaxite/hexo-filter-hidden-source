const { spawnSync } = require('child_process');
const { streamlog } = require('../lib/utils.js');

let cmd = `rm -rf dist && npx rollup -c rollup.config.js`;

streamlog(cmd);

spawnSync(cmd, {
  stdio: 'inherit',
  shell: true
});

cmd = [
  `sed -i '1i#!/usr/bin/env node' dist/bin/index.js`,
  `sed -i '1i/* global hexo */' dist/index.js`,
].join(' && ');

streamlog('\n' + cmd);

spawnSync(cmd, {
  stdio: 'inherit',
  shell: true
});
