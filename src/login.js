const axios = require('axios');

const login = async (user, password) => {
  const formDataBoundary = `----boundary${new Date().getTime()}`;

  const response = await axios({
    method: 'post',
    url: 'https://xogito.webhr.co/hr/login/pages.php',

    headers: {
      'content-type': `multipart/form-data; boundary=${formDataBoundary}`,
    },

    data: `--${formDataBoundary}\r\nContent-Disposition: form-data; name="u"\r\n\r\n${user}\r\n`+
          `--${formDataBoundary}\r\nContent-Disposition: form-data; name="p"\r\n\r\n${password}\r\n`+
          `--${formDataBoundary}\r\nContent-Disposition: form-data; name="page"\r\n\r\nEmployeeLogin\r\n`+
          `--${formDataBoundary}--`,
  });

  /**
   * WebHR sucks and always response with status code 200
   * even when there's an error in the BackEnd.
   * So we need to track if the response has this key 'success' word in it.
   */
  const responseData = String(response.data).trim().toLocaleLowerCase();
  if (responseData !== 'success') {
    throw new Error(response.data);
  }

  return response;
};

module.exports = login;
