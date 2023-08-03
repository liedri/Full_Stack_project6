const { pool } = require('./api');

// ----------- Get ------------------
async function getPhotosByAlbum(id, _limit, _start) {
  //console.log('api---------');
  console.log("photos/api/params: ", id, _limit, _start);
  const result = await pool.query('SELECT * FROM photos WHERE albumId = ? limit ? offset ?',
      [parseInt(id), parseInt(_limit), parseInt(_start)]);
  return result[0];
}


module.exports = {
    getPhotosByAlbum
}
