import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('shuttles')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('driver_id', 'uuid', (col) => col.unique().notNull())
    .addColumn('model_name', 'text', (col) => col.notNull())
    .addColumn('plate_number', 'text', (col) => col.unique().notNull())
    .addColumn('capacity', 'integer', (col) => col.notNull())
    .addColumn('image_url', 'text', (col) => col.notNull())
    .addColumn('route_start_location_id', 'serial', (col) =>
      col.references('locations.id').notNull()
    )
    .addColumn('route_end_location_id', 'serial', (col) => col.references('locations.id').notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('shuttles').execute();
}
