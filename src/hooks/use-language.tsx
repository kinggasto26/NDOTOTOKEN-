"use client";
import { useState, useEffect } from "react";
import sw from "@/locales/sw.json";
import en from "@/locales/en.json";

const translations: any = { sw, en };

export function useLanguage(defaultLang: string = "en") {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    const userLang = tg?.initDataUnsafe?.user?.language_code;
    if (userLang?.startsWith("sw")) setLang("sw");
    else setLang("en");
  }, []);

  function t(key: string) {
    return translations[lang][key] || key;
  }

  return { t, lang, setLang };
}