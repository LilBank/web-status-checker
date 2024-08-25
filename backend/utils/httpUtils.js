const axios = require('axios');

const getResponseCode = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    return { url, status: response.status };
  } catch (error) {
    if (error.response) {
      return { url, status: error.response.status };
    } else if (error.code === 'ECONNABORTED') {
      return { url, status: 'timeout' };
    } else {
      return { url, status: 'invalid URL or other error' };
    }
  }
};

module.exports = { getResponseCode };
