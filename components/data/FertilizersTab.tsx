"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Leaf } from "lucide-react";
import { useLang } from "@/lib/langContext";

type FertRow = { name_en: string; name_bn: string; formula: string | null; type: "fertilizer" | "nutrient" };

export default function FertilizersTab() {
  const [data, setData] = useState<FertRow[]>([]);
  const { lang } = useLang();

  useEffect(() => {
    fetch("/api/fertilizers").then((r) => r.json()).then(setData);
  }, []);

  const fertilizers = data.filter((d) => d.type === "fertilizer");
  const nutrients = data.filter((d) => d.type === "nutrient");

  return (
    <div className="space-y-6">
        {/* Fertilizers */}
      <div>
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-blue-600" /> Fertilizers
          <span className="font-(family-name:--font-hind) text-slate-400 font-normal text-sm">— সার</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fertilizers.map((f) => (
            <div key={f.name_en} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-800">{lang === "en" ? f.name_en : f.name_bn}</div>
                  <div className={`text-sm text-slate-500 ${lang === "en" ? "font-(family-name:--font-hind)" : ""}`}>
                    {lang === "en" ? f.name_bn : f.name_en}
                  </div>
                </div>
                <Badge className="bg-blue-50 text-blue-700 shrink-0">Fertilizer</Badge>
              </div>
              {f.formula && (
                <div className="bg-slate-50 rounded px-3 py-1.5 font-mono text-sm text-slate-600 w-fit">
                  {f.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nutrients */}
      <div>
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-green-600" /> Soil Nutrients
          <span className="font-(family-name:--font-hind) text-slate-400 font-normal text-sm">— পুষ্টি উপাদান</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {nutrients.map((n) => (
            <div key={n.name_en} className="bg-white border border-slate-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow">
              <div className="font-medium text-slate-800 text-sm">{lang === "en" ? n.name_en : n.name_bn}</div>
              <div className={`text-xs text-slate-400 mt-0.5 ${lang === "en" ? "font-(family-name:--font-hind)" : ""}`}>
                {lang === "en" ? n.name_bn : n.name_en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}