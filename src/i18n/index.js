import translate from "./translate";

class I18n {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this._lang = this.config.local;
    // this.translate = this.translate.bind(this)
  }

  translate = (lang, text, plural) => {
    return translate(lang, text, plural);
  }

  set lang(lang){
    this._lang = lang;
    this.services.api.setHeader('Accept-Language', this._lang);

  }

  get lang(){
    return this._lang
  }
}

export default I18n