"use client";
import { useLang } from "@/lib/langContext";
import { Download, FileJson, MapPin, Sprout, FlaskConical } from "lucide-react";

const files = [
  {
    name: "geography.json",
    label_en: "Geographic Data",
    label_bn: "ভৌগোলিক ডেটা",
    desc_en: "All divisions, districts, upazilas and unions of Bangladesh",
    desc_bn: "বাংলাদেশের সকল বিভাগ, জেলা, উপজেলা ও ইউনিয়ন",
    icon: MapPin,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    href: "/data/json/geography.json",
  },
  {
    name: "crops.json",
    label_en: "Crops & Varieties",
    label_bn: "ফসল ও জাত",
    desc_en: "882 crop varieties with season and crop type information",
    desc_bn: "৮৮২টি ফসলের জাত, মৌসুম ও ফসলের ধরন সহ",
    icon: Sprout,
    color: "bg-green-50 border-green-200 text-green-700",
    btnColor: "bg-green-600 hover:bg-green-700",
    href: "/data/json/crops.json",
  },
  {
    name: "fertilizers.json",
    label_en: "Fertilizer Reference",
    label_bn: "সারের তথ্য",
    desc_en: "10 fertilizers and 15 nutrients with chemical formulas",
    desc_bn: "১০টি সার ও ১৫টি পুষ্টি উপাদান রাসায়নিক সূত্র সহ",
    icon: FlaskConical,
    color: "bg-rose-50 border-rose-200 text-rose-700",
    btnColor: "bg-rose-600 hover:bg-rose-700",
    href: "/data/json/fertilizers.json",
  },
];

export default function DownloadSection() {
  const { lang } = useLang();
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {lang === "en" ? "Download Dataset" : "ডেটা ডাউনলোড করুন"}
        </h2>
        <p className={`text-slate-400 text-sm mt-0.5 ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}>
          {lang === "en"
            ? "Download the reference datasets in JSON format for research use"
            : "গবেষণার জন্য JSON ফরম্যাটে রেফারেন্স ডেটাসেট ডাউনলোড করুন"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {files.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.name} className={`rounded-xl border-2 p-5 ${f.color}`}>
              <div className="flex items-start justify-between mb-3">
                <Icon className="w-6 h-6" />
                <FileJson className="w-4 h-4 opacity-40" />
              </div>
              <div className={`font-bold text-base ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}>
                {lang === "en" ? f.label_en : f.label_bn}
              </div>
              <p className={`text-xs mt-1 opacity-70 leading-relaxed ${lang === "bn" ? "font-(family-name:--font-hind)" : ""}`}>
                {lang === "en" ? f.desc_en : f.desc_bn}
              </p>
              <div className="text-[10px] font-mono opacity-50 mt-2">{f.name}</div>

              <a
                href={f.href}
                download={f.name}
                className={`mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-white text-sm font-semibold transition-colors ${f.btnColor}`}
              >
                <Download className="w-4 h-4" />
                {lang === "en" ? "Download" : "ডাউনলোড"}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}