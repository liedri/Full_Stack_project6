const { pool } = require('./api');

// ----------- Get ------------------
async function getPostsByUser(id) {
  //console.log('api---------');

  const result = await pool.query('SELECT * FROM posts WHERE userId = ?',
      [parseInt(id)]);
  return result[0];
}

// ----------- Post ------------------
async function postPost({ userId, title, body, isDeleted, createdAt, lastModified}) {
  console.log("------------api detais-----------")
  console.log( parseInt(userId), title, body, isDeleted, createdAt, lastModified || NULL);
  const result = await pool.query("INSERT INTO posts (userId, title, body, isDeleted, createdAt, lastModified) VALUES (?, ?, ?, ?, ?, ?)",
      [parseInt(userId), title, body, isDeleted, createdAt, lastModified || NULL]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updatePost(id, title, body) {
  console.log('api/update/details: ', id, title, body);
  const result = await pool.query("UPDATE posts SET title = ?, body = ? WHERE id = ?", 
    [title, body, parseInt(id)]
  );

  return result[0].affectedRows > 0;
}

// ----------- Delete ------------------
async function deletePost({id}) {
      const result = await pool.query("DELETE FROM posts WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    getPostsByUser,
    postPost,
    updatePost,
    deletePost
}
