var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/posts');

// root routes, directed towards all posts
router.get('/', postCtrl.root.get);

// user route, finds all posts from specified/current user or new post for the current user
router.get('/user/:id', postCtrl.user.getById);
router.route('/user')
  .get(postCtrl.user.get)
  .post(postCtrl.user.post)
;

// article routes, directed towards a single post, patch & delete only work on posts the current user owns.
router.route('/article/:id')
  .get(postCtrl.article.get)
  .patch(postCtrl.article.patch)
  .delete(postCtrl.article.del)
;

module.exports = router;
