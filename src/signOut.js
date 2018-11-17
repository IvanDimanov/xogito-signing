/* global document */
/* The `document` var is provided via the `page.evaluate()` */

const delay = require('../utils/delay');

const {DOMAIN, TIME_SLOTS_DELAY, MODAL_OPEN_ANIMATION_DELAY} = require('./constants');

const signOut = async ({argv: {user, password}, browser, page}) => {
  await page.goto(`${DOMAIN}/Pages/LeftSegment/MyDetails.aspx`, {waitUntil: 'networkidle2'});

  const now = new Date();
  const todayTimeSheetSelector = `[data-date="${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}"]`;

  /* Open the today's Time sheet modal */
  await delay(TIME_SLOTS_DELAY); // The time sheet page takes some time to load all time slots
  await page.waitForSelector(todayTimeSheetSelector);
  await page.click(todayTimeSheetSelector);
  await delay(MODAL_OPEN_ANIMATION_DELAY); // Wait for animation

  /* Fill out Hours */
  const outHoursSelector = 'input#txtTimeOutHH1';
  await page.waitForSelector(outHoursSelector);
  await page.evaluate((outHoursSelector) => {
    document.querySelector(outHoursSelector).value = new Date().getHours();
  }, outHoursSelector);

  /* Fill out Minutes */
  const outMinutesSelector = 'input#txtTimeOutMM1';
  await page.waitForSelector(outMinutesSelector);
  await page.evaluate((outMinutesSelector) => {
    document.querySelector(outMinutesSelector).value = new Date().getMinutes();
  }, outMinutesSelector);

  /* Submit form */
  await page.waitForSelector('#aSave');
  await page.click('#aSave');

  /* Check if login went with any issues */
  try {
    const errorSelector = '#errorinline';
    await page.waitForSelector(errorSelector, {timeout: 3000});

    const errorMessage = await page.evaluate((errorSelector) => {
      const error = document.querySelector(errorSelector);
      return error.textContent.trim();
    }, errorSelector);

    throw new Error(errorMessage);
  } catch (error) {
    /**
     * If the `page.waitForSelector()` made a `TimeoutError`
     * then there are no errors on the page
     */
    if (error.name !== 'TimeoutError') {
      await browser.close();
      throw error;
    }
  }
};

module.exports = signOut;
