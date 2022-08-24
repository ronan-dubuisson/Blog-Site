const { default: mongoose } = require('mongoose');

function Db(connectionString) {
  this.connectionString = connectionString;
}

// db schema's
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String,
    required: true,
  },
});

// db models
const Post = mongoose.model('Post', postSchema);

async function openConnection(connectionString) {
  await mongoose.connect(connectionString);
}

async function closeConnection() {
  await mongoose.connection.close();
}

async function addPost(post) {
  await openConnection(this.connectionString);

  await Post.create(post);

  await closeConnection();
}

module.exports = Db;
Db.prototype.addPost = addPost;
