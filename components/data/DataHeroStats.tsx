"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/langContext";
import { Database, MapPin, Sprout, FlaskConical, Globe } from "lucide-react";

type GeoRow = {
  division_id: string;
  district_id: string;
  upazila_id: string;
  union_id: string;
};
type CropRow = {
  "Crop ID": number;
  "Variety ID": number;
  "Crop Name EN": string;
};

export default function DataHeroStats() {
  const { lang } = useLang();
  const [geo, setGeo] = useState<GeoRow[]>([]);
  const [crops, setCrops] = useState<CropRow[]>([]);

  useEffect(() => {
    fetch("/data/json/geography.json")
      .then((r) => r.json())
      .then(setGeo);
    fetch("/data/json/crops.json")
      .then((r) => r.json())
      .then(setCrops);
  }, []);

  const stats = [
    {
      icon: Database,
      value: "70M+",
      label_en: "Fertilizer Records",
      label_bn: "সারের রেকর্ড",
      color: "bg-green-50 text-green-700 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Globe,
      value: geo.length
        ? [...new Set(geo.map((r) => r.division_id))].length
        : "-",
      label_en: "Divisions",
      label_bn: "বিভাগ",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: MapPin,
      value: geo.length
        ? [...new Set(geo.map((r) => r.district_id))].length
        : "-",
      label_en: "Districts",
      label_bn: "জেলা",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: MapPin,
      value: geo.length
        ? [...new Set(geo.map((r) => r.upazila_id))].length
        : "-",
      label_en: "Upazilas",
      label_bn: "উপজেলা",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      iconColor: "text-orange-600",
    },
    {
      icon: MapPin,
      value: geo.length
        ? [...new Set(geo.map((r) => r.union_id))].length.toLocaleString()
        : "-",
      label_en: "Unions",
      label_bn: "ইউনিয়ন",
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      iconColor: "text-cyan-600",
    },
    {
      icon: Sprout,
      value: crops.length
        ? [...new Set(crops.map((r) => r["Crop Name EN"]))].length
        : "-",
      label_en: "Crop Types",
      label_bn: "ফসলের ধরন",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      icon: Sprout,
      value: crops.length || "-",
      label_en: "Crop Varieties",
      label_bn: "ফসলের জাত",
      color: "bg-lime-50 text-lime-700 border-lime-200",
      iconColor: "text-lime-600",
    },
    {
      icon: FlaskConical,
      value: 10,
      label_en: "Fertilizer Types",
      label_bn: "সারের ধরন",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label_en}
            className={`rounded-xl border p-4 flex flex-col items-center text-center gap-2 ${s.color}`}
          >
            <Icon className={`w-5 h-5 ${s.iconColor}`} />
            <div className="text-2xl font-bold">{s.value}</div>
            <div
              className={`text-xs font-medium leading-tight ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}
            >
              {lang === "en" ? s.label_en : s.label_bn}
            </div>
          </div>
        );
      })}
    </div>
  );
}
