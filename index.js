/* global hexo */

'use strict';

const { genListPage } = require('./lib/filter.js');

hexo.extend.filter.register('after_init', function(){
  genListPage.call(this);
});
