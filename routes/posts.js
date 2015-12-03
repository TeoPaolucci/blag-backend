var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/posts');

// root routes, directed towards current user
router.route('/')
  .get(postCtrl.root.get)
  .post(postCtrl.root.post)
;

// user route, get only, finds all posts from specified user
router.get('/user/:id', postCtrl.user.get)

// article routes, directed towards a single post, patch & delete only work on posts the current user owns.
router.route('/article/:id')
  .get(postCtrl.article.get)
  .patch(postCtrl.article.patch)
  .delete(postCtrl.article.del)
;

module.exports = router;
