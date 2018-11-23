/* global PEOPLEWEB, EMPLOYEE_PLANNER_API */
/* These variables are provided via the `page.evaluate()` */

const getTimeSheetProps = require('./getTimeSheetProps');
const setField = require('../utils/setField');

const signOut = async ({browser, page}) => {
  const props = await getTimeSheetProps(page);

  /* Set the time when the user signed-out */
  const now = new Date();
  setField(props, 'txtTimeOutHH1', now.getHours());
  setField(props, 'txtTimeOutMM1', now.getMinutes());

  /* Keep the time when the user signed-in */
  const timeIn = (props.breakList[0] || '').split(':');
  setField(props, 'txtTimeInHH1', timeIn[0]);
  setField(props, 'txtTimeInMM1', timeIn[1]);

  /* Calculate to total time worked */
  const dateSignedIn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeIn[0], timeIn[1], 0);
  const todayTotalMilliseconds = now.getTime() - dateSignedIn.getTime();
  const hdftodayTotalTime = Math.ceil(todayTotalMilliseconds / (60 * 1000));
  setField(props, 'hdftodayTotalTime', hdftodayTotalTime);

  const hdfthisWeekTotalTime = props.fields.find(({name}) => name === 'hdfthisWeekTotalTime') || {};
  hdfthisWeekTotalTime.value = parseInt(hdfthisWeekTotalTime.value, 10) + hdftodayTotalTime;

  const hdfthisMonthTotalTime = props.fields.find(({name}) => name === 'hdfthisMonthTotalTime') || {};
  hdfthisMonthTotalTime.value = parseInt(hdfthisMonthTotalTime.value, 10) + hdftodayTotalTime;

  /* Attempt to save the time sheet */
  const {Status} = await page.evaluate(({fields, IsPreviousTimesheetCompleted, IsNextTimesheetCompleted}) => {
    return PEOPLEWEB.requestHandler.json('Save_BreakTimesheet', {
      Form: JSON.stringify(fields),
      IsPreviousTimesheetCompleted,
      IsNextTimesheetCompleted,
    }, function() {},
    EMPLOYEE_PLANNER_API);
  }, props);

  if (Status) {
    throw new Error('Unable to Sign-out');
  }
};

module.exports = signOut;
