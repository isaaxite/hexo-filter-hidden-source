const CACNE_HIDDEN_SOURCE_PATH = '.hidden_source.cache';
const PLACEHOLDER_CONTENT = '%CONTENT%';
const FENCE = {
  start: '---',
  end: '---'
};

const PLACEHOLDER_TITLE = '%TITLE%';
const PLACEHOLDER_DATE = '%DATE%';
const DATESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const TEMPLATE = `${FENCE.start}
title: ${PLACEHOLDER_TITLE}
layout: page
${FENCE.end}

${PLACEHOLDER_CONTENT}
`;

const SOURCE_DIR_PATH = 'source/';

const TEMPLATE_FRONTMATTER = `${FENCE.start}
title: ${PLACEHOLDER_TITLE}
date: ${PLACEHOLDER_DATE}
layout: post
${FENCE.end}

`;

const TEMPLATE_INDEX_NAME = 'index.template';

module.exports = {
  FENCE,
  PLACEHOLDER_CONTENT,
  CACNE_HIDDEN_SOURCE_PATH,
  PLACEHOLDER_TITLE,
  TEMPLATE,
  SOURCE_DIR_PATH,
  TEMPLATE_FRONTMATTER,
  PLACEHOLDER_DATE,
  DATESTAMP_FORMAT,
  TEMPLATE_INDEX_NAME
};
