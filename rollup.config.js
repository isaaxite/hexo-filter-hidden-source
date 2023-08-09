const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');
const commonjs = require('@rollup/plugin-commonjs')

module.exports = {
  input: {
    'bin/index': 'bin/index.js',
    'index': 'index.js'
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    plugins: [terser()]
  },
  plugins: [
    commonjs(),
    copy({
      targets: [
        // { src: 'assets/conf.template.yml', dest: 'dist/assets' },
        { src: ['package.json', 'LICENSE', 'README.md', 'MANUAL.md'], dest: 'dist/' },
      ]
    })
  ]
};
