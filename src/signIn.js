/* global PEOPLEWEB, EMPLOYEE_PLANNER_API */
/* These variables are provided via the `page.evaluate()` */

const getTimeSheetProps = require('./getTimeSheetProps');
const setField = require('../utils/setField');

const signIn = async ({browser, page}) => {
  const props = await getTimeSheetProps(page);

  /* Set the time when the user signed-in */
  const now = new Date();
  setField(props, 'txtTimeInHH1', now.getHours());
  setField(props, 'txtTimeInMM1', now.getMinutes());

  /* Attempt to save the time sheet */
  const {Status} = await page.evaluate(({fields, IsPreviousTimesheetCompleted, IsNextTimesheetCompleted}) => {
    return PEOPLEWEB.requestHandler.json('Save_BreakTimesheet', {
      Form: JSON.stringify(fields),
      IsPreviousTimesheetCompleted,
      IsNextTimesheetCompleted,
      ServerTime: '',
    }, function() {},
    EMPLOYEE_PLANNER_API);
  }, props);

  if (Status) {
    throw new Error('Unable to Sign-in');
  }
};

module.exports = signIn;
