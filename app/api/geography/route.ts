import { NextRequest, NextResponse } from "next/server";
import geography from "@/public/data/json/geography.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const division_id = searchParams.get("division_id");
  const district_id = searchParams.get("district_id");
  const upazila_id = searchParams.get("upazila_id");

  const data = geography as any[];

  if (level === "division") {
    const seen = new Set();
    const result = data.filter((r) => {
      if (seen.has(r.division_id)) return false;
      seen.add(r.division_id);
      return true;
    }).map((r) => ({ id: r.division_id, en: r.division_name_en, bn: r.division_name_bn }));
    return NextResponse.json(result);
  }

  if (level === "district" && division_id) {
    const seen = new Set();
    const result = data
      .filter((r) => String(r.division_id) === division_id)
      .filter((r) => { if (seen.has(r.district_id)) return false; seen.add(r.district_id); return true; })
      .map((r) => ({ id: r.district_id, en: r.district_name_en, bn: r.district_name_bn }));
    return NextResponse.json(result);
  }

  if (level === "upazila" && district_id) {
    const seen = new Set();
    const result = data
      .filter((r) => String(r.district_id) === district_id)
      .filter((r) => { if (seen.has(r.upazila_id)) return false; seen.add(r.upazila_id); return true; })
      .map((r) => ({ id: r.upazila_id, en: r.upazila_name_en, bn: r.upazila_name_bn }));
    return NextResponse.json(result);
  }

  if (level === "union" && upazila_id) {
    const seen = new Set();
    const result = data
      .filter((r) => String(r.upazila_id) === upazila_id)
      .filter((r) => { if (seen.has(r.union_id)) return false; seen.add(r.union_id); return true; })
      .map((r) => ({ id: r.union_id, en: r.union_name_en, bn: r.union_name_bn }));
    return NextResponse.json(result);
  }

  return NextResponse.json([]);
}