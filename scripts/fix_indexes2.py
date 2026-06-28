import sqlite3
import time

db_path = 'E:/5. M. Phill/bd-crop-portal/public/data/merged_database.db'
con = sqlite3.connect(db_path)

print("Creating filter-specific indexes...")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_div_dist ON results(division_id, district_id, district_name_en, district_name_bn)')
con.commit()
print(f"idx_div_dist done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_dist_upz ON results(district_id, upazila_id, upazila_name_en, upazila_name_bn)')
con.commit()
print(f"idx_dist_upz done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_upz_union ON results(upazila_id, union_id, union_name_en, union_name_bn)')
con.commit()
print(f"idx_upz_union done in {(time.time()-start):.1f}s")

start = time.time()
con.execute('CREATE INDEX IF NOT EXISTS idx_upz_crop ON results(upazila_id, "Crop ID", "Crop Name EN", "Crop Name BN")')
con.commit()
print(f"idx_upz_crop done in {(time.time()-start):.1f}s")

con.execute("ANALYZE")
con.commit()

print("\nTesting filter query...")
query = "SELECT DISTINCT district_id, district_name_en, district_name_bn FROM results WHERE division_id = '20' ORDER BY district_name_en"
start = time.time()
rows = con.execute(query).fetchall()
elapsed = (time.time() - start) * 1000
print(f"District filter: {elapsed:.2f} ms ({len(rows)} rows)")

query2 = "SELECT DISTINCT upazila_id, upazila_name_en, upazila_name_bn FROM results WHERE district_id = '2022' ORDER BY upazila_name_en"
start = time.time()
rows2 = con.execute(query2).fetchall()
elapsed2 = (time.time() - start) * 1000
print(f"Upazila filter: {elapsed2:.2f} ms ({len(rows2)} rows)")

con.close()
print("Done!")