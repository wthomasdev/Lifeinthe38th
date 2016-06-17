
exports.seed = function(knex, Promise) {
  return knex('comment').del().then(function() {
    return knex('post').del()
  }).then(
    function () {
      return knex('user').del()
    }
  )
  .then (function() {
    return Promise.join(
      knex('user').insert({
        username: 'Will Thomas'
      }).returning('id'),
      knex('user').insert({
        username: 'Lucas Barbula'
      }).returning('id'),
      knex('user').insert({
        username: 'Laney Smith'
      }).returning('id')
    );
  })
  .then(function(ids) {
    var will = ids[0][0],
        lucas = ids[1][0],
        laney = ids[2][0];
    return Promise.join(
      knex('post').insert({
        title:'The Truth About Americans',
        content: 'They absolutely love hotpockets.',
        user_id: will
      }).returning('id'),
      knex('post').insert({
        title: 'Life in the mines',
        content:'It\'s absolutely savage down the mines my bro.',
        user_id: lucas
      }).returning('id'),
      knex('post').insert({
        title: 'Breaking my face, a real life story',
        content: 'Don\'t break your face kids, it\'s a real hassle. Tell your friends.',
        user_id: laney
      }).returning('id')
    ).then(function(postIds) {
      return {
        posts: {
          zero: postIds[0][0],
          one: postIds[1][0],
          two: postIds[2][0]
        },
        users: {
          will: will,
          lucas: lucas,
          laney: laney
        }
      };
    });
  })
  .then(function(data) {
      return Promise.join(
        knex('comment').insert({
          content: 'Why do you love yourself so much?',
          user_id: data.users.will,
          post_id: data.posts.zero
        }),
        knex('comment').insert({
          content: 'Anyone got any more mine cakes?',
          user_id: data.users.lucas,
          post_id: data.posts.one
        }),
        knex('comment').insert({
          content: 'You\'ll never stop me riding my bike....',
          user_id: data.users.laney,
          post_id: data.posts.two
        })
      );
  });

};
