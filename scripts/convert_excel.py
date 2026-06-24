import pandas as pd
import json
import os

out_dir = r'F:\Najmus Sakib Sizan\bd-crop-portal\public\data\json'
os.makedirs(out_dir, exist_ok=True)

xl_path = r"F:\Najmus Sakib Sizan\bd-crop-portal\public\data\Fertilizer and Nutrition List.xlsx"

# Sheet 1: Fertilizer reference — two side-by-side lists
df1 = pd.read_excel(xl_path, sheet_name='Fertilizer and Nutrition')

# Left side: fertilizers (source, formula, source_bn)
fert = df1[['source', 'formula', 'source_bn']].dropna(subset=['source'])
fert.columns = ['name_en', 'formula', 'name_bn']
fert['type'] = 'fertilizer'

# Right side: nutrients (name, name_bn)
nutr = df1[['name', 'name_bn']].dropna(subset=['name'])
nutr.columns = ['name_en', 'name_bn']
nutr['formula'] = None
nutr['type'] = 'nutrient'

import pandas as pd
combined = pd.concat([fert, nutr], ignore_index=True)
combined = combined.where(pd.notna(combined), None)

with open(os.path.join(out_dir, 'fertilizers.json'), 'w', encoding='utf-8') as f:
    json.dump(combined.to_dict(orient='records'), f, ensure_ascii=False, indent=2)
print(f'fertilizers.json: {len(combined)} rows ({len(fert)} fertilizers + {len(nutr)} nutrients)')

# Sheet 2: Geographic hierarchy — drop any row missing key IDs
df2 = pd.read_excel(xl_path, sheet_name='Div, Dis, Upz, Uni')
df2 = df2[['division_id','division_name_en','division_name_bn',
           'district_id','district_name_en','district_name_bn',
           'upazila_id','upazila_name_en','upazila_name_bn',
           'union_id','union_name_en','union_name_bn']]
# Drop rows where ANY of the key ID columns is NaN
df2 = df2.dropna(subset=['division_id','district_id','upazila_id','union_id'])
df2 = df2.drop_duplicates()
# Convert IDs to int then string to avoid float formatting like 40.0
for col in ['division_id','district_id','upazila_id','union_id']:
    df2[col] = df2[col].astype(int).astype(str)
with open(os.path.join(out_dir, 'geography.json'), 'w', encoding='utf-8') as f:
    json.dump(df2.to_dict(orient='records'), f, ensure_ascii=False, indent=2)
print(f'geography.json: {len(df2)} rows')

# Sheet 3: Crops & varieties
df3 = pd.read_excel(xl_path, sheet_name='Crops')
df3 = df3.dropna(how='all')
df3 = df3.where(pd.notna(df3), None)
with open(os.path.join(out_dir, 'crops.json'), 'w', encoding='utf-8') as f:
    json.dump(df3.to_dict(orient='records'), f, ensure_ascii=False, indent=2)
print(f'crops.json: {len(df3)} rows')

print('All done!')