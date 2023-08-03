const express = require('express');
const photos_api = require('./API/photos');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    // console.log(' post server---------');
    // console.log('user: ', req.query.userId);
    console.log('photos/server/req.query: ', req.query);
    const response = await photos_api.getPhotosByAlbum(req.query.albumId, req.query._limit, req.query._start);
    //console.log('response: ', response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(400).json({ error: 'Error fetching photos' });
    return;
  }
});


module.exports = router;
