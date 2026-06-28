import { BookOpen, FileText, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const publications = [
  {
    type: "thesis",
    title:
      "Quantum-Resistant Smart Agriculture: A Hybrid ML-Blockchain Architecture for Secure Farm Management",
    titleBn:
      "কৃষি ব্যবস্থাপনার জন্য একটি হাইব্রিড এমএল-ব্লকচেইন আর্কিটেকচার: একটি কোয়ান্টাম-প্রতিরোধী স্মার্ট কৃষি সমাধান",
    authors:
      "Najmus Sakib Sizan, Md. Abu Layek, Basker Palaniswamy, Md Morshedul Islam, and Khondokar Fida Hasan",
    // venue: "MPhil Thesis, Jagannath University",
    year: "2026 (In Progress)",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
];

const relatedWorks = [
  {
    title: "NIST Post-Quantum Cryptography Standardization",
    year: "2024",
    venue: "NIST",
    url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
  },
  {
    title: "Bangladesh Crop Zoning Information System",
    year: "2023",
    venue: "DAE, Bangladesh",
    url: "https://czis.cropzoning.gov.bd",
  },
];

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Publications</h1>
          <p className="font-[family-name:var(--font-hind)] text-slate-500 mt-1">
            প্রকাশনা
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="space-y-4">
          {publications.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${p.type === "thesis" ? "bg-green-100" : "bg-blue-100"}`}
                >
                  {p.type === "thesis" ? (
                    <BookOpen className="w-5 h-5 text-green-700" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <Badge className={p.statusColor}>{p.status}</Badge>
                    <Badge className="bg-slate-100 text-slate-600 capitalize">
                      {p.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 leading-snug">
                    {p.title}
                  </h3>
                  {p.titleBn && (
                    <p className="font-[family-name:var(--font-hind)] text-slate-400 text-sm mt-1">
                      {p.titleBn}
                    </p>
                  )}
                  <div className="mt-3 space-y-1">
                    <div className="text-slate-500 text-sm">{p.authors}</div>
                    <div className="text-slate-400 text-sm flex items-center gap-1.5">
                      {/* <Calendar className="w-3.5 h-3.5" /> {p.venue} · {p.year} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related works */}
        <section className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            Key References & Related Works
          </h2>
          <div className="space-y-3">
            {relatedWorks.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-0"
              >
                <div>
                  <div className="text-slate-700 text-sm font-medium">
                    {r.title}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {r.venue} · {r.year}
                  </div>
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
