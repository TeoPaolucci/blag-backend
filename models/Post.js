'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  title: String,
  body: String
  //TODO: add img url and tags
})

module.exports = postSchema;
