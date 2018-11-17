const Listr = require('listr');
const puppeteer = require('puppeteer');
const colors = require('colors/safe');

const delay = require('../utils/delay');
const timeOfDay = require('../utils/timeOfDay');
const {validateUser, validatePassword, validateAction} = require('../utils/validators');

const {DOMAIN} = require('./constants');

const login = require('./login');
const signIn = require('./signIn');
const signOut = require('./signOut');

/* It is in this scope so we can `browser.close()` at any time */
let browser;

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
      title: 'Login to PeopleHR',
      task: async (ctx) => {
        ctx.browser = await puppeteer.launch();
        ctx.page = await ctx.browser.newPage();
        await ctx.page.goto(DOMAIN, {waitUntil: 'networkidle2'});

        /* Expose globally so we can `browser.close()` at any time */
        browser = ctx.browser;
        await login(ctx);
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
      title: 'Sign-in to PeopleHR',
      task: signIn,
    });
  }

  if (action === 'sign-out') {
    tasks.push({
      title: 'Sign-out from PeopleHR',
      task: signOut,
    });
  }

  return new Listr(tasks);
}

/* Starting main execution flow */
module.exports = (ctx = {}) => getTasks(ctx)
  .run(ctx)

  .then(() => {
    process.stdout.write(`\n${colors.green('Done')} - have a wonderful ${timeOfDay()}!\n`);
    browser.close();
  })

  .catch((error) => {
    process.stderr.write(`\n${colors.red('Error')} - ${error.message}\n`);
    browser.close();
  });
