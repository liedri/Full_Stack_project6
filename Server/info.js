const express = require('express');
const info_api = require('./API/info');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
    try {
      console.log(' info server---------');
      console.log('user: ', req.query.userId);
      console.log('req.query: ', req.query);
      const response = await info_api.getInfoByUser(req.query.userId);
      console.log('response: ', response);
      res.status(200).send(response);
    } catch (error) {
      console.error('Error fetching info:', error);
      res.status(400).json({ error: 'Error fetching info' });
      return;
    }
  });

module.exports = router;
