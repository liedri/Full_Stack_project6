const express = require('express');
const posts_api = require('./API/posts');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    // console.log(' post server---------');
    // console.log('user: ', req.query.userId);
    // console.log('req.query: ', req.query);
    const response = await posts_api.getPostsByUser(req.query.userId);
    //console.log('response: ', response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    console.log('server posts------------')
    console.log('req.query: ', req.query);
    const userId = req.query.userId;
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await posts_api.postPost(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Update ------------------
router.put('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, body } = req.body;
    console.log('req.body: ', req.body);
    console.log('server/update/details: ', postId, title, body);
    const response = await posts_api.updatePost(postId, title, body);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('delete server-' , req.params)
    const response = await posts_api.deletePost(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

module.exports = router;
