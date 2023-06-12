import {useCallback, useContext, useState, useMemo, useEffect, useSate} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import {I18nContext} from "../i18n/context";
import useServices from "./use-services";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "./use-store";
import articleActions from '../store-redux/article/actions'
import { useDispatch } from "react-redux";


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

  const dispatch = useDispatch();
  const params = useParams();
  let lang = translateService.lang;
  const [_, setState] = useState(lang);
  const store = useStore();

  const t = useCallback((x, y) => {
    return translateService.translate(lang, x, y)
  }, [lang])

  const setLang = useCallback(newLang => {
    translateService.lang = newLang
    setState(newLang);
    store.actions.catalog.initParams();
    store.actions.categories.load();
    dispatch(articleActions.load(params.id));
  }, [lang])
  

  return {lang, setLang, t}
}
