const axios = require('axios');

const errorResponse = '<script>window.location.href="../login/?action=logout";</script>';

const signIn = async (user, headers = {}) => {
  const cookie = Array.isArray(headers['set-cookie']) ? headers['set-cookie'].join('; ') : '';
  const isoDate = new Date().toISOString();
  const formattedDate = isoDate.split('T')[0];

  const response = await axios({
    method: 'get',
    url: 'https://xogito.webhr.co/hr/pages',

    headers: {
      cookie,
    },

    params: {
      page: 'Timesheet',
      type: 'Attendance',
      type2: 'ManualAttendance',
      at: 0,
      dt: formattedDate,
      u: user,
    },
  });

  /**
   * WebHR sucks and always response with status code 200
   * even when there's an error in the BackEnd.
   * So we need to track if the response has this key 'errorResponse' word in it.
   */
  const responseData = String(response.data).trim().toLocaleLowerCase();
  if (responseData === errorResponse) {
    throw new Error('Sorry, unable to sign-in');
  }

  return response;
};

module.exports = signIn;
