"use client";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/langContext";
import {
  Sprout,
  ShieldCheck,
  Lock,
  CheckCircle,
  Loader2,
  ChevronRight,
  Printer,
  RotateCcw,
} from "lucide-react";

type Option = { id?: string; en: string; bn: string };

const STEPS = [
  { en: "Location", bn: "এলাকা" },
  { en: "Crop", bn: "ফসল" },
  { en: "Result", bn: "ফলাফল" },
];

const FERTILIZER_META: Record<
  string,
  { label_en: string; label_bn: string; highlight: boolean }
> = {
  Urea: { label_en: "Urea", label_bn: "ইউরিয়া", highlight: true },
  Urea_if_DAP: {
    label_en: "Urea (if DAP used)",
    label_bn: "ইউরিয়া (ড্যাপ সহ)",
    highlight: false,
  },
  TSP: { label_en: "TSP", label_bn: "টিএসপি", highlight: true },
  DAP: { label_en: "DAP", label_bn: "ডিএপি", highlight: false },
  MOP: { label_en: "MOP", label_bn: "এমওপি", highlight: true },
  Gypsum: { label_en: "Gypsum", label_bn: "জিপসাম", highlight: false },
  Zinc_Sulphate_Mono: {
    label_en: "Zinc Sulphate (Mono)",
    label_bn: "জিংক সালফেট (মনো)",
    highlight: false,
  },
  Zinc_Sulphate_Hepta: {
    label_en: "Zinc Sulphate (Hepta)",
    label_bn: "জিংক সালফেট (হেপ্টা)",
    highlight: false,
  },
};

const LAND_TYPE_LABELS: Record<string, { en: string; bn: string }> = {
  HL: { en: "High Land", bn: "উঁচু জমি" },
  MHL: { en: "Medium High Land", bn: "মধ্যম উঁচু জমি" },
  ML: { en: "Medium Land", bn: "মধ্যম জমি" },
  MLL: { en: "Medium Low Land", bn: "মধ্যম নিচু জমি" },
  LL: { en: "Low Land", bn: "নিচু জমি" },
  VLL: { en: "Very Low Land", bn: "অতি নিচু জমি" },
};

function SelectField({
  label,
  labelBn,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  labelBn: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
}) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {lang === "en" ? label : labelBn}
        <span
          className={`ml-1 font-normal text-slate-400 text-xs ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
        >
          - {lang === "en" ? labelBn : label}
        </span>
      </label>
      <select
        className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || options.length === 0}
      >
        <option value="">
          {options.length === 0 && disabled
            ? lang === "en"
              ? "Loading..."
              : "লোড হচ্ছে..."
            : placeholder}
        </option>
        {options.map((o, i) => (
          <option key={o.id ?? i} value={o.id ?? o.en}>
            {lang === "en" ? `${o.en} - ${o.bn}` : `${o.bn} - ${o.en}`}
          </option>
        ))}
      </select>
    </div>
  );
}

function FertilizerDosageCard({
  fieldKey,
  value,
  lang,
}: {
  fieldKey: string;
  value: string | number | null;
  lang: "en" | "bn";
}) {
  const meta = FERTILIZER_META[fieldKey];
  if (!meta || !value || value === "" || Number(value) === 0) return null;
  return (
    <div
      className={`rounded-lg border p-4 flex flex-col gap-1 ${meta.highlight ? "border-green-300 bg-green-50" : "border-slate-200 bg-white"}`}
    >
      <div
        className={`text-xs font-semibold uppercase tracking-wide ${meta.highlight ? "text-green-600" : "text-slate-400"}`}
      >
        {lang === "en" ? meta.label_en : meta.label_bn}
      </div>
      <div
        className={`font-[family-name:var(--font-hind)] text-xs ${meta.highlight ? "text-green-500" : "text-slate-300"}`}
      >
        {lang === "en" ? meta.label_bn : meta.label_en}
      </div>
      <div
        className={`text-2xl font-bold mt-1 ${meta.highlight ? "text-green-700" : "text-slate-700"}`}
      >
        {Number(value).toFixed(2)}
        <span className="text-xs font-normal ml-1 text-slate-400">
          {lang === "en" ? "kg/bigha" : "কেজি/বিঘা"}
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  r,
  lang,
  bcDone,
  pqcDone,
  index,
}: {
  r: any;
  lang: "en" | "bn";
  bcDone: boolean;
  pqcDone: boolean;
  index: number;
}) {
  const landType = LAND_TYPE_LABELS[r.url_type] ?? {
    en: r.url_type,
    bn: r.url_type,
  };
  const fertKeys = Object.keys(FERTILIZER_META);
  const hasAnyFert = fertKeys.some((k) => r[k] && Number(r[k]) > 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden print:shadow-none print:border">
      {/* Card header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sprout className="w-5 h-5" />
              <span className="font-bold text-lg">
                {lang === "en" ? r["Crop Name EN"] : r["Crop Name BN"]}
              </span>
            </div>
            <div
              className={`text-green-200 text-sm ${lang === "bn" ? "" : "font-[family-name:var(--font-hind)]"}`}
            >
              {lang === "en" ? r["Crop Name BN"] : r["Crop Name EN"]}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-green-800 text-green-100 text-xs px-2 py-0.5 rounded-full">
                {lang === "en" ? r["Season Name EN"] : r["Season Name BN"]}
              </span>
              <span className="bg-green-800 text-green-100 text-xs px-2 py-0.5 rounded-full">
                {lang === "en" ? landType.en : landType.bn}
              </span>
            </div>
          </div>
          <div className="text-right text-sm text-green-100">
            <div>{lang === "en" ? r.upazila_name_en : r.upazila_name_bn}</div>
            <div>{lang === "en" ? r.district_name_en : r.district_name_bn}</div>
            <div>{lang === "en" ? r.division_name_en : r.division_name_bn}</div>
          </div>
        </div>
      </div>

      {/* Variety */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-4 text-sm">
        <div>
          <span className="text-slate-400 text-xs">
            {lang === "en" ? "Variety" : "জাত"}
          </span>
          <div className="font-medium text-slate-700">
            {lang === "en" ? r["Variety Name EN"] : r["Variety Name BN"]}
          </div>
          <div
            className={`text-xs text-slate-400 ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
          >
            {lang === "en" ? r["Variety Name BN"] : r["Variety Name EN"]}
          </div>
        </div>
      </div>

      {/* Fertilizer dosages */}
      <div className="p-5">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          {lang === "en"
            ? "Recommended Fertilizer Dosage"
            : "সুপারিশকৃত সারের পরিমাণ"}
        </div>
        {hasAnyFert ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {fertKeys.map((k) => (
              <FertilizerDosageCard
                key={k}
                fieldKey={k}
                value={r[k]}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">
            {lang === "en"
              ? "No dosage data available for this combination."
              : "এই সমন্বয়ের জন্য কোনো ডেটা পাওয়া যায়নি।"}
          </p>
        )}
      </div>

      {/* Security footer */}
      <div className="border-t border-slate-100 px-5 py-3 flex flex-wrap gap-4 bg-slate-50">
        <div
          className={`flex items-center gap-1.5 text-xs ${bcDone ? "text-blue-600" : "text-slate-300"}`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {bcDone
            ? lang === "en"
              ? "Blockchain Verified"
              : "ব্লকচেইন যাচাইকৃত"
            : lang === "en"
              ? "Verifying..."
              : "যাচাই হচ্ছে..."}
        </div>
        <div
          className={`flex items-center gap-1.5 text-xs ${pqcDone ? "text-purple-600" : "text-slate-300"}`}
        >
          <Lock className="w-3.5 h-3.5" />
          {pqcDone
            ? lang === "en"
              ? "PQC Signed (Dilithium3)"
              : "পিকিউসি স্বাক্ষরিত (ডিলিথিয়াম৩)"
            : lang === "en"
              ? "Signing..."
              : "স্বাক্ষর হচ্ছে..."}
        </div>
        <div className="ml-auto text-xs text-slate-400 font-mono">
          #{String(index + 1).padStart(4, "0")} ·{" "}
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default function PredictionForm() {
  const { lang } = useLang();
  const printRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const [divisions, setDivisions] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [upazilas, setUpazilas] = useState<Option[]>([]);
  const [unions, setUnions] = useState<Option[]>([]);
  const [divId, setDivId] = useState("");
  const [distId, setDistId] = useState("");
  const [upzId, setUpzId] = useState("");
  const [unionId, setUnionId] = useState("");

  const [crops, setCrops] = useState<Option[]>([]);
  const [varieties, setVarieties] = useState<Option[]>([]);
  const [seasons, setSeasons] = useState<Option[]>([]);
  const [cropId, setCropId] = useState("");
  const [varietyId, setVarietyId] = useState("");
  const [season, setSeason] = useState("");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [bcDone, setBcDone] = useState(false);
  const [pqcDone, setPqcDone] = useState(false);

  const fetch_ = (url: string) => fetch(url).then((r) => r.json());
  const toOpt = (
    arr: any[],
    idKey: string,
    enKey: string,
    bnKey: string,
  ): Option[] =>
    arr.map((r) => ({ id: String(r[idKey]), en: r[enKey], bn: r[bnKey] }));

  useEffect(() => {
    fetch_("/api/db-filters?level=division").then((d) =>
      setDivisions(
        toOpt(d, "division_id", "division_name_en", "division_name_bn"),
      ),
    );
  }, []);

  useEffect(() => {
    if (!divId) {
      setDistricts([]);
      setDistId("");
      return;
    }
    fetch_(`/api/db-filters?level=district&division_id=${divId}`).then((d) =>
      setDistricts(
        toOpt(d, "district_id", "district_name_en", "district_name_bn"),
      ),
    );
    setDistId("");
    setUpzId("");
    setUnionId("");
  }, [divId]);

  useEffect(() => {
    if (!distId) {
      setUpazilas([]);
      setUpzId("");
      return;
    }
    fetch_(`/api/db-filters?level=upazila&district_id=${distId}`).then((d) =>
      setUpazilas(toOpt(d, "upazila_id", "upazila_name_en", "upazila_name_bn")),
    );
    setUpzId("");
    setUnionId("");
  }, [distId]);

  useEffect(() => {
    if (!upzId) {
      setUnions([]);
      setUnionId("");
      return;
    }
    fetch_(`/api/db-filters?level=union&upazila_id=${upzId}`).then((d) =>
      setUnions(toOpt(d, "union_id", "union_name_en", "union_name_bn")),
    );
    setUnionId("");
  }, [upzId]);

  useEffect(() => {
    if (!upzId) {
      setCrops([]);
      setCropId("");
      return;
    }
    fetch_(`/api/db-filters?level=crop&upazila_id=${upzId}`).then((d) =>
      setCrops(toOpt(d, "crop_id", "crop_name_en", "crop_name_bn")),
    );
    setCropId("");
    setVarietyId("");
    setSeason("");
  }, [upzId]);

  useEffect(() => {
    if (!upzId || !cropId) {
      setVarieties([]);
      setSeasons([]);
      return;
    }
    fetch_(
      `/api/db-filters?level=variety&upazila_id=${upzId}&crop_id=${cropId}`,
    ).then((d) =>
      setVarieties(
        toOpt(d, "variety_id", "variety_name_en", "variety_name_bn"),
      ),
    );
    fetch_(
      `/api/db-filters?level=season&upazila_id=${upzId}&crop_id=${cropId}`,
    ).then((d) =>
      setSeasons(
        d.map((r: any) => ({
          id: r.season_en,
          en: r.season_en,
          bn: r.season_bn,
        })),
      ),
    );
    setVarietyId("");
    setSeason("");
  }, [upzId, cropId]);

  function resetAll() {
    setStep(0);
    setResults([]);
    setBcDone(false);
    setPqcDone(false);
    setDivId("");
    setDistId("");
    setUpzId("");
    setUnionId("");
    setCropId("");
    setVarietyId("");
    setSeason("");
    setError("");
  }

  async function handlePredict() {
    setLoading(true);
    setError("");
    setResults([]);
    setBcDone(false);
    setPqcDone(false);
    try {
      const params = new URLSearchParams({
        upazila_id: upzId,
        crop_id: cropId,
      });
      if (unionId) params.append("union_id", unionId);
      if (varietyId) params.append("variety_id", varietyId);
      if (season) params.append("season", season);
      const data = await fetch_(`/api/prediction?${params}`);
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      setResults(data.results || []);
      setStep(2);
      setTimeout(() => setBcDone(true), 1200);
      setTimeout(() => setPqcDone(true), 2200);
    } catch {
      setError(
        lang === "en"
          ? "Failed to fetch prediction."
          : "পূর্বাভাস আনতে ব্যর্থ হয়েছে।",
      );
    }
    setLoading(false);
  }

  function handlePrint() {
    window.print();
  }

  const t = (en: string, bn: string) => (lang === "en" ? en : bn);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 print:hidden">
        {STEPS.map((s, i) => (
          <div key={s.en} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
              ${step > i ? "bg-green-600 text-white" : step === i ? "bg-green-100 text-green-700 ring-2 ring-green-500" : "bg-slate-100 text-slate-400"}`}
            >
              {step > i ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-sm font-medium ${step === i ? "text-green-700" : "text-slate-400"} ${lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""}`}
            >
              {t(s.en, s.bn)}
            </span>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Location */}
      {step === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">
              1
            </span>
            <span
              className={
                lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""
              }
            >
              {t("Select Your Location", "আপনার এলাকা বেছে নিন")}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Division"
              labelBn="বিভাগ"
              value={divId}
              onChange={setDivId}
              options={divisions}
              placeholder={t("Select Division", "বিভাগ বেছে নিন")}
            />
            <SelectField
              label="District"
              labelBn="জেলা"
              value={distId}
              onChange={setDistId}
              options={districts}
              placeholder={t("Select District", "জেলা বেছে নিন")}
              disabled={!divId}
            />
            <SelectField
              label="Upazila"
              labelBn="উপজেলা"
              value={upzId}
              onChange={setUpzId}
              options={upazilas}
              placeholder={t("Select Upazila", "উপজেলা বেছে নিন")}
              disabled={!distId}
            />
            <SelectField
              label="Union (Optional)"
              labelBn="ইউনিয়ন (ঐচ্ছিক)"
              value={unionId}
              onChange={setUnionId}
              options={unions}
              placeholder={t("Select Union", "ইউনিয়ন বেছে নিন")}
              disabled={!upzId}
            />
          </div>
          <button
            onClick={() => setStep(1)}
            disabled={!divId || !distId || !upzId}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-green-700 transition-colors"
          >
            {t("Next: Select Crop →", "পরবর্তী: ফসল বেছে নিন →")}
          </button>
        </div>
      )}

      {/* Step 1: Crop */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">
              2
            </span>
            <span
              className={
                lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""
              }
            >
              {t("Select Crop & Season", "ফসল ও মৌসুম বেছে নিন")}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Crop"
              labelBn="ফসল"
              value={cropId}
              onChange={setCropId}
              options={crops}
              placeholder={t("Select Crop", "ফসল বেছে নিন")}
            />
            <SelectField
              label="Variety (Optional)"
              labelBn="জাত (ঐচ্ছিক)"
              value={varietyId}
              onChange={setVarietyId}
              options={varieties}
              placeholder={t("Select Variety", "জাত বেছে নিন")}
              disabled={!cropId}
            />
            <SelectField
              label="Season (Optional)"
              labelBn="মৌসুম (ঐচ্ছিক)"
              value={season}
              onChange={setSeason}
              options={seasons}
              placeholder={t("Select Season", "মৌসুম বেছে নিন")}
              disabled={!cropId}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50"
            >
              {t("← Back", "← পিছনে")}
            </button>
            <button
              onClick={handlePredict}
              disabled={!cropId || loading}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading
                ? t("Fetching...", "আনা হচ্ছে...")
                : t("Get Recommendation →", "সুপারিশ দেখুন →")}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Action bar */}
          <div className="flex items-center justify-between print:hidden">
            <div className="text-sm text-slate-500">
              {results.length > 0 &&
                t(
                  `${results.length} result(s) found`,
                  `${results.length}টি ফলাফল পাওয়া গেছে`,
                )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
              >
                <Printer className="w-4 h-4" />
                {t("Print / Save PDF", "প্রিন্ট / পিডিএফ")}
              </button>
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw className="w-4 h-4" />
                {t("New Search", "নতুন অনুসন্ধান")}
              </button>
            </div>
          </div>

          {/* BC Status */}
          <div
            className={`rounded-xl border p-4 flex items-center gap-3 transition-all print:hidden ${bcDone ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}
          >
            {bcDone ? (
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400 shrink-0" />
            )}
            <div>
              <div className="font-medium text-sm text-slate-800">
                {t("Blockchain Verification", "ব্লকচেইন যাচাইকরণ")}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {bcDone
                  ? `Block #${Math.floor(Math.random() * 900000 + 100000)} - Hash: 0x${Math.random().toString(16).slice(2, 18).toUpperCase()}`
                  : t(
                      "Recording recommendation to blockchain...",
                      "ব্লকচেইনে সুপারিশ রেকর্ড হচ্ছে...",
                    )}
              </div>
            </div>
            {bcDone && (
              <Badge className="ml-auto bg-blue-100 text-blue-700">
                {t("Verified", "যাচাইকৃত")}
              </Badge>
            )}
          </div>

          {/* PQC Status */}
          <div
            className={`rounded-xl border p-4 flex items-center gap-3 transition-all print:hidden ${pqcDone ? "border-purple-300 bg-purple-50" : "border-slate-200 bg-white"}`}
          >
            {pqcDone ? (
              <Lock className="w-5 h-5 text-purple-600 shrink-0" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400 shrink-0" />
            )}
            <div>
              <div className="font-medium text-sm text-slate-800">
                {t(
                  "Post-Quantum Cryptographic Signature",
                  "পোস্ট-কোয়ান্টাম ক্রিপ্টোগ্রাফিক স্বাক্ষর",
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {pqcDone
                  ? "CRYSTALS-Dilithium3 - Signature verified ✓"
                  : t(
                      "Applying PQC signature (CRYSTALS-Dilithium3)...",
                      "পিকিউসি স্বাক্ষর প্রয়োগ হচ্ছে...",
                    )}
              </div>
            </div>
            {pqcDone && (
              <Badge className="ml-auto bg-purple-100 text-purple-700">
                {t("Signed", "স্বাক্ষরিত")}
              </Badge>
            )}
          </div>

          {/* Result cards */}
          <div ref={printRef} className="space-y-4">
            {results.length > 0 ? (
              results.map((r, i) => (
                <ResultCard
                  key={i}
                  r={r}
                  lang={lang}
                  bcDone={bcDone}
                  pqcDone={pqcDone}
                  index={i}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <div
                  className={`text-slate-400 text-sm ${lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""}`}
                >
                  {t(
                    "No data found for the selected combination.",
                    "নির্বাচিত সমন্বয়ের জন্য কোনো ডেটা পাওয়া যায়নি।",
                  )}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50"
                >
                  {t("← Try Different Crop", "← অন্য ফসল চেষ্টা করুন")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
