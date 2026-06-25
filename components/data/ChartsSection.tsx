"use client";
import { useEffect, useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { useLang } from "@/lib/langContext";

type CropRow = {
  "Crop ID": number;
  "Crop Name EN": string;
  "Crop Name BN": string;
  "Season Name EN": string;
  "Season Name BN": string;
  "Vaiery ID": number;
};

type GeoRow = {
  division_id: string;
  division_name_en: string;
  division_name_bn: string;
  district_id: string;
  union_id: string;
};

const COLORS = ["#16a34a", "#2563eb", "#9333ea", "#ea580c", "#0891b2", "#dc2626", "#ca8a04", "#0f766e"];

const SEASON_COLORS: Record<string, string> = {
  "Rabi": "#2563eb",
  "Kharif-1": "#ea580c",
  "Kharif-2": "#ca8a04",
  "Kharif": "#16a34a",
};

function SectionTitle({ en, bn }: { en: string; bn: string }) {
  const { lang } = useLang();
  return (
    <h3 className="font-semibold text-slate-700 mb-4">
      {lang === "en" ? en : bn}
      <span className={`ml-2 font-normal text-slate-400 text-sm ${lang === "bn" ? "" : "font-(family-name:--font-hind)"}`}>
        {lang === "en" ? bn : en}
      </span>
    </h3>
  );
}

export default function ChartsSection() {
  const [crops, setCrops] = useState<CropRow[]>([]);
  const [geo, setGeo] = useState<GeoRow[]>([]);
  const { lang } = useLang();

  useEffect(() => {
    fetch("/data/json/crops.json").then((r) => r.json()).then(setCrops);
    fetch("/data/json/geography.json").then((r) => r.json()).then(setGeo);
  }, []);

  // Chart 1: Varieties per crop (top 10)
  const cropDistData = useMemo(() => {
    const map = new Map<string, { en: string; bn: string; count: number }>();
    crops.forEach((r) => {
      const key = String(r["Crop ID"]);
      if (!map.has(key)) map.set(key, { en: r["Crop Name EN"], bn: r["Crop Name BN"], count: 0 });
      map.get(key)!.count++;
    });
    return Array.from(map.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((d) => ({ name: lang === "en" ? d.en : d.bn, count: d.count }));
  }, [crops, lang]);

  // Chart 2: Varieties per season
  const seasonData = useMemo(() => {
    const map = new Map<string, { en: string; bn: string; count: number }>();
    crops.forEach((r) => {
      const key = r["Season Name EN"];
      if (!map.has(key)) map.set(key, { en: r["Season Name EN"], bn: r["Season Name BN"], count: 0 });
      map.get(key)!.count++;
    });
    return Array.from(map.values())
      .sort((a, b) => b.count - a.count)
      .map((d) => ({ name: lang === "en" ? d.en : d.bn, value: d.count, key: d.en }));
  }, [crops, lang]);

  // Chart 3: Districts per division
  const divisionData = useMemo(() => {
    const distMap = new Map<string, Set<string>>();
    const nameMap = new Map<string, { en: string; bn: string }>();
    geo.forEach((r) => {
      if (!distMap.has(r.division_id)) distMap.set(r.division_id, new Set());
      distMap.get(r.division_id)!.add(r.district_id);
      nameMap.set(r.division_id, { en: r.division_name_en, bn: r.division_name_bn });
    });
    return Array.from(distMap.entries())
      .map(([id, districts]) => ({
        name: lang === "en" ? nameMap.get(id)?.en : nameMap.get(id)?.bn,
        districts: districts.size,
      }))
      .sort((a, b) => (b.districts ?? 0) - (a.districts ?? 0));
  }, [geo, lang]);

  // Chart 4: Unions per division
  const unionData = useMemo(() => {
    const unionMap = new Map<string, Set<string>>();
    const nameMap = new Map<string, { en: string; bn: string }>();
    geo.forEach((r) => {
      if (!unionMap.has(r.division_id)) unionMap.set(r.division_id, new Set());
      unionMap.get(r.division_id)!.add(r.union_id);
      nameMap.set(r.division_id, { en: r.division_name_en, bn: r.division_name_bn });
    });
    return Array.from(unionMap.entries())
      .map(([id, unions]) => ({
        name: lang === "en" ? nameMap.get(id)?.en : nameMap.get(id)?.bn,
        value: unions.size,
      }))
      .sort((a, b) => b.value - a.value);
  }, [geo, lang]);

  if (crops.length === 0 || geo.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-72 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-48 mb-4" />
            <div className="h-52 bg-slate-50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Chart 1: Top crops by variety count */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <SectionTitle en="Top 10 Crops by Variety Count" bn="জাতের সংখ্যা অনুযায়ী শীর্ষ ১০ ফসল" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cropDistData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10 }}
                width={110}
              />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(v) => [v, lang === "en" ? "Varieties" : "জাত"]}
              />
              <Bar dataKey="count" fill="#16a34a" radius={[0, 4, 4, 0]}>
                {cropDistData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Varieties by season (pie) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <SectionTitle en="Varieties by Season" bn="মৌসুম অনুযায়ী জাত বিতরণ" />
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={seasonData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {seasonData.map((entry, i) => (
                  <Cell key={i} fill={SEASON_COLORS[entry.key] ?? COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(v) => [v, lang === "en" ? "Varieties" : "জাত"]}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Districts per division */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <SectionTitle en="Districts per Division" bn="বিভাগ অনুযায়ী জেলার সংখ্যা" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={divisionData} margin={{ left: 0, right: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(v) => [v, lang === "en" ? "Districts" : "জেলা"]}
              />
              <Bar dataKey="districts" radius={[4, 4, 0, 0]}>
                {divisionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Unions per division */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <SectionTitle en="Unions per Division" bn="বিভাগ অনুযায়ী ইউনিয়নের সংখ্যা" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={unionData} margin={{ left: 0, right: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(v) => [v, lang === "en" ? "Unions" : "ইউনিয়ন"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {unionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}