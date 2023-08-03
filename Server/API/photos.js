const { pool } = require('./api');

// ----------- Get ------------------
async function getPhotosByAlbum(id) {
  //console.log('api---------');

  const result = await pool.query('SELECT * FROM photos WHERE albumId = ?',
      [parseInt(id)]);
  return result[0];
}


module.exports = {
    getPhotosByAlbum
}
