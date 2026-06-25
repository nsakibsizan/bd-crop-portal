import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), "public", "data", "merged_database.db");
    
    // Create indexes first (needs write access)
    try {
      const writable = new Database(dbPath, { readonly: false });
      writable.exec(`
        CREATE INDEX IF NOT EXISTS idx_division ON results(division_id);
        CREATE INDEX IF NOT EXISTS idx_district ON results(district_id);
        CREATE INDEX IF NOT EXISTS idx_upazila ON results(upazila_id);
        CREATE INDEX IF NOT EXISTS idx_union ON results(union_id);
        CREATE INDEX IF NOT EXISTS idx_crop ON results("Crop ID");
        CREATE INDEX IF NOT EXISTS idx_variety ON results("Variety ID");
      `);
      writable.close();
    } catch {
      // Indexes may already exist or DB may be locked — continue
    }

    // Now open readonly for all queries
    db = new Database(dbPath, { readonly: true });
  }
  return db;
}