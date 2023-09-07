const yargs = require('yargs');
const { newPost, newSource } = require('../lib/main.js');

yargs(process.argv.slice(2))
  .command('new', 'Create a hidden source', (yargs) => {
    const argv = yargs
      .option('title', {
        alias: 't',
        demandOption: true
      })
      .option('dirname', {
        alias: 'd',
        demandOption: true
      })
      .argv;
    newSource(argv);
  })
  .command({
    command: 'new-post <postname>',
    describe: 'Create a post(layout=page) for hidden source',
    builder(yargs) {
      return yargs
        .option('source', {
          alias: 's'
        });
    },
    async handler(argv) {
      await newPost(argv);
    }
  })
  .example([
    ['$0 new -t <source homepage title> -d <dirname>'],
    ['$0 new-post <post name> -s <source path>'],
  ])
  .demandCommand(2)
  .argv;