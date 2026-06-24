"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", labelBn: "হোম" },
  { href: "/research", label: "Research", labelBn: "গবেষণা" },
  { href: "/data", label: "Data Explorer", labelBn: "ডেটা" },
  { href: "/prediction", label: "Prediction", labelBn: "পূর্বাভাস" },
  { href: "/security", label: "BC + PQC", labelBn: "নিরাপত্তা" },
  { href: "/team", label: "Team", labelBn: "দল" },
  { href: "/publications", label: "Publications", labelBn: "প্রকাশনা" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-green-700 text-lg">
            <Leaf className="w-5 h-5" />
            <span className={lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""}>
              {lang === "en" ? "BD Crop Portal" : "বিডি ক্রপ পোর্টাল"}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""}
                  ${pathname === link.href
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:text-green-700 hover:bg-slate-50"
                  }`}
              >
                {lang === "en" ? link.label : link.labelBn}
              </Link>
            ))}
          </div>

          {/* Lang toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3 py-1.5 rounded-full border border-green-600 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <button
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${lang === "bn" ? "font-[family-name:var(--font-hind)]" : ""}
                ${pathname === link.href
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:text-green-700"
                }`}
            >
              {lang === "en" ? link.label : link.labelBn}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}