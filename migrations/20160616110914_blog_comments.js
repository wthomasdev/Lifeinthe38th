
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.text('content');
    table.integer('post_id').references('id').inTable('post').onDelete('cascade');
    table.integer('user_id').references('id').inTable('user').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
