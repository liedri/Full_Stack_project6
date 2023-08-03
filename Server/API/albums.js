const { pool } = require('./api');

// ----------- Get ------------------
async function getAlbumsByUser(id) {
  //console.log('api---------');

  const result = await pool.query('SELECT * FROM albums WHERE userId = ?',
      [parseInt(id)]);
  return result[0];
}


module.exports = {
    getAlbumsByUser
}
