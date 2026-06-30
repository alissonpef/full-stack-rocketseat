import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.timestamp("updated_at").after("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.dropColumn("updated_at");
  });
}
