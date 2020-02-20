'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description:{
    type:String
  },
  picture: {
    type:String
  }
},
{
  timestamps:{
    createdAt:'creationDate',
    updatedAt:'updateDate'
  }
});

const Post = mongoose.model('Post',  postSchema);

module.exports = Post;
