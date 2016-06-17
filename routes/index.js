var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('post').select()
  .join("user", function () {
      this.on("post.user_id", "=", "user.id");

    }).then(function(blog) {
      console.log(blog);
      res.render('index', { title: 'Express', blog: blog });
    })

});

router.get('/newuser', function (req, res, next) {
  res.render('newuser');
})

router.post('/newuser', function (req, res, next) {
  knex('user').insert(req.body).then(function () {
    res.redirect('/');
  })
})

router.get('/create', function (req, res, next) {
  knex('user').select().then(function(username) {

    res.render('create', { username: username});
  })

})

module.exports = router;

// .join("comment", function () {
//     this.on("post_id", "=", "post.id");
//
// })
