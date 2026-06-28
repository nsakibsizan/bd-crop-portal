"use client";
import {
  Mail,
  GraduationCap,
  Building2,
  Globe,
  FlaskConical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/langContext";
import Image from "next/image";

const team = [
  {
    name: "Najmus Sakib Sizan",
    nameBn: "নাজমুস সাকিব সিজান",
    role: "Researcher",
    roleBn: "গবেষক",
    institution: "Jagannath University, Dhaka",
    institutionBn: "জগন্নাথ বিশ্ববিদ্যালয়, ঢাকা",
    dept: "Department of Computer Science & Engineering",
    degree: "MPhil in Computer Science & Engineering",
    email: "nsakibsizan115@gmail.com",
    country: "Bangladesh",
    flag: "🇧🇩",
    tags: ["Machine Learning", "Blockchain", "Post-Quantum Cryptography"],
    initial: "NS",
    photo: "/images/NAJMUS SAKIB SIZAN.png" as string | null, // set to "/images/sakib.jpg" when ready
    accent: "from-green-700 to-green-500",
    ring: "ring-green-500",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    name: "Prof. Dr. Md. Abu Layek",
    nameBn: "অধ্যাপক ড. মোঃ আবু লায়েক",
    role: "Supervisor",
    roleBn: "তত্ত্বাবধায়ক",
    institution: "Jagannath University, Dhaka",
    institutionBn: "জগন্নাথ বিশ্ববিদ্যালয়, ঢাকা",
    dept: "Department of Computer Science & Engineering",
    degree: "Professor, PhD",
    email: "layek@cse.jnu.ac.bd",
    country: "Bangladesh",
    flag: "🇧🇩",
    tags: ["Cloud Computing", "IoT", "Machine Learning", "Blockchain"],
    initial: "SP",
    photo: "/images/ABU LAYEK.jpg", // set to "/images/layek.jpg" when ready
    accent: "from-blue-700 to-blue-500",
    ring: "ring-blue-500",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Dr. Khondokar Fida Hasan",
    nameBn: "ড. খন্দকার ফিদা হাসান",
    role: "Co-Supervisor",
    roleBn: "সহ-তত্ত্বাবধায়ক",
    institution: "University of New South Wales (UNSW), Canberra, Australia",
    institutionBn:
      "University of New South Wales (UNSW), Canberra, অস্ট্রেলিয়া",
    dept: "School of Professional Studies",
    degree: "Lecturer in Cybersecurity",
    email: "fida.hasan@unsw.edu.au",
    country: "Australia",
    flag: "🇦🇺",
    tags: [
      "Cybersecurity",
      "Trustworthy AI",
      "Quantum Tech & Enterprise Systems",
      "Digital Health",
    ],
    initial: "CS",
    photo: "/images/fida_hasan.png",
    accent: "from-purple-700 to-purple-500",
    ring: "ring-purple-500",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

function Avatar({
  photo,
  initial,
  accent,
  ring,
  size = "lg",
}: {
  photo: string | null;
  initial: string;
  accent: string;
  ring: string;
  size?: "lg" | "xl";
}) {
  const dim = size === "xl" ? "w-24 h-24 text-2xl" : "w-16 h-16 text-lg";
  return photo ? (
    <div
      className={`${dim} rounded-full overflow-hidden ring-4 ${ring} ring-offset-2 shrink-0`}
    >
      <Image
        src={photo}
        alt={initial}
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />
    </div>
  ) : (
    <div
      className={`${dim} rounded-full bg-gradient-to-br ${accent} text-white flex items-center justify-center font-bold ring-4 ${ring} ring-offset-2 shrink-0 select-none`}
    >
      {initial}
    </div>
  );
}

export default function TeamPage() {
  const { lang } = useLang();
  const t = (en: string, bn: string) => (lang === "en" ? en : bn);

  const [principal, ...supervisors] = team;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-700" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {t("Research Team", "গবেষণা দল")}
              </h1>
              <p
                className={`text-slate-400 text-sm mt-0.5 ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
              >
                {t("গবেষণা দল", "Research Team")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Principal Researcher - featured card */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5" />
            {t("Principal Researcher", "মূল গবেষক")}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${principal.accent}`} />
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
              <Avatar
                photo={principal.photo}
                initial={principal.initial}
                accent={principal.accent}
                ring={principal.ring}
                size="xl"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {principal.name}
                    </h2>
                    <div
                      className={`text-slate-400 text-sm mt-0.5 ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
                    >
                      {principal.nameBn}
                    </div>
                  </div>
                  <span className="text-lg">{principal.flag}</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  {t(principal.role, principal.roleBn)}
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>
                      {t(principal.institution, principal.institutionBn)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>{principal.degree}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Mail className="w-4 h-4 text-slate-300 shrink-0" />
                    <a
                      href={`mailto:${principal.email}`}
                      className="hover:text-green-600 transition-colors"
                    >
                      {principal.email}
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {principal.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={`text-xs border ${principal.badgeColor}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supervisors */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            {t("Supervisory Committee", "তত্ত্বাবধায়ক কমিটি")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {supervisors.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
              >
                <div className={`h-1.5 bg-gradient-to-r ${m.accent}`} />
                <div className="p-6 flex gap-4 flex-1">
                  <Avatar
                    photo={m.photo}
                    initial={m.initial}
                    accent={m.accent}
                    ring={m.ring}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-bold text-slate-800 text-base leading-tight">
                        {m.name}
                      </h3>
                      <span className="text-base shrink-0">{m.flag}</span>
                    </div>
                    <div
                      className={`text-slate-400 text-xs mt-0.5 ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
                    >
                      {m.nameBn}
                    </div>
                    <div
                      className={`mt-1.5 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${m.badgeColor}`}
                    >
                      {t(m.role, m.roleBn)}
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <span className="truncate">
                          {t(m.institution, m.institutionBn)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <span>{m.degree}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <span>{m.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <a
                          href={`mailto:${m.email}`}
                          className="hover:text-blue-600 transition-colors truncate"
                        >
                          {m.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {m.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className={`text-xs border ${m.badgeColor}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institution
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
            {t("Institutional Affiliation", "প্রাতিষ্ঠানিক সংযুক্তি")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-lg">
                🇧🇩
              </div>
              <div>
                <div className="font-bold text-slate-800">
                  Jagannath University
                </div>
                <div
                  className={`text-slate-400 text-sm ${lang === "en" ? "font-[family-name:var(--font-hind)]" : ""}`}
                >
                  জগন্নাথ বিশ্ববিদ্যালয়
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  9-10 Becharam Deuri, Dhaka-1100
                </div>
                <div className="text-slate-500 text-sm">
                  Dept. of Computer Science & Engineering
                </div>
                <a
                  href="https://www.jnu.ac.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 text-sm hover:underline mt-1 inline-block"
                >
                  www.jnu.ac.bd ↗
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 text-lg">
                🇦🇺
              </div>
              <div>
                <div className="font-bold text-slate-800">
                  University of [City], Australia
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  School of Computing & Information Systems
                </div>
                <div className="text-slate-500 text-sm">
                  International Research Collaboration
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
