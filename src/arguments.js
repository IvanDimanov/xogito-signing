const argv = require('yargs')
  .example('xogito-signing --user john.doe --password P@22w0rd')

  .options({
    'u': {
      alias: 'user',
      demandOption: true,
      describe: 'User name',
      type: 'string',
    },

    'p': {
      alias: 'password',
      demandOption: true,
      describe: 'User password',
      type: 'string',
    },

    'a': {
      alias: 'action',
      default: 'sign-in',
      describe: 'Singing action',
      choices: ['sign-in', 'sign-out'],
    },
  })

  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')

  .argv;

module.exports = argv;
