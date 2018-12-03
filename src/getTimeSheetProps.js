/* global PEOPLEWEB, EMPLOYEE_PLANNER_API */
/* These variables are provided via the `page.evaluate()` */
const cheerio = require('cheerio');

const delay = require('../utils/delay')

const {DOMAIN} = require('./constants');

const getFields = async (page) => {
  await page.goto(`${DOMAIN}/Pages/LeftSegment/MyDetails.aspx`, {waitUntil: 'networkidle2'});

  const {Markup, Data} = await page.evaluate(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return PEOPLEWEB.requestHandler.json(
        'Get_Modal_Add_Edit_Timesheet',
        {TimesheetDate: `${today.getFullYear()}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`},
        function() {},
        EMPLOYEE_PLANNER_API,
    );
  });

  const $ = cheerio.load(Markup);
  const fields = [];
  $('input').each((index, element) => {
    fields.push({
      name: $(element).attr('name'),
      value: $(element).val() || '',
    });
  });

  return {
    fields,
    IsPreviousTimesheetCompleted: $('div.breaktimesheet').data('previousdaytimesheet').toLowerCase(),
    IsNextTimesheetCompleted: $('div.breaktimesheet').data('nextdaytimesheet').toLowerCase(),
    breakList: Data.breakList,
  };
};

module.exports = getFields;
