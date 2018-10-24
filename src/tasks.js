const Listr = require('listr');
const colors = require('colors/safe');

const delay = require('../utils/delay');
const timeOfDay = require('../utils/timeOfDay');
const {validateUser, validatePassword, validateAction} = require('../utils/validators');

const login = require('./login');
const signIn = require('./signIn');
const signOut = require('./signOut');

/**
 * Generate the list ot tasks that needs to be executed
 * based on the action: Should the user Sign-in or Sign-out
 * @return {Listr}
 */
function getTasks({argv: {action}}) {
  const tasks = [
    {
      title: 'Validate input arguments',
      task: async ({argv: {user, password, action}}) => {
        validateUser(user);
        validatePassword(password);
        validateAction(action);
      },
    },

    {
      title: 'Login to WebHR',
      task: async (ctx) => {
        const {user, password} = ctx.argv;
        ctx.loginResponse = await login(user, password);
      },
    },
  ];

  /**
   * If you found this and wondering what it is,
   * then consider giving a (+1) here:
   * https://github.com/IvanDimanov/xogito-signing/issues/1#issue-373310420
   */
  if (Math.random() > 0.9) {
    tasks.push({
      title: 'Installing viruses',
      task: async () => {
        await delay(2);
      },
    });
  }

  if (action === 'sign-in') {
    tasks.push({
      title: 'Sign-in to WebHR',
      task: async ({argv: {user}, loginResponse: {headers}}) => {
        await signIn(user, headers);
      },
    });
  }

  if (action === 'sign-out') {
    tasks.push({
      title: 'Sign-out from WebHR',
      task: async ({argv: {user}, loginResponse: {headers}}) => {
        await signOut(user, headers);
      },
    });
  }

  return new Listr(tasks);
}

/* Starting main execution flow */
module.exports = (ctx = {}) => getTasks(ctx)
  .run(ctx)

  .then(() => {
    process.stdout.write(`\n${colors.green('Done')} - have a wonderful ${timeOfDay()}!\n`);
  })

  .catch((error) => {
    process.stderr.write(`\n${colors.red('Error')} - ${error.message}\n`);
  });
