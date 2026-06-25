"use client";
import { useEffect, useState, useMemo } from "react";
import { useLang } from "@/lib/langContext";
import { MapPin } from "lucide-react";

type GeoRow = {
  division_id: string; division_name_en: string; division_name_bn: string;
  district_id: string; upazila_id: string; union_id: string;
};

const DIV_COLORS = [
  "border-green-300 bg-gradient-to-br from-green-50 to-white",
  "border-blue-300 bg-gradient-to-br from-blue-50 to-white",
  "border-purple-300 bg-gradient-to-br from-purple-50 to-white",
  "border-orange-300 bg-gradient-to-br from-orange-50 to-white",
  "border-cyan-300 bg-gradient-to-br from-cyan-50 to-white",
  "border-rose-300 bg-gradient-to-br from-rose-50 to-white",
  "border-amber-300 bg-gradient-to-br from-amber-50 to-white",
  "border-emerald-300 bg-gradient-to-br from-emerald-50 to-white",
];

const ICON_COLORS = [
  "text-green-500", "text-blue-500", "text-purple-500", "text-orange-500",
  "text-cyan-500", "text-rose-500", "text-amber-500", "text-emerald-500",
];

export default function GeographyExplorer() {
  const { lang } = useLang();
  const [data, setData] = useState<GeoRow[]>([]);

  useEffect(() => {
    fetch("/data/json/geography.json").then((r) => r.json()).then(setData);
  }, []);

  const divisions = useMemo(() => {
    const map = new Map<string, {
      en: string; bn: string;
      districts: Set<string>; upazilas: Set<string>; unions: Set<string>;
    }>();
    data.forEach((r) => {
      if (!map.has(r.division_id)) {
        map.set(r.division_id, {
          en: r.division_name_en, bn: r.division_name_bn,
          districts: new Set(), upazilas: new Set(), unions: new Set(),
        });
      }
      const d = map.get(r.division_id)!;
      d.districts.add(r.district_id);
      d.upazilas.add(r.upazila_id);
      d.unions.add(r.union_id);
    });
    return Array.from(map.entries())
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => a.en.localeCompare(b.en));
  }, [data]);

  const n = (en: string, bn: string) => lang === "en" ? en : bn;

  if (data.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {divisions.map((div, i) => (
        <div
          key={div.id}
          className={`rounded-xl border-2 p-5 transition-all ${DIV_COLORS[i % DIV_COLORS.length]}`}
        >
          <MapPin className={`w-5 h-5 mb-3 ${ICON_COLORS[i % ICON_COLORS.length]}`} />
          <div className="font-bold text-slate-800 text-base">{n(div.en, div.bn)}</div>
          <div className={`text-xs text-slate-400 mt-0.5 ${lang === "en" ? "font-(family-name:--font-hind)" : ""}`}>
            {n(div.bn, div.en)}
          </div>
          <div className="mt-4 space-y-2">
            {[
              { val: div.districts.size, en: "Districts", bn: "জেলা" },
              { val: div.upazilas.size, en: "Upazilas", bn: "উপজেলা" },
              { val: div.unions.size, en: "Unions", bn: "ইউনিয়ন" },
            ].map((s) => (
              <div key={s.en} className="flex items-center justify-between">
                <span className={`text-xs text-slate-500 ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}>
                  {n(s.en, s.bn)}
                </span>
                <span className="text-sm font-bold text-slate-700">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}