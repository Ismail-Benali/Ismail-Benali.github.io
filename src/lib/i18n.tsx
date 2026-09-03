"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  nav_home: "home",
  nav_about: "about",
  nav_arsenal: "arsenal",
  nav_projects: "projects",
  nav_skills: "skills",
  nav_contact: "contact",
  nav_github: "github",

  // Hero
  hero_prompt: "root@helios:~$ whoami",
  hero_role_1: "offensive security researcher",
  hero_role_2: "osint expert",
  hero_role_3: "polyglot engineer",
  hero_tagline:
    "I build sovereign, self-sufficient tooling that depends on nothing but itself. Creator of HELIOS-NET.",
  hero_btn_projects: "open arsenal",
  hero_btn_github: "view github",
  hero_cursor: "_",

  // Section labels
  sec_about: "[ about ]",
  sec_arsenal: "[ arsenal ]",
  sec_projects: "[ projects ]",
  sec_skills: "[ skills ]",
  sec_contact: "[ contact ]",

  // About
  about_title: "sys.init( identity )",
  about_body:
    "Offensive security researcher and OSINT expert. I architect across Python, Go, and C — orchestration, high-performance networking, and kernel-adjacent stealth few frameworks combine. My work centers on sovereign systems that stand alone, move undetected, and hand all control to the operator.",
  highlight_1_t: "security research",
  highlight_1_d:
    "Offensive security, low-level evasion, and autonomous reconnaissance that run with zero external dependencies.",
  highlight_2_t: "osint & recon",
  highlight_2_d:
    "Open-source intelligence and network recon, crafting ethical tooling that surfaces public information.",
  highlight_3_t: "polyglot engineering",
  highlight_3_d:
    "Architecting across Python (orchestration), Go (networking), and C (stealth) in a single unified framework.",

  // Arsenal (HELIOS-NET breakdown)
  arsenal_title: "flagship :: HELIOS-NET",
  arsenal_sub:
    "A sovereign cyber warfare & offensive reconnaissance framework. Polyglot core — no external dependencies.",
  arsenal_core: "core / orchestration",
  arsenal_engine: "engine / pathfinding",
  arsenal_modules: "modules / discovery",
  arsenal_transport: "transport / native binaries",
  arsenal_wiki: "documentation",
  arsenal_open: "open source",
  arsenal_cta: "inspect the payload",

  // Projects
  projects_title: "deployed.repos",
  projects_sub: "A selection of tools forged for security, recon, and automation.",

  // Skills
  skills_title: "stack.trace",
  skills_sub: "Technologies I operate daily.",

  // Contact
  contact_title: "establish.link",
  contact_sub: "Open a secure channel — collaboration, cyber discussion, or OSINT research.",
  contact_github: "github",
  contact_email: "email",

  // Footer
  footer_built: "built with next.js_ on github pages",
  footer_prompt: "h3l!0s_t3k@portfolio:~$",
};

const ar: Dict = {
  nav_home: "الرئيسية",
  nav_about: "نبذة",
  nav_arsenal: "الترسانة",
  nav_projects: "المشاريع",
  nav_skills: "المهارات",
  nav_contact: "تواصل",
  nav_github: "جيت هب",

  hero_prompt: "root@helios:~$ whoami",
  hero_role_1: "باحث أمن هجومي",
  hero_role_2: "خبير OSINT",
  hero_role_3: "مهندس متعدد اللغات",
  hero_tagline:
    "أبني أدوات سيادية مكتفية ذاتياً لا تعتمد على شيء سوى نفسها. مبتكر HELIOS-NET.",
  hero_btn_projects: "فتح الترسانة",
  hero_btn_github: "عرض جيت هب",
  hero_cursor: "_",

  sec_about: "[ نبذة ]",
  sec_arsenal: "[ الترسانة ]",
  sec_projects: "[ المشاريع ]",
  sec_skills: "[ المهارات ]",
  sec_contact: "[ تواصل ]",

  about_title: "sys.init( الهوية )",
  about_body:
    "باحث أمن هجومي وخبير OSINT. أبني أنظمة عبر Python وGo وC — التنسيق والشبكات عالية الأداء والتخفي على مستوى النواة، وهي مزيج نادر تجمعه أطر قليلة. ينصب عملي على أنظمة سيادية تقف وحدها وتتحرك دون أن تُكتشف وتمنح المشغّل السيطرة الكاملة.",
  highlight_1_t: "بحث أمني",
  highlight_1_d:
    "أمن هجومي، تخفٍّ منخفض المستوى، واستطلاع ذاتي يعمل دون أي اعتماديات خارجية.",
  highlight_2_t: "OSINT والاستطلاع",
  highlight_2_d:
    "ذكاء مفتوح المصدر واستطلاع شبكات، وصناعة أدوات أخلاقية تُظهر المعلومات العامة.",
  highlight_3_t: "هندسة متعددة اللغات",
  highlight_3_d:
    "معمارية عبر Python (التنسيق) وGo (الشبكات) وC (التخفي) في إطار موحّد واحد.",

  arsenal_title: "الرائد :: HELIOS-NET",
  arsenal_sub:
    "إطار سيادي للحرب السيبرانية والاستطلاع الهجومي. نواة متعددة اللغات — دون أي اعتماديات خارجية.",
  arsenal_core: "core / التنسيق",
  arsenal_engine: "engine / إيجاد المسار",
  arsenal_modules: "modules / الاكتشاف",
  arsenal_transport: "transport / ملفات أصلية",
  arsenal_wiki: "التوثيق",
  arsenal_open: "مفتوح المصدر",
  arsenal_cta: "افحص الحمولة",

  projects_title: "deployed.repos",
  projects_sub: "مجموعة أدوات صُنعت للأمن والاستطلاع والأتمتة.",

  skills_title: "stack.trace",
  skills_sub: "تقنيات أُشغّلها يومياً.",

  contact_title: "establish.link",
  contact_sub: "افتح قناة آمنة — تعاون، نقاش سيبراني، أو بحث OSINT.",
  contact_github: "جيت هب",
  contact_email: "البريد",

  footer_built: "مبني بـ next.js_ على جيت هب بيجز",
  footer_prompt: "h3l!0s_t3k@portfolio:~$",
};

const dictionaries: Record<Lang, Dict> = { en, ar };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  isAr: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ar" || saved === "en") {
      applyLang(saved);
    }
  }, []);

  const applyLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    localStorage.setItem("lang", l);
  };

  const setLang = (l: Lang) => applyLang(l);

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isAr: lang === "ar" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
