import {createContext, useMemo, useState} from "react";
import useServices from "../hooks/use-services";

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({children}) {
  const translateService = useServices().translate;
  const apiService = useServices().api

  const lang = translateService.lang;
  const setLangToService = (lang) => translateService.lang = lang;

  const [_, setStateLanguage] = useState(lang);

  const setLang = (newLang) =>{
    setLangToService(newLang)
    setStateLanguage(newLang);
  }


  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang,
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => translateService.translate(text, number)
  }), [lang]);

  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}
