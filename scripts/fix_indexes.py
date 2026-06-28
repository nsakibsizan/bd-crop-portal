import sqlite3
import time

db_path = 'E:/5. M. Phill/bd-crop-portal/public/data/merged_database.db'
con = sqlite3.connect(db_path)

print("Dropping old indexes...")
con.execute("DROP INDEX IF EXISTS idx_division")
con.execute("DROP INDEX IF EXISTS idx_district")
con.execute("DROP INDEX IF EXISTS idx_upazila")
con.execute("DROP INDEX IF EXISTS idx_union")
con.execute("DROP INDEX IF EXISTS idx_crop")
con.execute("DROP INDEX IF EXISTS idx_variety")
con.commit()
print("Done dropping.")

print("\nCreating new composite indexes (this will take several minutes on 17M rows)...")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_upazila_crop ON results(upazila_id, "Crop ID")')
con.commit()
print(f"idx_upazila_crop done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_division ON results(division_id)')
con.commit()
print(f"idx_division done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_district ON results(district_id)')
con.commit()
print(f"idx_district done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_upazila ON results(upazila_id)')
con.commit()
print(f"idx_upazila done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_union_crop ON results(union_id, "Crop ID")')
con.commit()
print(f"idx_union_crop done in {(time.time()-start):.1f}s")

print("\nRunning ANALYZE to update query planner stats...")
con.execute("ANALYZE")
con.commit()

print("\nTesting query speed...")
query = """
    SELECT 
        division_name_en, division_name_bn,
        district_name_en, district_name_bn,
        upazila_name_en, upazila_name_bn,
        union_name_en, union_name_bn,
        "Variety Name EN", "Variety Name BN",
        "Crop Name EN", "Crop Name BN",
        "Season Name EN", "Season Name BN",
        url_type,
        Urea, Urea_if_DAP, TSP, DAP, MOP, Gypsum,
        Zinc_Sulphate_Mono, Zinc_Sulphate_Hepta
    FROM results
    WHERE upazila_id = '202232' AND "Crop ID" = '1'
    LIMIT 20
"""
start = time.time()
cur = con.execute(query)
rows = cur.fetchall()
elapsed = (time.time() - start) * 1000
print(f"Prediction query: {elapsed:.2f} ms ({len(rows)} rows)")

query2 = "SELECT DISTINCT district_id, district_name_en, district_name_bn FROM results WHERE division_id = '20' ORDER BY district_name_en"
start = time.time()
rows2 = con.execute(query2).fetchall()
elapsed2 = (time.time() - start) * 1000
print(f"Filter query: {elapsed2:.2f} ms ({len(rows2)} rows)")

con.close()
print("\nAll done!")