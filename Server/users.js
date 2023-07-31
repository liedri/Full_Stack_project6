const express = require('express');
const users_api = require('./API/users');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    const { username, password } = req.query;
    console.log('user log:', { username, password });
    const response = await users_api.getUser({ username, password });
    res.status(200).send(response);
    console.log(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

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

module.exports = router;
