import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("time_departures")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("time", "time", (col) => col.unique().notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("time_departures").execute();
}
