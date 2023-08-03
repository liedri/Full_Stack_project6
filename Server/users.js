const express = require('express');
const users_api = require('./API/users');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    //console.log("users/server -------: ");
    const { username, password } = req.query;
    //console.log('user log:', req.query, " ", username, " ", password);
    const userId = await users_api.getUserId(username); //get id from users
    //console.log("userId", userId[0].id);
    const checkUser = await users_api.getUserPassword(userId[0].id); //get password from address
    //console.log("userId: ", userId);
    //console.log("checkUser: ", checkUser[0].lat.slice(-4));
    if (userId)
    {
      //console.log("first if");
      if (checkUser[0].lat.slice(-4) === password){
        //console.log("second if");
        const response = await users_api.getUserId(username);
        //console.log(response);
        res.status(200).send(response);
        return;
      }
    }
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});
/*
// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    //console.log('req.query: ', req.query);
    const userId = req.query.userId;
    //console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await users_api.postUser(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

// ----------- Update ------------------
// router.put('/update/:id', async (req, res) => {
//   try {
//     console.log('req.body: ', req.body);
//     const details = {...req.params, ...req.body};
//     console.log(details);
//     const response = await users_api.updateTodo(details);
//     res.status(200).send(response);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(400).json({ error: 'Error fetching users' });
//     return;
//   }
// });

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    //console.log('delete server-' , req.params)
    const response = await users_api.deleteUser(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});
*/
module.exports = router;
