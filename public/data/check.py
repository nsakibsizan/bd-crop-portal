import sqlite3
import time

con = sqlite3.connect('E:/5. M. Phill/bd-crop-portal/public/data/merged_database.db')

# Test query — same as prediction page uses
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

print(f"Rows returned: {len(rows)}")
print(f"Query time: {elapsed:.2f} ms")

# Also test db-filters query
query2 = "SELECT DISTINCT district_id, district_name_en, district_name_bn FROM results WHERE division_id = '20' ORDER BY district_name_en"
start = time.time()
cur = con.execute(query2)
rows2 = cur.fetchall()
elapsed2 = (time.time() - start) * 1000
print(f"\nFilter query rows: {len(rows2)}")
print(f"Filter query time: {elapsed2:.2f} ms")

con.close()