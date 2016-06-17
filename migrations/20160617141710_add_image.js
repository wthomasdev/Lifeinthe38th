
exports.up = function(knex, Promise) {
  return knex.schema.table('post', function (table) {
    table.string('image');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('post', function (table) {
    table.dropColumn('image');
  })
};
