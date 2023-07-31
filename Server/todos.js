const express = require('express');
const todos_api = require('./API/todos');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    const response = await todos_api.getTodosByUser(req.query.userId);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(400).json({ error: 'Error fetching todos' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    const userId = req.query.userId;
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await todos_api.postTodo(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(400).json({ error: 'Error fetching todos' });
    return;
  }
});

// ----------- Update ------------------
router.put('/update/:id', async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const details = {...req.params, ...req.body};
    console.log(details);
    const response = await todos_api.updateTodo(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(400).json({ error: 'Error fetching todos' });
    return;
  }
});

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('delete server-' , req.params)
    const response = await todos_api.deleteTodo(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(400).json({ error: 'Error fetching todos' });
    return;
  }
});

module.exports = router;
