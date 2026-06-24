import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division_id = searchParams.get("division_id");
  const district_id = searchParams.get("district_id");
  const upazila_id = searchParams.get("upazila_id");
  const union_id = searchParams.get("union_id");
  const crop_id = searchParams.get("crop_id");
  const variety_id = searchParams.get("variety_id");
  const season = searchParams.get("season");

  if (!upazila_id || !crop_id) {
    return NextResponse.json({ error: "upazila_id and crop_id are required" }, { status: 400 });
  }

  try {
    const db = getDb();

    let query = `
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
      WHERE upazila_id = ? AND "Crop ID" = ?
    `;

    const params: string[] = [upazila_id, crop_id];

    if (union_id) { query += ` AND union_id = ?`; params.push(union_id); }
    if (variety_id) { query += ` AND "Vaiery ID" = ?`; params.push(variety_id); }
    if (season) { query += ` AND "Season Name EN" = ?`; params.push(season); }

    query += ` LIMIT 20`;

    const rows = db.prepare(query).all(...params);

    if (rows.length === 0) {
      return NextResponse.json({ results: [], message: "No data found for the selected combination." });
    }

    return NextResponse.json({ results: rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}