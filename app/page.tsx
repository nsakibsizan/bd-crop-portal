import Link from "next/link";
import { Database, FlaskConical, ShieldCheck, Users, BookOpen, Sprout } from "lucide-react";

const sections = [
  {
    href: "/research",
    icon: FlaskConical,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100",
    title: "Research Details",
    titleBn: "গবেষণার বিবরণ",
    desc: "Methodology, system architecture, ML pipeline, and research objectives behind this project.",
  },
  {
    href: "/data",
    icon: Database,
    color: "bg-green-50 text-green-700 border-green-200",
    iconBg: "bg-green-100",
    title: "Data Explorer",
    titleBn: "ডেটা এক্সপ্লোরার",
    desc: "Browse the complete crop, variety, geographic, and fertilizer reference dataset interactively.",
  },
  {
    href: "/prediction",
    icon: Sprout,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
    title: "Fertilizer & Crop Prediction",
    titleBn: "সার এবং ফসল সুপারিশ",
    desc: "Get location and crop-specific fertilizer recommendations secured by Blockchain and PQC.",
  },
  {
    href: "/security",
    icon: ShieldCheck,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100",
    title: "BC + PQC Security",
    titleBn: "ব্লকচেইন + পিকিউসি",
    desc: "How Blockchain and Post-Quantum Cryptography ensure tamper-proof data integrity.",
  },
  {
    href: "/team",
    icon: Users,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    iconBg: "bg-orange-100",
    title: "Research Team",
    titleBn: "গবেষণা দল",
    desc: "Meet the researchers, supervisors, and institutional affiliations behind this work.",
  },
  {
    href: "/publications",
    icon: BookOpen,
    color: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-100",
    title: "Publications",
    titleBn: "প্রকাশনা",
    desc: "Research papers, thesis documents, and conference submissions from this project.",
  },
];

const stats = [
  { value: "~17.5M+", label: "Data Records", labelBn: "ডেটা রেকর্ড" },
  // { value: "8", label: "Divisions", labelBn: "বিভাগ" },
  { value: "64", label: "Districts", labelBn: "জেলা" },
  // { value: "497", label: "Upazilas", labelBn: "উপজেলা" },
  // { value: "7745", label: "Unions", labelBn: "ইউনিয়ন" },
  { value: "68", label: "Crops", labelBn: "ফসল" },
  { value: "882", label: "Crop Varieties", labelBn: "ফসলের জাত" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-6xl">
            <span className="inline-block bg-green-700 text-green-100 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
              MPhil Research · Jagannath University
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Smart Fertilizer & Crop Recommendation for Bangladesh Agriculture
            </h1>
            <p className="font-(family-name:--font-hind) text-green-200 text-lg md:text-xl mb-4">
              বাংলাদেশের কৃষিতে স্মার্ট সার এবং ফসল সুপারিশ ব্যবস্থা
            </p>
            <p className="text-green-100 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              An integrated research system combining Machine Learning, Blockchain,
              and Post-Quantum Cryptography to deliver secure, location-specific
              crop fertilizer recommendations across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/prediction"
                className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors text-sm"
              >
                Get Recommendation →
              </Link>
              <Link
                href="/research"
                className="border border-green-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition-colors text-sm"
              >
                Read Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700">{stat.value}</div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                <div className="font-(family-name:--font-hind) text-slate-400 text-xs">{stat.labelBn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Research Abstract</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              This research addresses the critical challenge of accurate fertilizer
              recommendation in Bangladesh's diverse agricultural landscape. By integrating
              a Machine Learning model trained on location, crop, variety, and seasonal
              parameters with a Blockchain-backed data integrity layer and Post-Quantum
              Cryptographic security protocols, we propose a system that is both
              scientifically accurate and future-proof against emerging computational threats.
              The dataset spans over 5 million records sourced from the Bangladesh Crop
              Zoning Information System, covering all 8 divisions, 64 districts, and
              882 crop varieties.
            </p>
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Explore the Portal</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Navigate to any section below</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow ${s.color}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-base">{s.title}</div>
                    <div className={`font-(family-name:--font-hind) text-sm opacity-75`}>{s.titleBn}</div>
                    <p className="text-sm mt-2 opacity-80 leading-relaxed">{s.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}