import * as fs from "fs";
import * as path from "path";

function generateMigrationFile(description: string): void {
  const timestamp = new Date().toISOString().replace(/[-T:]/g, "").slice(0, -5); // YYYYMMDDHHmmss
  const migrationFileName = `${timestamp}_${description
    .replace(/\s+/g, "_")
    .toLowerCase()}.ts`;
  const migrationFilePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "migrations",
    migrationFileName,
  );

  console.log(migrationFilePath);

  const migrationTemplate = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}`;

  fs.writeFileSync(migrationFilePath, migrationTemplate);

  console.log(`Migration file created: ${migrationFilePath}`);
}

// Example usage:
const description: string = process.argv[2]; // You can provide a description as a command-line argument
if (description) {
  generateMigrationFile(description);
} else {
  console.error("Please provide a description for the migration.");
}
