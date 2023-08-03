const express = require('express');
const albums_api = require('./API/albums');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    // console.log(' post server---------');
    // console.log('user: ', req.query.userId);
    // console.log('req.query: ', req.query);
    const response = await albums_api.getAlbumsByUser(req.query.userId);
    //console.log('response: ', response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(400).json({ error: 'Error fetching albums' });
    return;
  }
});


module.exports = router;
