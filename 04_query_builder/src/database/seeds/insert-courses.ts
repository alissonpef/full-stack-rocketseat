import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("courses").insert([
    { name: "CSS" },
    { name: "HTML" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Python" },
    { name: "Java" },
    { name: "C#" },
    { name: "Go" },
  ]);
}
