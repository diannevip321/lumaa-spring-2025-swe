exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.boolean("isComplete").defaultTo(false);
      table.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
  };
  