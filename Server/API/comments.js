const { pool } = require('./api');

// ----------- Get ------------------
async function getCommentsByPost(id) {
  const result = await pool.query('SELECT * FROM comments WHERE postId = ?',
      [parseInt(id)]);
  // console.log('comm api result[0]: ', result[0]);

  return result[0];
}

// ----------- Post ------------------
async function postComment({ postId, username, email, body, isDeleted, createdAt, lastModified}) {
  console.log("------------api detais-----------")
  console.log( parseInt(postId), username, email, body, isDeleted, createdAt, lastModified || NULL);
  const result = await pool.query("INSERT INTO comments (postId, username, email, body, isDeleted, createdAt, lastModified) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [parseInt(postId), username, email, body, isDeleted, createdAt, lastModified || NULL]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updateComment({id, body}) {
  console.log("api/update id: ", id, " body: ", body);
  const result = await pool.query("UPDATE comments SET body = ? WHERE id = ?", 
  [body, parseInt(id)]);

return result[0].affectedRows > 0
}

// ----------- Delete ------------------
async function deleteComment({id}) {
      const result = await pool.query("DELETE FROM comments WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
  getCommentsByPost,
  postComment,
  updateComment,
  deleteComment
}
