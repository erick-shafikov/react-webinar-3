import {useCallback, useContext, useState, useMemo, useEffect, useSate} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import useServices from "./use-services";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";



/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // const store = useStore();
  // // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  // // Функция для смены локали
  // const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // // Функция для локализации текстов
  // const t = useCallback((text, number) => translate(lang, text, number), [lang]);
  //
  // return {lang, setLang, t};
  // return useContext(I18nContext);

  const translateService = useServices().translate;

  const [searchParams, setSearchParams] = useSearchParams();
  let lang = translateService.lang;
  const location = useLocation();
  const navigate = useNavigate()
  const [_, setState] = useState(lang);

  useEffect(()=>{
    const prevState = location.state;
    setSearchParams({lang}, {state: prevState})
  }, [])

  const t = useCallback((x, y) => {
    return translateService.translate(lang, x, y)
  }, [lang])

  const setLang = useCallback(newLang => {
    translateService.lang = newLang
    setState(newLang);
    setSearchParams({lang:newLang});
    const prevState = location.state
    navigate(location.pathname, {state: prevState})
  }, [lang])
  

  return {lang, setLang, t}
}
