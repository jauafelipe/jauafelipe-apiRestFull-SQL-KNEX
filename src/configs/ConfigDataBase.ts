import knex, { Knex } from "knex";

class Create {
  public knex: Knex = knex({
    client: "mysql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.DATABASE_USERNAME,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      ssl: true,
    },
  });

  public constructor() {
    this.knex;
    this.createTable();
  }

  public createTable() {
    this.knex.schema.createTable("test_api", (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
    });
  }
}

export default new Create();
