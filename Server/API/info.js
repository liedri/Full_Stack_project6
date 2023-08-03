const { pool } = require('./api');

// ----------- Get ------------------
async function getInfoByUser(id) {
  console.log('info/api---------');
  const result = await pool.query('SELECT * FROM users WHERE userId = ?',
      [parseInt(id)]);
  return result[0];
}

module.exports = {
    getInfoByUser
}
