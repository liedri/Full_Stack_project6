const { pool } = require('./api');

// ----------- Get ------------------
async function getUser({username, password}) {
  console.log(username, ", ", password);
  const result = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password]);
  //console.log('api/users/get/result: ', result);
  return result[0];
}

// ----------- Post ------------------
async function postUser({firstName, lastName, email, phone, password, isDeleted, createdAt, lastModified, username}) {
  console.log("------------api detais-----------")
  console.log(firstName, lastName, email, phone, password, isDeleted, createdAt, lastModified, username);
  const result = await pool.query("INSERT INTO users (firstName, lastName, email, phone, password, isDeleted, createdAt, lastModified, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, phone, password, isDeleted, createdAt, lastModified, username]);
  return result[0].insertid;

}

// ----------- Update ------------------
// async function updateTodo({id, isCompleted}) {
//   const result = await pool.query("UPDATE todos SET completed = ? WHERE id = ?", 
//   [isCompleted, parseInt(id)]);

// return result[0].affectedRows > 0
// }

// ----------- Delete ------------------
async function deleteUser({id}) {
      const result = await pool.query("DELETE FROM users WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
  getUser,
  postUser,
  //updateTodo,
  deleteUser
}
