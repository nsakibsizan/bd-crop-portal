"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "bn";

const LangContext = createContext<{
  lang: Lang;
  toggleLang: () => void;
}>({ lang: "en", toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "bn" : "en"));
  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}