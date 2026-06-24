import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const division_id = searchParams.get("division_id");
  const district_id = searchParams.get("district_id");
  const upazila_id = searchParams.get("upazila_id");
  const crop_id = searchParams.get("crop_id");

  try {
    const db = getDb();
    let rows: any[] = [];

    if (level === "division") {
      rows = db.prepare(`SELECT DISTINCT division_id, division_name_en, division_name_bn FROM results ORDER BY division_name_en`).all();
    } else if (level === "district" && division_id) {
      rows = db.prepare(`SELECT DISTINCT district_id, district_name_en, district_name_bn FROM results WHERE division_id = ? ORDER BY district_name_en`).all(division_id);
    } else if (level === "upazila" && district_id) {
      rows = db.prepare(`SELECT DISTINCT upazila_id, upazila_name_en, upazila_name_bn FROM results WHERE district_id = ? ORDER BY upazila_name_en`).all(district_id);
    } else if (level === "union" && upazila_id) {
      rows = db.prepare(`SELECT DISTINCT union_id, union_name_en, union_name_bn FROM results WHERE upazila_id = ? ORDER BY union_name_en`).all(upazila_id);
    } else if (level === "crop" && upazila_id) {
      rows = db.prepare(`SELECT DISTINCT "Crop ID" as crop_id, "Crop Name EN" as crop_name_en, "Crop Name BN" as crop_name_bn FROM results WHERE upazila_id = ? ORDER BY "Crop Name EN"`).all(upazila_id);
    } else if (level === "variety" && upazila_id && crop_id) {
      rows = db.prepare(`SELECT DISTINCT "Vaiery ID" as variety_id, "Variety Name EN" as variety_name_en, "Variety Name BN" as variety_name_bn FROM results WHERE upazila_id = ? AND "Crop ID" = ? ORDER BY "Variety Name EN"`).all(upazila_id, crop_id);
    } else if (level === "season" && upazila_id && crop_id) {
      rows = db.prepare(`SELECT DISTINCT "Season Name EN" as season_en, "Season Name BN" as season_bn FROM results WHERE upazila_id = ? AND "Crop ID" = ?`).all(upazila_id, crop_id);
    }

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}