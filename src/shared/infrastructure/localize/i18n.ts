import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { LanguageEnum } from "shared/enums/LanguageEnum";

const languages = [LanguageEnum.Cs, LanguageEnum.Pl];
// Zvolený jazyk z localstorage nebo default
const selectedLanguage = localStorage.getItem("i18nextLng") || LanguageEnum.Cs;

// Cesta k překladům pro daný projekt
const getPrefix = () => {
  let prefix = process.env.PUBLIC_URL || "https://localhost:3000";

  if (prefix !== "" && !prefix.endsWith("/")) prefix += "/";
  if (prefix === "") prefix += "/";

  return prefix;
};

const getLoadPath = (): string => {
  return `${getPrefix()}/locales/{{lng}}/{{ns}}.json?${
    process.env.REACT_APP_VERSION
  }`;
};

// Konfigurace pro načítání překladů
const backendOptions: HttpBackendOptions = {
  loadPath: getLoadPath(),
};

i18n
  //load translation using xhr -> see /public/locales
  //learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    backend: backendOptions,
    lng: selectedLanguage,
    fallbackLng: LanguageEnum.Cs,
    supportedLngs: languages,
    debug: process.env.REACT_APP_INSTANCE_NAME === "Dev",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
