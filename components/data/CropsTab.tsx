"use client";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sprout } from "lucide-react";

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

const PAGE_SIZE = 50;
const seasonColors: Record<string, string> = {
  Rabi: "bg-blue-100 text-blue-700",
  Kharif: "bg-orange-100 text-orange-700",
  "Kharif-1": "bg-yellow-100 text-yellow-700",
  "Kharif-2": "bg-amber-100 text-amber-700",
};

export default function CropsTab() {
  const [data, setData] = useState<CropRow[]>([]);
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState<"en" | "bn">("en");

  useEffect(() => {
    fetch("/data/json/crops.json").then((r) => r.json()).then(setData);
  }, []);

  const uniqueCrops = useMemo(() => {
    const seen = new Set<number>();
    return data.filter((r) => { if (seen.has(r["Crop ID"])) return false; seen.add(r["Crop ID"]); return true; });
  }, [data]);

  const uniqueSeasons = useMemo(() => [...new Set(data.map((r) => r["Season Name EN"]))].filter(Boolean), [data]);

  const filtered = useMemo(() => {
    let d = data;
    if (cropFilter) d = d.filter((r) => String(r["Crop ID"]) === cropFilter);
    if (seasonFilter) d = d.filter((r) => r["Season Name EN"] === seasonFilter);
    if (search) {
      const q = search.toLowerCase();
      d = d.filter((r) =>
        r["Crop Name EN"].toLowerCase().includes(q) ||
        r["Variety Name EN"].toLowerCase().includes(q) ||
        r["Crop Name BN"].includes(q) ||
        r["Variety Name BN"].includes(q)
      );
    }
    return d;
  }, [data, cropFilter, seasonFilter, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Total Varieties", labelBn: "মোট জাত", value: data.length },
          { label: "Unique Crops", labelBn: "ফসলের ধরন", value: uniqueCrops.length },
          { label: "Seasons", labelBn: "মৌসুম", value: uniqueSeasons.length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{s.value}</div>
            <div className="text-slate-500 text-xs mt-1">{lang === "en" ? s.label : s.labelBn}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search crop or variety..."
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
          value={cropFilter}
          onChange={(e) => { setCropFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Crops</option>
          {uniqueCrops.map((c) => (
            <option key={c["Crop ID"]} value={c["Crop ID"]}>
              {c["Crop Name EN"]} — {c["Crop Name BN"]}
            </option>
          ))}
        </select>
        <select
          className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
          value={seasonFilter}
          onChange={(e) => { setSeasonFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Seasons</option>
          {uniqueSeasons.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="px-3 py-2 rounded-md border border-green-600 text-green-700 text-sm hover:bg-green-50"
        >
          {lang === "en" ? "বাংলা" : "English"}
        </button>
        <span className="text-slate-400 text-sm">{filtered.length} varieties</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Crop</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Variety</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Season</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Variety ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-green-500 shrink-0" />
                      <div>
                        <div className="font-medium text-slate-800">
                          {lang === "en" ? r["Crop Name EN"] : r["Crop Name BN"]}
                        </div>
                        <div className="text-xs text-slate-400">
                          {lang === "en" ? r["Crop Name BN"] : r["Crop Name EN"]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700">{lang === "en" ? r["Variety Name EN"] : r["Variety Name BN"]}</div>
                    <div className="text-xs text-slate-400">{lang === "en" ? r["Variety Name BN"] : r["Variety Name EN"]}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={seasonColors[r["Season Name EN"]] || "bg-slate-100 text-slate-600"}>
                      {lang === "en" ? r["Season Name EN"] : r["Season Name BN"]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{r["Vaiery ID"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
          <span className="text-slate-500 text-sm">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50">← Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 rounded border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}