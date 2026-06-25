import { FlaskConical, Target, Database, Brain, ShieldCheck, ChevronRight } from "lucide-react";

const objectives = [
  "Collect and clean large-scale crop fertilizer data from Bangladesh government sources",
  "Build a Machine Learning model for location and crop-specific fertilizer recommendation",
  "Integrate a Blockchain layer to ensure tamper-proof data integrity",
  "Apply Post-Quantum Cryptography (CRYSTALS-Kyber, CRYSTALS-Dilithium) for future-proof security",
  "Deploy a bilingual (Bengali/English) farmer-facing web portal",
];

const phases = [
  { phase: "Phase 1", title: "Data Collection", titleBn: "ডেটা সংগ্রহ", desc: "Scraped 5M+ fertilizer recommendation records from czis.cropzoning.gov.bd covering all 8 divisions of Bangladesh. Data cleaned, normalized, and stored in SQLite.", icon: Database, color: "bg-blue-100 text-blue-700" },
  { phase: "Phase 2", title: "ML Model", titleBn: "মেশিন লার্নিং মডেল", desc: "Training a supervised ML model on location, crop variety, season, and land type parameters to predict optimal fertilizer dosages with high accuracy.", icon: Brain, color: "bg-purple-100 text-purple-700" },
  { phase: "Phase 3", title: "Blockchain Integration", titleBn: "ব্লকচেইন সংযোজন", desc: "Each recommendation is recorded as an immutable transaction on a permissioned blockchain, ensuring data provenance and audit trail.", icon: ShieldCheck, color: "bg-green-100 text-green-700" },
  { phase: "Phase 4", title: "PQC Security", titleBn: "পোস্ট-কোয়ান্টাম ক্রিপ্টোগ্রাফি", desc: "CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures protect the system against future quantum computing threats.", icon: FlaskConical, color: "bg-orange-100 text-orange-700" },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Research Details</h1>
          <p className="font-(family-name:--font-hind) text-slate-500 mt-1">গবেষণার বিবরণ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Title */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" /> Title
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            PQC Enabled Blockchain and XAI Framework for Climate-Resilient Agricultural Advisory System in Bangladesh
          </p>
        </section>

        {/* Background */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" /> Background & Motivation
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Bangladesh is an agrarian economy where over 40% of the population depends on agriculture. 
            Improper fertilizer use — both over-application and under-application — leads to soil 
            degradation, reduced yields, and economic loss for farmers. The Bangladesh Crop Zoning 
            Information System (CZIS) provides location-specific fertilizer recommendations, but this 
            data is not easily accessible or actionable for the average farmer.
          </p>
          <p className="text-slate-600 leading-relaxed">
            This research proposes an integrated system that makes these recommendations accessible 
            through a digital platform while ensuring the integrity and security of the data using 
            modern cryptographic techniques.
          </p>
        </section>

        {/* Objectives */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" /> Research Objectives
          </h2>
          <div className="space-y-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology phases */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Research Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phases.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.phase} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium mb-1">{p.phase}</div>
                      <div className="font-semibold text-slate-800">{p.title}</div>
                      <div className="font-(family-name:--font-hind) text-slate-400 text-sm">{p.titleBn}</div>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* System Architecture */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">System Architecture</h2>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {[
              { label: "Farmer Input", color: "bg-green-100 text-green-800" },
              { label: "Web Portal", color: "bg-blue-100 text-blue-800" },
              { label: "ML Model", color: "bg-purple-100 text-purple-800" },
              { label: "CZIS Database", color: "bg-slate-100 text-slate-800" },
              { label: "Blockchain Layer", color: "bg-orange-100 text-orange-800" },
              { label: "PQC Security", color: "bg-red-100 text-red-800" },
              { label: "Recommendation Output", color: "bg-green-100 text-green-800" },
            ].map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-2">
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${node.color}`}>{node.label}</div>
                {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm text-center mt-6">
            Farmer inputs location and crop → ML model queries CZIS database → recommendation generated → 
            recorded on blockchain → signed with PQC signature → delivered to farmer
          </p>
        </section>

      </div>
    </div>
  );
}