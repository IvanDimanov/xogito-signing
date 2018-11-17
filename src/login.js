/* global document */
/* The `document` var is provided via the `page.evaluate()` */

const login = async ({argv: {user, password}, browser, page}) => {
  /* Fill the login form and click "Login" */
  {
    await page.waitForSelector('input#txtEmailId');
    await page.focus('input#txtEmailId');
    await page.keyboard.type(user);

    await page.waitForSelector('input#txtPassword');
    await page.focus('input#txtPassword');
    await page.keyboard.type(password);

    await page.waitForSelector('#btnLogin');
    await page.click('#btnLogin');
  }

  await Promise.race([
    page.waitForSelector('#pWarning'),
    page.waitForSelector('#ucHeader_spnUsername'),
  ]);

  /* Check if login went with any issues */
  try {
    const warningSelector = '#pWarning';
    await page.waitForSelector(warningSelector, {timeout: 3000});

    const {warningMessage, forgotUrl} = await page.evaluate((warningSelector) => {
      const warning = document.querySelector(warningSelector);
      const forgot = document.querySelector('a.linkforgot');

      return {
        warningMessage: warning.textContent.trim(),
        forgotUrl: forgot.href,
      };
    }, warningSelector);

    throw new Error(`${warningMessage}\n${forgotUrl}`);
  } catch (error) {
    /**
     * If the `page.waitForSelector()` made a `TimeoutError`
     * then there are no errors on the page
     * then the user logged-in successfully
     */
    if (error.name !== 'TimeoutError') {
      await browser.close();
      throw error;
    }
  }

  /* Check if we are on the main page */
  try {
    const userNameSelector = '#ucHeader_spnUsername';
    await page.waitForSelector(userNameSelector, {timeout: 3000});
  } catch (error) {
    /**
     * If the `page.waitForSelector()` made a `TimeoutError`
     * then there are no errors on the page
     * then the user logged-in successfully
     */
    if (error.name !== 'TimeoutError') {
      await browser.close();
      throw new Error(`Unable to login - ${error.message}`);
    }
  }
};

module.exports = login;
