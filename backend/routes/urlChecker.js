const express = require('express');
const asyncHandler = require('express-async-handler');
const { getResponseCode } = require('../utils/httpUtils');

const router = express.Router();

router.post('/check-urls', asyncHandler(async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls)) {
    return res.status(400).json({ error: 'URLs should be an array' });
  }

  if (!urls.length) {
    return res.status(400).json({ error: 'An array is empty' });
  }

  const results = await Promise.all(urls.map(getResponseCode));

  const total = results.length;
  const up = results.filter(result => result.status === 200).length;
  const down = results.filter(result => result.status === 'timeout' || result.status === 'invalid URL or other error' || result.status === 404).length;

  const response = {
    webStatus: results,
    up,
    down,
    total
  };

  res.json(response);
}));

module.exports = router;
