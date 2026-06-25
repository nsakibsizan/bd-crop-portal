"use client";
import { useEffect, useState, useMemo } from "react";
import { useLang } from "@/lib/langContext";
import { Sprout, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

type CropRow = {
  "Vaiery ID": number;
  "Variety Name BN": string;
  "Variety Name EN": string;
  "Crop ID": number;
  "Crop Name EN": string;
  "Crop Name BN": string;
  "Season Name EN": string;
  "Season Name BN": string;
};

const SEASON_COLORS: Record<string, string> = {
  "Rabi":     "bg-blue-100 text-blue-700",
  "Kharif-1": "bg-orange-100 text-orange-700",
  "Kharif-2": "bg-amber-100 text-amber-700",
  "Kharif":   "bg-green-100 text-green-700",
};

const PAGE_SIZE = 8;

export default function CropExplorer() {
  const { lang } = useLang();
  const [data, setData] = useState<CropRow[]>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/data/json/crops.json").then((r) => r.json()).then(setData);
  }, []);

  // Build crop groups
  const cropGroups = useMemo(() => {
    const map = new Map<number, {
      id: number; en: string; bn: string;
      count: number; seasons: Set<string>;
    }>();
    data.forEach((r) => {
      if (!map.has(r["Crop ID"])) {
        map.set(r["Crop ID"], {
          id: r["Crop ID"], en: r["Crop Name EN"], bn: r["Crop Name BN"],
          count: 0, seasons: new Set(),
        });
      }
      const c = map.get(r["Crop ID"])!;
      c.count++;
      c.seasons.add(r["Season Name EN"]);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [data]);

  // Unique crop types (first word of crop name as category)
  const cropTypes = useMemo(() => {
    const types = new Set<string>();
    cropGroups.forEach((c) => {
      // Use full crop name as type for grouping
      const type = c.en.split(" ").slice(-1)[0]; // last word e.g. "dhan", "wheat"
      types.add(type);
    });
    return Array.from(types).slice(0, 10); // top 10 types
  }, [cropGroups]);

  // Filtered crops
  const filtered = useMemo(() => {
    if (activeType === "all") return cropGroups;
    return cropGroups.filter((c) => c.en.toLowerCase().includes(activeType.toLowerCase()));
  }, [cropGroups, activeType]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const n = (en: string, bn: string) => lang === "en" ? en : bn;

  if (data.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => <div key={i} className="h-48 rounded-xl bg-slate-100 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setActiveType("all"); setPage(1); }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
            ${activeType === "all" ? "bg-green-600 text-white border-green-600" : "bg-white text-slate-600 border-slate-200 hover:border-green-400"}`}
        >
          {lang === "en" ? "All Crops" : "সব ফসল"} ({cropGroups.length})
        </button>
        {cropTypes.map((type) => {
          const count = cropGroups.filter((c) => c.en.toLowerCase().includes(type.toLowerCase())).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              onClick={() => { setActiveType(type); setPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize
                ${activeType === type ? "bg-green-600 text-white border-green-600" : "bg-white text-slate-600 border-slate-200 hover:border-green-400"}`}
            >
              {type} ({count})
            </button>
          );
        })}
      </div>

      {/* Crop cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginated.map((crop) => (
          <div
            key={crop.id}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image placeholder */}
            <div className="h-32 bg-linear-to-br from-green-100 to-emerald-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-green-300">
                <ImageIcon className="w-8 h-8" />
                <span className="text-[10px]">Image coming soon</span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-4">
              <div className="font-bold text-slate-800 text-sm leading-snug">
                {n(crop.en, crop.bn)}
              </div>
              <div className={`text-xs text-slate-400 mt-0.5 leading-snug ${lang === "en" ? "font-(family-name:--font-hind)" : ""}`}>
                {n(crop.bn, crop.en)}
              </div>

              {/* Variety count */}
              <div className="mt-3 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-green-500 shrink-0" />
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-green-700">{crop.count}</span>
                  <span className={`text-xs text-slate-400 ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}>
                    {n("varieties", "জাত")}
                  </span>
                </div>
              </div>

              {/* Season badges */}
              <div className="mt-2 flex flex-wrap gap-1">
                {Array.from(crop.seasons).map((s) => (
                  <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${SEASON_COLORS[s] ?? "bg-slate-100 text-slate-500"}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-slate-500">
            {lang === "en"
              ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} crops`
              : `${filtered.length} টি ফসলের মধ্যে ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} দেখাচ্ছে`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> {lang === "en" ? "Prev" : "আগে"}
            </button>
            <span className="text-sm text-slate-500">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              {lang === "en" ? "Next" : "পরে"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}