// Create web server
// npm install express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a comments array
const comments = [
  {
    id: 1,
    username: 'alice',
    content: 'Welcome to the comment section!',
  },
  {
    id: 2,
    username: 'bob',
    content: 'Great post!',
  },
  {
    id: 3,
    username: 'charlie',
    content: 'Nice to meet you!',
  },
];

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(c => c.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: `Comment with id ${id} not found` });
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.status(201).json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(c => c.id === id);
  if (comment) {
    Object.assign(comment, req.body);
    res.json(comment);
  } else {
    res.status(404).json({ message: `Comment with id ${id} not found` });
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.json({ message: `Comment with id ${id} deleted` });
  } else {
    res.status(404).json({ message: `Comment with id ${id} not found` });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
