import translate from "./translate";

class I18n {

  constructor(services, config = {}) {
    console.log('i18n inited')
    this.services = services;
    this.config = config
    this._lang = this.config.local;
  }

  translate = (text, plural) => {
    const lang = this._lang
    return translate(lang, text, plural);
  }

  set lang(lang){
    this._lang = lang;
    this.services.api.setHeader('Accept-Language', this.localHeader);
  }

  get lang(){
    return this._lang
  }

  get localHeader(){
    if(this._lang === 'ru') return 'ru-RU';
    if(this._lang === 'en') return 'en-US'
  }
}

export default I18n