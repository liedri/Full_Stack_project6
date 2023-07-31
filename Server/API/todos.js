const { pool } = require('./api');

// ----------- Get ------------------
async function getTodosByUser(id) {
  const result = await pool.query('SELECT * FROM todos WHERE userId = ?',
      [parseInt(id)]);
  return result[0];
}

// ----------- Post ------------------
async function postTodo({ userId, title, completed, isDeleted, createdAt, lastModified}) {
  console.log("------------api detais-----------")
  console.log( parseInt(userId), title, completed, isDeleted, createdAt, lastModified || NULL);
  const result = await pool.query("INSERT INTO todos (userId, title, completed, isDeleted, createdAt, lastModified) VALUES (?, ?, ?, ?, ?, ?)",
      [parseInt(userId), title, completed, isDeleted, createdAt, lastModified || NULL]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updateTodo({id, isCompleted}) {
  const result = await pool.query("UPDATE todos SET completed = ? WHERE id = ?", 
  [isCompleted, parseInt(id)]);

return result[0].affectedRows > 0
}

// ----------- Delete ------------------
async function deleteTodo({id}) {
      const result = await pool.query("DELETE FROM todos WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
  getTodosByUser,
  postTodo,
  updateTodo,
  deleteTodo
}
