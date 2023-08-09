const path =require('path');
const { spawnSync } = require('child_process');
const argv = process.argv.slice(2);
const cwd = '__test__/temp';
const binPath = path.resolve('bin/index.js');
const cmd = `node ${binPath} ${argv.join(' ')}`;

console.info(cmd);

spawnSync(cmd, {  
  stdio: 'inherit',
  shell: true,
  cwd
});
