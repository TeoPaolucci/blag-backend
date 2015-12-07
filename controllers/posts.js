'use strict';

var Post = require('../models').model('Post');

var wrap = function wrap(key, data) {
  return {key: data};
};

module.exports = {
  root: {
    get: function(req, res, next) {
      Post.find().exec()
        .then(function(posts) {
          res.status(200);
          res.json(wrap('list', posts));
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    }
  },
  user: {
    getById: function(req, res, next) {
      Post.find({userID: req.params.id}).exec()
        .then(function(posts) {
          res.status(200);
          res.json(wrap('list', posts));
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    },
    get: function(req, res, next) {
      if(!req.user) {
        var err = new Error("Log in first.");
        return next(err);
      }
      Post.find({userID: {$eq: req.user._id.toString()}}).exec()
        .then(function(posts) {
          res.status(200);
          res.json(wrap('list', posts));
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    },
    post: function(req, res, next) {
      if(!req.user) {
        var err = new Error("Log in first.");
        return next(err);
      }
      var body = req.body;
      body.userID = req.user._id.toString();
      body.username = req.user.userName;
      Post.create(body)
        .then(function(newpost) {
          res.status(201);
          res.json(newpost);
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    }
  },
  article: {
    get: function(req, res, next) {
      Post.findById(req.params.id).exec()
        .then(function(post) {
          res.status(200);
          res.json(post);
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    },
    patch: function(req, res, next) {
      Post.findById(req.params.id).exec()
        .then(function(post) {
          if(post.userID !== req.user._id.toString()) {
            var err = new Error('This post does not belong to you.');
            return next(err);
          }
          var body = req.body;
          body.userID = req.user._id.toString();
          body.username = req.user.userName;
          Post.update({_id: {$eq: req.params.id}}, body)
            .then(function() {
              Post.findById(req.params.id).exec()
                .then(function(newpost) {
                  res.status(200);
                  res.json(newpost);
                })
              ;
            })
          ;
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    },
    del: function(req, res, next) {
      Post.findById(req.params.id).exec()
        .then(function(post) {
          if(post.userID !== req.user._id.toString()) {
            var err = new Error('This post does not belong to you.');
            return next(err);
          }
          Post.remove({_id: {$eq: req.params.id}})
            .then(function() {
              res.sendStatus(200);
            })
          ;
        })
        .catch(function(err) {
          return next(err);
        })
      ;
    },
  }
};
