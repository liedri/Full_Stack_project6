const { pool } = require('./api');

// ----------- Get ------------------
async function getInfoByUser(id) {
  console.log('info/api---------');
  console.log('id: ', id);
  const result = await pool.query('SELECT * FROM users WHERE id = ?',
      [parseInt(id)]);
  return result[0];
}

module.exports = {
    getInfoByUser
}
