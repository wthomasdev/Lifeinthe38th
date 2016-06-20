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

router.post('/create', function (req, res, next) {
  console.log(req.body);
  knex('post').insert(req.body).then(function () {
    res.redirect('/');
  })
})

router.get('/:id', function (req, res, next) {
  knex('post').where({id: req.params.id}).first().then(function(blog) {
    console.log(blog);
    res.render('detail', {blog:blog})
  })
})

router.get('/:id/delete', function(req, res, next) {
  knex('post').where({id: req.params.id}).del().then(function () {
    res.redirect('/');
  })
})

router.get('/:id/edit', function (req, res, next) {
  knex('post').where({id: req.params.id}).first().then(function (blog) {
    res.render('edit', {blog:blog})
  })

})
//
router.post('/:id/edit', function (req, res, next) {
  knex('post').where({id: req.params.id}).update(req.body).then(function () {
    res.redirect('/');
  })
})

module.exports = router;

// .join("comment", function () {
//     this.on("post_id", "=", "post.id");
//
// })
