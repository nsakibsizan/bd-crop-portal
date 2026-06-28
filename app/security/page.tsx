import {
  ShieldCheck,
  Lock,
  Link2,
  Key,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const bcFeatures = [
  {
    title: "Immutable Records",
    desc: "Every fertilizer recommendation is stored as a transaction. Once written, it cannot be altered or deleted.",
  },
  {
    title: "Decentralized Trust",
    desc: "No single authority controls the data. Consensus across nodes ensures integrity without a central point of failure.",
  },
  {
    title: "Audit Trail",
    desc: "Every query, recommendation, and update is logged with timestamp, providing full traceability.",
  },
  {
    title: "Smart Contracts",
    desc: "Recommendation logic encoded as smart contracts ensures consistent, tamper-proof execution.",
  },
];

const pqcAlgorithms = [
  {
    name: "CRYSTALS-Kyber",
    type: "Key Encapsulation",
    nist: "NIST PQC Standard",
    desc: "Used for secure key exchange between the portal and the blockchain layer. Resistant to quantum attacks on classical Diffie-Hellman.",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "CRYSTALS-Dilithium",
    type: "Digital Signature",
    nist: "NIST PQC Standard",
    desc: "Signs each fertilizer recommendation record. Verifies authenticity of data without exposing private keys to quantum threats.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "SPHINCS+",
    type: "Hash-based Signature",
    nist: "NIST PQC Standard",
    desc: "Stateless hash-based signature scheme used as a backup verification layer for long-term archive integrity.",
    color: "bg-green-50 border-green-200",
  },
];

const pipeline = [
  {
    step: "1",
    label: "Recommendation Generated",
    desc: "ML model outputs fertilizer dosage for farmer's query",
    icon: FileCheck,
    color: "text-green-600",
  },
  {
    step: "2",
    label: "PQC Signing",
    desc: "CRYSTALS-Dilithium signs the recommendation payload",
    icon: Key,
    color: "text-purple-600",
  },
  {
    step: "3",
    label: "Blockchain Recording",
    desc: "Signed payload recorded as immutable transaction",
    icon: Link2,
    color: "text-blue-600",
  },
  {
    step: "4",
    label: "Verification",
    desc: "Farmer or auditor can verify signature and chain integrity at any time",
    icon: ShieldCheck,
    color: "text-orange-600",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Blockchain + Post-Quantum Cryptography
          </h1>
          <p className="font-[family-name:var(--font-hind)] text-slate-500 mt-1">
            ব্লকচেইন ও পোস্ট-কোয়ান্টাম ক্রিপ্টোগ্রাফি
          </p>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            How this system ensures tamper-proof, future-proof security for
            every fertilizer recommendation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Why PQC */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">
              Why Post-Quantum Cryptography?
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Classical cryptographic algorithms (RSA, ECC) are vulnerable to
              quantum computers running Shor's algorithm. As quantum computing
              advances, agricultural data systems that rely on long-term data
              integrity - like this one - must adopt quantum-resistant
              algorithms now to protect future data. NIST finalized its first
              PQC standards in 2024.
            </p>
          </div>
        </section>

        {/* Security Pipeline */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Security Pipeline
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {pipeline.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.step} className="flex-1 relative">
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 h-full">
                    <Icon className={`w-6 h-6 mb-3 ${p.color}`} />
                    <div className="text-xs text-slate-400 font-medium mb-1">
                      Step {p.step}
                    </div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {p.label}
                    </div>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-slate-300 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Blockchain */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-600" /> Blockchain Layer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bcFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <div className="font-semibold text-slate-800 mb-2">
                  {f.title}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PQC Algorithms */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" /> PQC Algorithms Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pqcAlgorithms.map((a) => (
              <div key={a.name} className={`rounded-xl border p-6 ${a.color}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="font-bold text-slate-800">{a.name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">
                      {a.type}
                    </div>
                  </div>
                  <Badge className="bg-white text-slate-600 border border-slate-200 text-xs shrink-0">
                    {a.nist}
                  </Badge>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mock transaction log */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Sample Transaction Log
          </h2>
          <p className="text-slate-500 text-sm mb-5">
            Example of how a recommendation is recorded on the blockchain.
          </p>
          <div className="bg-slate-900 rounded-lg p-5 font-mono text-xs text-green-400 space-y-1 overflow-x-auto">
            <div>
              <span className="text-slate-500">// Block #482910</span>
            </div>
            <div>
              <span className="text-slate-400">timestamp:</span>{" "}
              <span className="text-white">2025-11-14T09:32:11Z</span>
            </div>
            <div>
              <span className="text-slate-400">tx_hash:</span>{" "}
              <span className="text-yellow-300">0x3A9F2C1B8E047D5A6F...</span>
            </div>
            <div>
              <span className="text-slate-400">location:</span>{" "}
              <span className="text-white">
                Sylhet / Habiganj / Chunarughat
              </span>
            </div>
            <div>
              <span className="text-slate-400">crop:</span>{" "}
              <span className="text-white">Boro dhan / BRRI dhan29</span>
            </div>
            <div>
              <span className="text-slate-400">recommendation:</span>
            </div>
            <div className="pl-4">
              <span className="text-slate-400">Urea:</span>{" "}
              <span className="text-white">180kg/ha</span>
            </div>
            <div className="pl-4">
              <span className="text-slate-400">TSP:</span>{" "}
              <span className="text-white">75kg/ha</span>
            </div>
            <div className="pl-4">
              <span className="text-slate-400">MOP:</span>{" "}
              <span className="text-white">60kg/ha</span>
            </div>
            <div>
              <span className="text-slate-400">pqc_signature:</span>{" "}
              <span className="text-purple-300">
                Dilithium3::3082010a02820101...
              </span>
            </div>
            <div>
              <span className="text-slate-400">kyber_kem:</span>{" "}
              <span className="text-blue-300">
                Kyber768::encapsulated_key_a3f...
              </span>
            </div>
            <div>
              <span className="text-slate-400">status:</span>{" "}
              <span className="text-green-400">VERIFIED ✓</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
