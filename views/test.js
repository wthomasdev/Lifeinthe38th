router.get('/:id', function(req, res, next) {
  Promise.all([
    knex('post')
        .join('user', function() {
            this.on('user.id', '=', 'post.user_id')
        }).select(['post.name as name','user.name as userName', 'post.body as postBody', 'post.id as id']).where({id: req.params.id}).first(),
        knex('user')
        .join('comment', function() {
            this.on('user.id', '=', 'comment.user_id')
        })
        .select().where({post_id: req.params.id}).first(),
        knex('user').select(),
        knex('comment').select().where({post_id: req.params.id})
      ])
        .then(function(details) {
            console.log(details)
            res.render('detail', {
                details: details[0],
                expanded: details[1],
                names: details[2],
                comments: details[3]
            })
        })
})
router.get('/:id/edit', function(req, res, next) {
    knex('post').where('post.id', req.params.id
  ).first().then(function(data) {
        res.render('edit', {
            data: data
        })
    })
})
