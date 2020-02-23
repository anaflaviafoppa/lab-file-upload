'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require:true
  },
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    trim: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true
  },
  description:{
    type:String,
    require:true
  }
},
{
  timestamps:{
    createdAt:'creationDate',
    updatedAt:'updateDate'
  }
});

const Comment = mongoose.model('Comment',  commentSchema);

module.exports = Comment;
