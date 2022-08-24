const express = require('express');
const bodyParser = require('body-parser');
require('ejs');
const _ = require('lodash');

// eslint-disable-next-line import/no-dynamic-require
const Database = require(`${__dirname}/db.js`);
const dbConnectionString = 'mongodb://localhost:27017/blogDb';
const db = new Database(dbConnectionString);

const shortPostContentLength = 100;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.getPosts().then((posts) => {
    res.render('home', {
      posts,
    });
  });
});

app.get('/posts/:post', (req, res) => {
  /* posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.post)) {
      console.log('Match found!');
      res.render('post', {
        post,
      });
    }
  }); */
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.postMessage;
  const shortContent = `${req.body.postMessage.substring(0, shortPostContentLength).trim()}...`;

  const post = {
    title,
    content,
    shortContent,
  };

  db.addPost(post).then(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log(`${new Date()}: Server started on port 3000`);
});
