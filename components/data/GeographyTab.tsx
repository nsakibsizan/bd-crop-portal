"use client";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import { useLang } from "@/lib/langContext";

type GeoRow = {
  division_id: string; division_name_en: string; division_name_bn: string;
  district_id: string; district_name_en: string; district_name_bn: string;
  upazila_id: string; upazila_name_en: string; upazila_name_bn: string;
  union_id: string; union_name_en: string; union_name_bn: string;
};

const PAGE_SIZE = 50;

export default function GeographyTab() {
  const [data, setData] = useState<GeoRow[]>([]);
  const [search, setSearch] = useState("");
  const [divFilter, setDivFilter] = useState("");
  const [page, setPage] = useState(1);
  const { lang } = useLang();

  useEffect(() => {
    fetch("/data/json/geography.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const divisions = useMemo(() => {
    const seen = new Set<string>();
    return data.filter((r) => { if (seen.has(r.division_id)) return false; seen.add(r.division_id); return true; });
  }, [data]);

  const filtered = useMemo(() => {
    let d = data;
    if (divFilter) d = d.filter((r) => r.division_id === divFilter);
    if (search) {
      const q = search.toLowerCase();
      d = d.filter((r) =>
        r.division_name_en.toLowerCase().includes(q) ||
        r.district_name_en.toLowerCase().includes(q) ||
        r.upazila_name_en.toLowerCase().includes(q) ||
        r.union_name_en.toLowerCase().includes(q) ||
        r.division_name_bn.includes(q) ||
        r.district_name_bn.includes(q) ||
        r.upazila_name_bn.includes(q) ||
        r.union_name_bn.includes(q)
      );
    }
    return d;
  }, [data, divFilter, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const n = (en: string, bn: string) => lang === "en" ? en : bn;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Unions", labelBn: "মোট ইউনিয়ন", value: data.length },
          { label: "Divisions", labelBn: "বিভাগ", value: [...new Set(data.map(r => r.division_id))].length },
          { label: "Districts", labelBn: "জেলা", value: [...new Set(data.map(r => r.district_id))].length },
          { label: "Upazilas", labelBn: "উপজেলা", value: [...new Set(data.map(r => r.upazila_id))].length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{s.value.toLocaleString()}</div>
            <div className="text-slate-500 text-xs mt-1">{lang === "en" ? s.label : s.labelBn}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search division, district, upazila, union..."
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
          value={divFilter}
          onChange={(e) => { setDivFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Divisions</option>
          {divisions.map((d) => (
            <option key={d.division_id} value={d.division_id}>
              {d.division_name_en} — {d.division_name_bn}
            </option>
          ))}
        </select>

        <span className="text-slate-400 text-sm">{filtered.length.toLocaleString()} records</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Division", "District", "Upazila", "Union"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{n(r.division_name_en, r.division_name_bn)}</div>
                    <div className="text-xs text-slate-400">{lang === "en" ? r.division_name_bn : r.division_name_en}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700">{n(r.district_name_en, r.district_name_bn)}</div>
                    <div className="text-xs text-slate-400">{lang === "en" ? r.district_name_bn : r.district_name_en}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700">{n(r.upazila_name_en, r.upazila_name_bn)}</div>
                    <div className="text-xs text-slate-400">{lang === "en" ? r.upazila_name_bn : r.upazila_name_en}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <div>
                        <div className="text-slate-700">{n(r.union_name_en, r.union_name_bn)}</div>
                        <div className="text-xs text-slate-400">{lang === "en" ? r.union_name_bn : r.union_name_en}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
          <span className="text-slate-500 text-sm">
            Page {page} of {totalPages} ({filtered.length.toLocaleString()} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50"
            >← Prev</button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50"
            >Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}