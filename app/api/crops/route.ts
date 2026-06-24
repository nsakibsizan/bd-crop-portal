import { NextResponse } from "next/server";
import crops from "@/public/data/json/crops.json";

export async function GET() {
  const data = crops as any[];
  // Unique crops
  const cropMap = new Map();
  data.forEach((r) => {
    if (!cropMap.has(r["Crop ID"])) {
      cropMap.set(r["Crop ID"], { id: r["Crop ID"], en: r["Crop Name EN"], bn: r["Crop Name BN"] });
    }
  });
  const uniqueCrops = Array.from(cropMap.values());

  // Varieties grouped by crop
  const varietyMap: Record<string, any[]> = {};
  data.forEach((r) => {
    const cid = String(r["Crop ID"]);
    if (!varietyMap[cid]) varietyMap[cid] = [];
    varietyMap[cid].push({
      id: r["Vaiery ID"],
      en: r["Variety Name EN"],
      bn: r["Variety Name BN"],
      season_en: r["Season Name EN"],
      season_bn: r["Season Name BN"],
    });
  });

  // Unique seasons
  const seasonSet = new Set(data.map((r) => r["Season Name EN"]));
  const seasons = Array.from(seasonSet).filter(Boolean).map((s) => ({ en: s, bn: data.find((r) => r["Season Name EN"] === s)?.["Season Name BN"] }));

  return NextResponse.json({ crops: uniqueCrops, varieties: varietyMap, seasons });
}