const express = require('express');
const usersApi = require('./users');
const todosApi = require('./todos');
const bodyParser = require('body-parser');
const albumsApi = require('./albums');
const photosApi = require('./photos');
const postsApi = require('./posts');
const commentsApi = require('./comments');
const infoApi = require('./info');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Mount the APIs
app.use('/api/users', usersApi);
app.use('/api/todos', todosApi);
app.use('/api/albums', albumsApi);
app.use('/api/posts', postsApi);
app.use('/api/photos', photosApi);
app.use('/api/info', infoApi);
app.use('/api/comments', commentsApi);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






app.put('/', async (req, res) => {
    console.log('index req.body: ', req.body);
    res.status(200).send();
});
