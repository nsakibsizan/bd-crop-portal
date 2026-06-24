import { Mail, GraduationCap, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const team = [
  {
    name: "Md. Najmus Sakib Sizan",
    role: "Principal Researcher",
    roleBn: "মূল গবেষক",
    institution: "Jagannath University, Dhaka",
    dept: "Department of Computer Science & Engineering",
    degree: "MPhil in CSE (Ongoing)",
    email: "sakib@example.com",
    tags: ["Machine Learning", "Blockchain", "Post-Quantum Cryptography"],
    initial: "NS",
    color: "bg-green-600",
  },
  {
    name: "Supervisor Name",
    role: "Research Supervisor",
    roleBn: "গবেষণা তত্ত্বাবধায়ক",
    institution: "Jagannath University, Dhaka",
    dept: "Department of Computer Science & Engineering",
    degree: "Professor, PhD",
    email: "supervisor@ju.edu.bd",
    tags: ["AI", "Cryptography", "Agricultural Informatics"],
    initial: "SP",
    color: "bg-blue-600",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800">Research Team</h1>
          <p className="font-[family-name:var(--font-hind)] text-slate-500 mt-1">গবেষণা দল</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-5">
              <div className={`w-14 h-14 rounded-full ${m.color} text-white flex items-center justify-center text-lg font-bold shrink-0`}>
                {m.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800">{m.name}</div>
                <div className="text-green-700 font-medium text-sm">{m.role}</div>
                <div className="font-[family-name:var(--font-hind)] text-slate-400 text-sm">{m.roleBn}</div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Building2 className="w-3.5 h-3.5 shrink-0" /> {m.institution}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" /> {m.degree}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Mail className="w-3.5 h-3.5 shrink-0" /> {m.email}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {m.tags.map((t) => (
                    <Badge key={t} className="bg-slate-100 text-slate-600 text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institution */}
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Institutional Affiliation</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="font-semibold text-slate-700">Jagannath University</div>
              <div className="font-[family-name:var(--font-hind)] text-slate-400 text-sm">জগন্নাথ বিশ্ববিদ্যালয়</div>
              <div className="text-slate-500 text-sm mt-2">9-10 Becharam Deuri, Dhaka-1100, Bangladesh</div>
              <div className="text-slate-500 text-sm">www.jnu.ac.bd</div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-700">Department of CSE</div>
              <div className="text-slate-500 text-sm mt-2">Research focus: AI, Machine Learning, Cybersecurity, and Applied Cryptography</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}