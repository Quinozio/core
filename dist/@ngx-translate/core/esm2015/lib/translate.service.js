/**
 * @fileoverview added by tsickle
 * Generated from: lib/translate.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Inject, Injectable, InjectionToken } from "@angular/core";
import { concat, forkJoin, isObservable, of, defer } from "rxjs";
import { concatMap, map, shareReplay, switchMap, take } from "rxjs/operators";
import { MissingTranslationHandler } from "./missing-translation-handler";
import { TranslateCompiler } from "./translate.compiler";
import { TranslateLoader } from "./translate.loader";
import { TranslateParser } from "./translate.parser";
import { TranslateStore } from "./translate.store";
import { isDefined, mergeDeep } from "./util";
/** @type {?} */
export const USE_STORE = new InjectionToken('USE_STORE');
/** @type {?} */
export const USE_DEFAULT_LANG = new InjectionToken('USE_DEFAULT_LANG');
/** @type {?} */
export const DEFAULT_LANGUAGE = new InjectionToken('DEFAULT_LANGUAGE');
/** @type {?} */
export const USE_EXTEND = new InjectionToken('USE_EXTEND');
/**
 * @record
 */
export function TranslationChangeEvent() { }
if (false) {
    /** @type {?} */
    TranslationChangeEvent.prototype.translations;
    /** @type {?} */
    TranslationChangeEvent.prototype.lang;
}
/**
 * @record
 */
export function LangChangeEvent() { }
if (false) {
    /** @type {?} */
    LangChangeEvent.prototype.lang;
    /** @type {?} */
    LangChangeEvent.prototype.translations;
}
/**
 * @record
 */
export function DefaultLangChangeEvent() { }
if (false) {
    /** @type {?} */
    DefaultLangChangeEvent.prototype.lang;
    /** @type {?} */
    DefaultLangChangeEvent.prototype.translations;
}
export class TranslateService {
    /**
     *
     * @param {?} store an instance of the store (that is supposed to be unique)
     * @param {?} currentLoader An instance of the loader currently used
     * @param {?} compiler An instance of the compiler currently used
     * @param {?} parser An instance of the parser currently used
     * @param {?} missingTranslationHandler A handler for missing translations.
     * @param {?=} useDefaultLang whether we should use default language translation when current language translation is missing.
     * @param {?=} isolate whether this service should use the store or not
     * @param {?=} extend To make a child module extend (and use) translations from parent modules.
     * @param {?=} defaultLanguage Set the default language using configuration
     */
    constructor(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang = true, isolate = false, extend = false, defaultLanguage) {
        this.store = store;
        this.currentLoader = currentLoader;
        this.compiler = compiler;
        this.parser = parser;
        this.missingTranslationHandler = missingTranslationHandler;
        this.useDefaultLang = useDefaultLang;
        this.isolate = isolate;
        this.extend = extend;
        this.pending = false;
        this._onTranslationChange = new EventEmitter();
        this._onLangChange = new EventEmitter();
        this._onDefaultLangChange = new EventEmitter();
        this._langs = [];
        this._translations = {};
        this._translationRequests = {};
        /** set the default language from configuration */
        if (defaultLanguage) {
            this.setDefaultLang(defaultLanguage);
        }
    }
    /**
     * An EventEmitter to listen to translation change events
     * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onTranslationChange() {
        return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
    }
    /**
     * An EventEmitter to listen to lang change events
     * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onLangChange() {
        return (this.isolate && !this.extend) ? this._onLangChange : this.store.onLangChange;
    }
    /**
     * An EventEmitter to listen to default lang change events
     * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
     * @return {?}
     */
    get onDefaultLangChange() {
        return (this.isolate && !this.extend) ? this._onDefaultLangChange : this.store.onDefaultLangChange;
    }
    /**
     * The default lang to fallback when translations are missing on the current lang
     * @return {?}
     */
    get defaultLang() {
        return (this.isolate && !this.extend) ? this._defaultLang : this.store.defaultLang;
    }
    /**
     * @param {?} defaultLang
     * @return {?}
     */
    set defaultLang(defaultLang) {
        if (this.isolate && !this.extend) {
            this._defaultLang = defaultLang;
        }
        else {
            this.store.defaultLang = defaultLang;
        }
    }
    /**
     * The lang currently used
     * @return {?}
     */
    get currentLang() {
        return (this.isolate && !this.extend) ? this._currentLang : this.store.currentLang;
    }
    /**
     * @param {?} currentLang
     * @return {?}
     */
    set currentLang(currentLang) {
        if (this.isolate && !this.extend) {
            this._currentLang = currentLang;
        }
        else {
            this.store.currentLang = currentLang;
        }
    }
    /**
     * an array of langs
     * @return {?}
     */
    get langs() {
        return this.isolate ? this._langs : this.store.langs;
    }
    /**
     * @param {?} langs
     * @return {?}
     */
    set langs(langs) {
        if (this.isolate) {
            this._langs = langs;
        }
        else {
            this.store.langs = langs;
        }
    }
    /**
     * a list of translations per lang
     * @return {?}
     */
    get translations() {
        return this.isolate ? this._translations : this.store.translations;
    }
    /**
     * @param {?} translations
     * @return {?}
     */
    set translations(translations) {
        if (this.isolate) {
            this._translations = translations;
        }
        else {
            this.store.translations = translations;
        }
    }
    /**
     * Sets the default language to use as a fallback
     * @param {?} lang
     * @return {?}
     */
    setDefaultLang(lang) {
        if (lang === this.defaultLang) {
            return;
        }
        /** @type {?} */
        let pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the defaultLang immediately
            if (this.defaultLang == null) {
                this.defaultLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                this.changeDefaultLang(lang);
            }));
        }
        else { // we already have this language
            this.changeDefaultLang(lang);
        }
    }
    /**
     * Gets the default language used
     * @return {?}
     */
    getDefaultLang() {
        return this.defaultLang;
    }
    /**
     * Changes the lang currently used
     * @param {?} lang
     * @return {?}
     */
    use(lang) {
        // don't change the language if the language given is already selected
        if (lang === this.currentLang) {
            return of(this.translations[lang]);
        }
        /** @type {?} */
        let pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.pipe(take(1))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                this.changeLang(lang);
            }));
            return pending;
        }
        else { // we have this language, return an Observable
            this.changeLang(lang);
            return of(this.translations[lang]);
        }
    }
    /**
     * Retrieves the given translations
     * @private
     * @param {?} lang
     * @return {?}
     */
    retrieveTranslations(lang) {
        /** @type {?} */
        let pending;
        // if this language is unavailable or extend is true, ask for it
        if (typeof this.translations[lang] === "undefined" || this.extend) {
            this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
            pending = this._translationRequests[lang];
        }
        return pending;
    }
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        this.pending = true;
        /** @type {?} */
        const loadingTranslations = this.currentLoader.getTranslation(lang).pipe(shareReplay(1), take(1));
        this.loadingTranslations = loadingTranslations.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.compiler.compileTranslations(res, lang))), shareReplay(1), take(1));
        this.loadingTranslations
            .subscribe({
            next: (/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                this.translations[lang] = this.extend && this.translations[lang] ? Object.assign(Object.assign({}, res), this.translations[lang]) : res;
                this.updateLangs();
                this.pending = false;
            }),
            error: (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.pending = false;
            })
        });
        return loadingTranslations;
    }
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param {?} lang
     * @param {?} translations
     * @param {?=} shouldMerge
     * @return {?}
     */
    setTranslation(lang, translations, shouldMerge = false) {
        translations = this.compiler.compileTranslations(translations, lang);
        if ((shouldMerge || this.extend) && this.translations[lang]) {
            this.translations[lang] = mergeDeep(this.translations[lang], translations);
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Returns an array of currently available langs
     * @return {?}
     */
    getLangs() {
        return this.langs;
    }
    /**
     * Add available langs
     * @param {?} langs
     * @return {?}
     */
    addLangs(langs) {
        langs.forEach((/**
         * @param {?} lang
         * @return {?}
         */
        (lang) => {
            if (this.langs.indexOf(lang) === -1) {
                this.langs.push(lang);
            }
        }));
    }
    /**
     * Update the list of available langs
     * @private
     * @return {?}
     */
    updateLangs() {
        this.addLangs(Object.keys(this.translations));
    }
    /**
     * Returns the parsed result of the translations
     * @param {?} translations
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getParsedResult(translations, key, interpolateParams) {
        /** @type {?} */
        let res;
        if (key instanceof Array) {
            /** @type {?} */
            let result = {};
            /** @type {?} */
            let observables = false;
            for (let k of key) {
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (isObservable(result[k])) {
                    observables = true;
                }
            }
            if (observables) {
                /** @type {?} */
                const sources = key.map((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => isObservable(result[k]) ? result[k] : of((/** @type {?} */ (result[k])))));
                return forkJoin(sources).pipe(map((/**
                 * @param {?} arr
                 * @return {?}
                 */
                (arr) => {
                    /** @type {?} */
                    let obj = {};
                    arr.forEach((/**
                     * @param {?} value
                     * @param {?} index
                     * @return {?}
                     */
                    (value, index) => {
                        obj[key[index]] = value;
                    }));
                    return obj;
                })));
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === "undefined" && this.defaultLang != null && this.defaultLang !== this.currentLang && this.useDefaultLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (typeof res === "undefined") {
            /** @type {?} */
            let params = { key, translateService: this };
            if (typeof interpolateParams !== 'undefined') {
                params.interpolateParams = interpolateParams;
            }
            res = this.missingTranslationHandler.handle(params);
        }
        return typeof res !== "undefined" ? res : key;
    }
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} the translated key, or an object of translated keys
     */
    get(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return this.loadingTranslations.pipe(concatMap((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                res = this.getParsedResult(res, key, interpolateParams);
                return isObservable(res) ? res : of(res);
            })));
        }
        else {
            /** @type {?} */
            let res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            return isObservable(res) ? res : of(res);
        }
    }
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the translation changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    getStreamOnTranslationChange(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        return concat(defer((/**
         * @return {?}
         */
        () => this.get(key, interpolateParams))), this.onTranslationChange.pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const res = this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                return res;
            }
            else {
                return of(res);
            }
        }))));
    }
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?} A stream of the translated key, or an object of translated keys
     */
    stream(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        return concat(defer((/**
         * @return {?}
         */
        () => this.get(key, interpolateParams))), this.onLangChange.pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const res = this.getParsedResult(event.translations, key, interpolateParams);
            return isObservable(res) ? res : of(res);
        }))));
    }
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    instant(key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error(`Parameter "key" required`);
        }
        /** @type {?} */
        let res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (isObservable(res)) {
            if (key instanceof Array) {
                /** @type {?} */
                let obj = {};
                key.forEach((/**
                 * @param {?} value
                 * @param {?} index
                 * @return {?}
                 */
                (value, index) => {
                    obj[key[index]] = key[index];
                }));
                return obj;
            }
            return key;
        }
        else {
            return res;
        }
    }
    /**
     * Sets the translated value of a key, after compiling it
     * @param {?} key
     * @param {?} value
     * @param {?=} lang
     * @return {?}
     */
    set(key, value, lang = this.currentLang) {
        this.translations[lang][key] = this.compiler.compile(value, lang);
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Changes the current lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    changeLang(lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
        // if there is no default lang, use the one that we just set
        if (this.defaultLang == null) {
            this.changeDefaultLang(lang);
        }
    }
    /**
     * Changes the default lang
     * @private
     * @param {?} lang
     * @return {?}
     */
    changeDefaultLang(lang) {
        this.defaultLang = lang;
        this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
    }
    /**
     * Allows to reload the lang file from the file
     * @param {?} lang
     * @return {?}
     */
    reloadLang(lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    }
    /**
     * Deletes inner translation
     * @param {?} lang
     * @return {?}
     */
    resetLang(lang) {
        this._translationRequests[lang] = undefined;
        this.translations[lang] = undefined;
    }
    /**
     * Returns the language code name from the browser, e.g. "de"
     * @return {?}
     */
    getBrowserLang() {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        let browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (typeof browserLang === 'undefined') {
            return undefined;
        }
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    }
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     * @return {?}
     */
    getBrowserCultureLang() {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        /** @type {?} */
        let browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        return browserCultureLang;
    }
}
TranslateService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TranslateService.ctorParameters = () => [
    { type: TranslateStore },
    { type: TranslateLoader },
    { type: TranslateCompiler },
    { type: TranslateParser },
    { type: MissingTranslationHandler },
    { type: Boolean, decorators: [{ type: Inject, args: [USE_DEFAULT_LANG,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [USE_STORE,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [USE_EXTEND,] }] },
    { type: String, decorators: [{ type: Inject, args: [DEFAULT_LANGUAGE,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.loadingTranslations;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.pending;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onTranslationChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._onDefaultLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._defaultLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._currentLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._langs;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._translations;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype._translationRequests;
    /** @type {?} */
    TranslateService.prototype.store;
    /** @type {?} */
    TranslateService.prototype.currentLoader;
    /** @type {?} */
    TranslateService.prototype.compiler;
    /** @type {?} */
    TranslateService.prototype.parser;
    /** @type {?} */
    TranslateService.prototype.missingTranslationHandler;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.useDefaultLang;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    TranslateService.prototype.extend;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdHJhbnNsYXRlL2NvcmUvc3JjL2xpYi90cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUMseUJBQXlCLEVBQWtDLE1BQU0sK0JBQStCLENBQUM7QUFDekcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUM7O0FBRTVDLE1BQU0sT0FBTyxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQVMsV0FBVyxDQUFDOztBQUNoRSxNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQVMsa0JBQWtCLENBQUM7O0FBQzlFLE1BQU0sT0FBTyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBUyxrQkFBa0IsQ0FBQzs7QUFDOUUsTUFBTSxPQUFPLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUM7Ozs7QUFF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QUFtRDs7Ozs7SUFDbkQsa0NBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7Y29uY2F0LCBmb3JrSm9pbiwgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBvZiwgZGVmZXJ9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7Y29uY2F0TWFwLCBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAsIHRha2V9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXN9IGZyb20gXCIuL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xyXG5pbXBvcnQge1RyYW5zbGF0ZUNvbXBpbGVyfSBmcm9tIFwiLi90cmFuc2xhdGUuY29tcGlsZXJcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXJ9IGZyb20gXCIuL3RyYW5zbGF0ZS5sb2FkZXJcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXJ9IGZyb20gXCIuL3RyYW5zbGF0ZS5wYXJzZXJcIjtcclxuXHJcbmltcG9ydCB7VHJhbnNsYXRlU3RvcmV9IGZyb20gXCIuL3RyYW5zbGF0ZS5zdG9yZVwiO1xyXG5pbXBvcnQge2lzRGVmaW5lZCwgbWVyZ2VEZWVwfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVVNFX1NUT1JFID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1VTRV9TVE9SRScpO1xyXG5leHBvcnQgY29uc3QgVVNFX0RFRkFVTFRfTEFORyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVU0VfREVGQVVMVF9MQU5HJyk7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0xBTkdVQUdFID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0RFRkFVTFRfTEFOR1VBR0UnKTtcclxuZXhwb3J0IGNvbnN0IFVTRV9FWFRFTkQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignVVNFX0VYVEVORCcpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50IHtcclxuICB0cmFuc2xhdGlvbnM6IGFueTtcclxuICBsYW5nOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0NoYW5nZUV2ZW50IHtcclxuICBsYW5nOiBzdHJpbmc7XHJcbiAgdHJhbnNsYXRpb25zOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGVmYXVsdExhbmdDaGFuZ2VFdmVudCB7XHJcbiAgbGFuZzogc3RyaW5nO1xyXG4gIHRyYW5zbGF0aW9uczogYW55O1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBXaW5kb3cge1xyXG4gIG5hdmlnYXRvcjogYW55O1xyXG59XHJcblxyXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogV2luZG93O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBsb2FkaW5nVHJhbnNsYXRpb25zOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgcHJpdmF0ZSBwZW5kaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfb25UcmFuc2xhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PigpO1xyXG4gIHByaXZhdGUgX29uTGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhbmdDaGFuZ2VFdmVudD4oKTtcclxuICBwcml2YXRlIF9vbkRlZmF1bHRMYW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGVmYXVsdExhbmdDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+KCk7XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdExhbmc6IHN0cmluZztcclxuICBwcml2YXRlIF9jdXJyZW50TGFuZzogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2xhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25zOiBhbnkgPSB7fTtcclxuICBwcml2YXRlIF90cmFuc2xhdGlvblJlcXVlc3RzOiBhbnkgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byB0cmFuc2xhdGlvbiBjaGFuZ2UgZXZlbnRzXHJcbiAgICogb25UcmFuc2xhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICogfSk7XHJcbiAgICovXHJcbiAgZ2V0IG9uVHJhbnNsYXRpb25DaGFuZ2UoKTogRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9vblRyYW5zbGF0aW9uQ2hhbmdlIDogdGhpcy5zdG9yZS5vblRyYW5zbGF0aW9uQ2hhbmdlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBsYW5nIGNoYW5nZSBldmVudHNcclxuICAgKiBvbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICogfSk7XHJcbiAgICovXHJcbiAgZ2V0IG9uTGFuZ0NoYW5nZSgpOiBFdmVudEVtaXR0ZXI8TGFuZ0NoYW5nZUV2ZW50PiB7XHJcbiAgICByZXR1cm4gKHRoaXMuaXNvbGF0ZSAmJiAhdGhpcy5leHRlbmQpID8gdGhpcy5fb25MYW5nQ2hhbmdlIDogdGhpcy5zdG9yZS5vbkxhbmdDaGFuZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGRlZmF1bHQgbGFuZyBjaGFuZ2UgZXZlbnRzXHJcbiAgICogb25EZWZhdWx0TGFuZ0NoYW5nZS5zdWJzY3JpYmUoKHBhcmFtczogRGVmYXVsdExhbmdDaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICogfSk7XHJcbiAgICovXHJcbiAgZ2V0IG9uRGVmYXVsdExhbmdDaGFuZ2UoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuaXNvbGF0ZSAmJiAhdGhpcy5leHRlbmQpID8gdGhpcy5fb25EZWZhdWx0TGFuZ0NoYW5nZSA6IHRoaXMuc3RvcmUub25EZWZhdWx0TGFuZ0NoYW5nZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWZhdWx0IGxhbmcgdG8gZmFsbGJhY2sgd2hlbiB0cmFuc2xhdGlvbnMgYXJlIG1pc3Npbmcgb24gdGhlIGN1cnJlbnQgbGFuZ1xyXG4gICAqL1xyXG4gIGdldCBkZWZhdWx0TGFuZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLmlzb2xhdGUgJiYgIXRoaXMuZXh0ZW5kKSA/IHRoaXMuX2RlZmF1bHRMYW5nIDogdGhpcy5zdG9yZS5kZWZhdWx0TGFuZztcclxuICB9XHJcblxyXG4gIHNldCBkZWZhdWx0TGFuZyhkZWZhdWx0TGFuZzogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5pc29sYXRlICYmICF0aGlzLmV4dGVuZCkge1xyXG4gICAgICB0aGlzLl9kZWZhdWx0TGFuZyA9IGRlZmF1bHRMYW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdG9yZS5kZWZhdWx0TGFuZyA9IGRlZmF1bHRMYW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxhbmcgY3VycmVudGx5IHVzZWRcclxuICAgKi9cclxuICBnZXQgY3VycmVudExhbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5pc29sYXRlICYmICF0aGlzLmV4dGVuZCkgPyB0aGlzLl9jdXJyZW50TGFuZyA6IHRoaXMuc3RvcmUuY3VycmVudExhbmc7XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudExhbmcoY3VycmVudExhbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuaXNvbGF0ZSAmJiAhdGhpcy5leHRlbmQpIHtcclxuICAgICAgdGhpcy5fY3VycmVudExhbmcgPSBjdXJyZW50TGFuZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuY3VycmVudExhbmcgPSBjdXJyZW50TGFuZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGFuIGFycmF5IG9mIGxhbmdzXHJcbiAgICovXHJcbiAgZ2V0IGxhbmdzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmlzb2xhdGUgPyB0aGlzLl9sYW5ncyA6IHRoaXMuc3RvcmUubGFuZ3M7XHJcbiAgfVxyXG5cclxuICBzZXQgbGFuZ3MobGFuZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAodGhpcy5pc29sYXRlKSB7XHJcbiAgICAgIHRoaXMuX2xhbmdzID0gbGFuZ3M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlLmxhbmdzID0gbGFuZ3M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhIGxpc3Qgb2YgdHJhbnNsYXRpb25zIHBlciBsYW5nXHJcbiAgICovXHJcbiAgZ2V0IHRyYW5zbGF0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNvbGF0ZSA/IHRoaXMuX3RyYW5zbGF0aW9ucyA6IHRoaXMuc3RvcmUudHJhbnNsYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgc2V0IHRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xyXG4gICAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlLnRyYW5zbGF0aW9ucyA9IHRyYW5zbGF0aW9ucztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0b3JlIGFuIGluc3RhbmNlIG9mIHRoZSBzdG9yZSAodGhhdCBpcyBzdXBwb3NlZCB0byBiZSB1bmlxdWUpXHJcbiAgICogQHBhcmFtIGN1cnJlbnRMb2FkZXIgQW4gaW5zdGFuY2Ugb2YgdGhlIGxvYWRlciBjdXJyZW50bHkgdXNlZFxyXG4gICAqIEBwYXJhbSBjb21waWxlciBBbiBpbnN0YW5jZSBvZiB0aGUgY29tcGlsZXIgY3VycmVudGx5IHVzZWRcclxuICAgKiBAcGFyYW0gcGFyc2VyIEFuIGluc3RhbmNlIG9mIHRoZSBwYXJzZXIgY3VycmVudGx5IHVzZWRcclxuICAgKiBAcGFyYW0gbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBBIGhhbmRsZXIgZm9yIG1pc3NpbmcgdHJhbnNsYXRpb25zLlxyXG4gICAqIEBwYXJhbSB1c2VEZWZhdWx0TGFuZyB3aGV0aGVyIHdlIHNob3VsZCB1c2UgZGVmYXVsdCBsYW5ndWFnZSB0cmFuc2xhdGlvbiB3aGVuIGN1cnJlbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gaXMgbWlzc2luZy5cclxuICAgKiBAcGFyYW0gaXNvbGF0ZSB3aGV0aGVyIHRoaXMgc2VydmljZSBzaG91bGQgdXNlIHRoZSBzdG9yZSBvciBub3RcclxuICAgKiBAcGFyYW0gZXh0ZW5kIFRvIG1ha2UgYSBjaGlsZCBtb2R1bGUgZXh0ZW5kIChhbmQgdXNlKSB0cmFuc2xhdGlvbnMgZnJvbSBwYXJlbnQgbW9kdWxlcy5cclxuICAgKiBAcGFyYW0gZGVmYXVsdExhbmd1YWdlIFNldCB0aGUgZGVmYXVsdCBsYW5ndWFnZSB1c2luZyBjb25maWd1cmF0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHVibGljIHN0b3JlOiBUcmFuc2xhdGVTdG9yZSxcclxuICAgICAgICAgICAgICBwdWJsaWMgY3VycmVudExvYWRlcjogVHJhbnNsYXRlTG9hZGVyLFxyXG4gICAgICAgICAgICAgIHB1YmxpYyBjb21waWxlcjogVHJhbnNsYXRlQ29tcGlsZXIsXHJcbiAgICAgICAgICAgICAgcHVibGljIHBhcnNlcjogVHJhbnNsYXRlUGFyc2VyLFxyXG4gICAgICAgICAgICAgIHB1YmxpYyBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX0RFRkFVTFRfTEFORykgcHJpdmF0ZSB1c2VEZWZhdWx0TGFuZzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgICAgICAgQEluamVjdChVU0VfU1RPUkUpIHByaXZhdGUgaXNvbGF0ZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoVVNFX0VYVEVORCkgcHJpdmF0ZSBleHRlbmQ6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICAgICAgICBASW5qZWN0KERFRkFVTFRfTEFOR1VBR0UpIGRlZmF1bHRMYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAvKiogc2V0IHRoZSBkZWZhdWx0IGxhbmd1YWdlIGZyb20gY29uZmlndXJhdGlvbiAqL1xyXG4gICAgaWYgKGRlZmF1bHRMYW5ndWFnZSkge1xyXG4gICAgICB0aGlzLnNldERlZmF1bHRMYW5nKGRlZmF1bHRMYW5ndWFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHRvIHVzZSBhcyBhIGZhbGxiYWNrXHJcbiAgICovXHJcbiAgcHVibGljIHNldERlZmF1bHRMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKGxhbmcgPT09IHRoaXMuZGVmYXVsdExhbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwZW5kaW5nOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnJldHJpZXZlVHJhbnNsYXRpb25zKGxhbmcpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcGVuZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAvLyBvbiBpbml0IHNldCB0aGUgZGVmYXVsdExhbmcgaW1tZWRpYXRlbHlcclxuICAgICAgaWYgKHRoaXMuZGVmYXVsdExhbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwZW5kaW5nLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7IC8vIHdlIGFscmVhZHkgaGF2ZSB0aGlzIGxhbmd1YWdlXHJcbiAgICAgIHRoaXMuY2hhbmdlRGVmYXVsdExhbmcobGFuZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHVzZWRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RGVmYXVsdExhbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmRlZmF1bHRMYW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyB0aGUgbGFuZyBjdXJyZW50bHkgdXNlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1c2UobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIC8vIGRvbid0IGNoYW5nZSB0aGUgbGFuZ3VhZ2UgaWYgdGhlIGxhbmd1YWdlIGdpdmVuIGlzIGFscmVhZHkgc2VsZWN0ZWRcclxuICAgIGlmIChsYW5nID09PSB0aGlzLmN1cnJlbnRMYW5nKSB7XHJcbiAgICAgIHJldHVybiBvZih0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBlbmRpbmc6IE9ic2VydmFibGU8YW55PiA9IHRoaXMucmV0cmlldmVUcmFuc2xhdGlvbnMobGFuZyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBwZW5kaW5nICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIC8vIG9uIGluaXQgc2V0IHRoZSBjdXJyZW50TGFuZyBpbW1lZGlhdGVseVxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudExhbmcpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYW5nID0gbGFuZztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGVuZGluZy5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBwZW5kaW5nO1xyXG4gICAgfSBlbHNlIHsgLy8gd2UgaGF2ZSB0aGlzIGxhbmd1YWdlLCByZXR1cm4gYW4gT2JzZXJ2YWJsZVxyXG4gICAgICB0aGlzLmNoYW5nZUxhbmcobGFuZyk7XHJcblxyXG4gICAgICByZXR1cm4gb2YodGhpcy50cmFuc2xhdGlvbnNbbGFuZ10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSBnaXZlbiB0cmFuc2xhdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJldHJpZXZlVHJhbnNsYXRpb25zKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcGVuZGluZzogT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICAgIC8vIGlmIHRoaXMgbGFuZ3VhZ2UgaXMgdW5hdmFpbGFibGUgb3IgZXh0ZW5kIGlzIHRydWUsIGFzayBmb3IgaXRcclxuICAgIGlmICh0eXBlb2YgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPT09IFwidW5kZWZpbmVkXCIgfHwgdGhpcy5leHRlbmQpIHtcclxuICAgICAgdGhpcy5fdHJhbnNsYXRpb25SZXF1ZXN0c1tsYW5nXSA9IHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ10gfHwgdGhpcy5nZXRUcmFuc2xhdGlvbihsYW5nKTtcclxuICAgICAgcGVuZGluZyA9IHRoaXMuX3RyYW5zbGF0aW9uUmVxdWVzdHNbbGFuZ107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2Ugd2l0aCB0aGUgY3VycmVudCBsb2FkZXJcclxuICAgKiBhbmQgcGFzc2VzIGl0IHRocm91Z2ggdGhlIGNvbXBpbGVyXHJcbiAgICovXHJcbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xyXG4gICAgY29uc3QgbG9hZGluZ1RyYW5zbGF0aW9ucyA9IHRoaXMuY3VycmVudExvYWRlci5nZXRUcmFuc2xhdGlvbihsYW5nKS5waXBlKFxyXG4gICAgICBzaGFyZVJlcGxheSgxKSxcclxuICAgICAgdGFrZSgxKSxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nVHJhbnNsYXRpb25zID0gbG9hZGluZ1RyYW5zbGF0aW9ucy5waXBlKFxyXG4gICAgICBtYXAoKHJlczogT2JqZWN0KSA9PiB0aGlzLmNvbXBpbGVyLmNvbXBpbGVUcmFuc2xhdGlvbnMocmVzLCBsYW5nKSksXHJcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxyXG4gICAgICB0YWtlKDEpLFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmxvYWRpbmdUcmFuc2xhdGlvbnNcclxuICAgICAgLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dDogKHJlczogT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHRoaXMuZXh0ZW5kICYmIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID8geyAuLi5yZXMsIC4uLnRoaXMudHJhbnNsYXRpb25zW2xhbmddIH0gOiByZXM7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUxhbmdzKCk7XHJcbiAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGxvYWRpbmdUcmFuc2xhdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYW51YWxseSBzZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2VcclxuICAgKiBhZnRlciBwYXNzaW5nIGl0IHRocm91Z2ggdGhlIGNvbXBpbGVyXHJcbiAgICovXHJcbiAgcHVibGljIHNldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZywgdHJhbnNsYXRpb25zOiBPYmplY3QsIHNob3VsZE1lcmdlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgIHRyYW5zbGF0aW9ucyA9IHRoaXMuY29tcGlsZXIuY29tcGlsZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMsIGxhbmcpO1xyXG4gICAgaWYgKChzaG91bGRNZXJnZSB8fCB0aGlzLmV4dGVuZCkgJiYgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10pIHtcclxuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSBtZXJnZURlZXAodGhpcy50cmFuc2xhdGlvbnNbbGFuZ10sIHRyYW5zbGF0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHRyYW5zbGF0aW9ucztcclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcclxuICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGN1cnJlbnRseSBhdmFpbGFibGUgbGFuZ3NcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0TGFuZ3MoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYW5ncztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhdmFpbGFibGUgbGFuZ3NcclxuICAgKi9cclxuICBwdWJsaWMgYWRkTGFuZ3MobGFuZ3M6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuICAgIGxhbmdzLmZvckVhY2goKGxhbmc6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAodGhpcy5sYW5ncy5pbmRleE9mKGxhbmcpID09PSAtMSkge1xyXG4gICAgICAgIHRoaXMubGFuZ3MucHVzaChsYW5nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIGxhbmdzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVMYW5ncygpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkTGFuZ3MoT2JqZWN0LmtleXModGhpcy50cmFuc2xhdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBhcnNlZCByZXN1bHQgb2YgdGhlIHRyYW5zbGF0aW9uc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zOiBhbnksIGtleTogYW55LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IGFueSB7XHJcbiAgICBsZXQgcmVzOiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9LFxyXG4gICAgICAgIG9ic2VydmFibGVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGsgb2Yga2V5KSB7XHJcbiAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZShyZXN1bHRba10pKSB7XHJcbiAgICAgICAgICBvYnNlcnZhYmxlcyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvYnNlcnZhYmxlcykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBrZXkubWFwKGsgPT4gaXNPYnNlcnZhYmxlKHJlc3VsdFtrXSkgPyByZXN1bHRba10gOiBvZihyZXN1bHRba10gYXMgc3RyaW5nKSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKHNvdXJjZXMpLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKGFycjogQXJyYXk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgYXJyLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhbnNsYXRpb25zKSB7XHJcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRyYW5zbGF0aW9ucywga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGVmYXVsdExhbmcgIT0gbnVsbCAmJiB0aGlzLmRlZmF1bHRMYW5nICE9PSB0aGlzLmN1cnJlbnRMYW5nICYmIHRoaXMudXNlRGVmYXVsdExhbmcpIHtcclxuICAgICAgcmVzID0gdGhpcy5wYXJzZXIuaW50ZXJwb2xhdGUodGhpcy5wYXJzZXIuZ2V0VmFsdWUodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5kZWZhdWx0TGFuZ10sIGtleSksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHJlcyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBsZXQgcGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zID0ge2tleSwgdHJhbnNsYXRlU2VydmljZTogdGhpc307XHJcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJwb2xhdGVQYXJhbXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcGFyYW1zLmludGVycG9sYXRlUGFyYW1zID0gaW50ZXJwb2xhdGVQYXJhbXM7XHJcbiAgICAgIH1cclxuICAgICAgcmVzID0gdGhpcy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLmhhbmRsZShwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0eXBlb2YgcmVzICE9PSBcInVuZGVmaW5lZFwiID8gcmVzIDoga2V5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleSAob3IgYW4gYXJyYXkgb2Yga2V5cylcclxuICAgKiBAcmV0dXJucyB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xyXG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XHJcbiAgICB9XHJcbiAgICAvLyBjaGVjayBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyB0cmFuc2xhdGlvbiB0byB1c2VcclxuICAgIGlmICh0aGlzLnBlbmRpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZGluZ1RyYW5zbGF0aW9ucy5waXBlKFxyXG4gICAgICAgIGNvbmNhdE1hcCgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHJlcywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICByZXR1cm4gaXNPYnNlcnZhYmxlKHJlcykgPyByZXMgOiBvZihyZXMpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHJlcyA9IHRoaXMuZ2V0UGFyc2VkUmVzdWx0KHRoaXMudHJhbnNsYXRpb25zW3RoaXMuY3VycmVudExhbmddLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZShyZXMpID8gcmVzIDogb2YocmVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBzdHJlYW0gb2YgdHJhbnNsYXRlZCB2YWx1ZXMgb2YgYSBrZXkgKG9yIGFuIGFycmF5IG9mIGtleXMpIHdoaWNoIHVwZGF0ZXNcclxuICAgKiB3aGVuZXZlciB0aGUgdHJhbnNsYXRpb24gY2hhbmdlcy5cclxuICAgKiBAcmV0dXJucyBBIHN0cmVhbSBvZiB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0U3RyZWFtT25UcmFuc2xhdGlvbkNoYW5nZShrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+IHtcclxuICAgIGlmICghaXNEZWZpbmVkKGtleSkgfHwgIWtleS5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJrZXlcIiByZXF1aXJlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb25jYXQoXHJcbiAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpKSxcclxuICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlLnBpcGUoXHJcbiAgICAgICAgc3dpdGNoTWFwKChldmVudDogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQoZXZlbnQudHJhbnNsYXRpb25zLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBzdHJlYW0gb2YgdHJhbnNsYXRlZCB2YWx1ZXMgb2YgYSBrZXkgKG9yIGFuIGFycmF5IG9mIGtleXMpIHdoaWNoIHVwZGF0ZXNcclxuICAgKiB3aGVuZXZlciB0aGUgbGFuZ3VhZ2UgY2hhbmdlcy5cclxuICAgKiBAcmV0dXJucyBBIHN0cmVhbSBvZiB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcclxuICAgKi9cclxuICBwdWJsaWMgc3RyZWFtKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xyXG4gICAgaWYgKCFpc0RlZmluZWQoa2V5KSB8fCAha2V5Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbmNhdChcclxuICAgICAgZGVmZXIoKCkgPT4gdGhpcy5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcykpLFxyXG4gICAgICB0aGlzLm9uTGFuZ0NoYW5nZS5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQoZXZlbnQudHJhbnNsYXRpb25zLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgICAgICAgIHJldHVybiBpc09ic2VydmFibGUocmVzKSA/IHJlcyA6IG9mKHJlcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgdHJhbnNsYXRpb24gaW5zdGFudGx5IGZyb20gdGhlIGludGVybmFsIHN0YXRlIG9mIGxvYWRlZCB0cmFuc2xhdGlvbi5cclxuICAgKiBBbGwgcnVsZXMgcmVnYXJkaW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGV2ZW4gZmFsbGJhY2sgbGFuZ3VhZ2VzIHdpbGwgYmUgdXNlZCBleGNlcHQgYW55IHByb21pc2UgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGluc3RhbnQoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IHN0cmluZyB8IGFueSB7XHJcbiAgICBpZiAoIWlzRGVmaW5lZChrZXkpIHx8ICFrZXkubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwia2V5XCIgcmVxdWlyZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xyXG4gICAgaWYgKGlzT2JzZXJ2YWJsZShyZXMpKSB7XHJcbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xyXG4gICAgICAgIGtleS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBvYmpba2V5W2luZGV4XV0gPSBrZXlbaW5kZXhdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGtleTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5LCBhZnRlciBjb21waWxpbmcgaXRcclxuICAgKi9cclxuICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcgPSB0aGlzLmN1cnJlbnRMYW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXVtrZXldID0gdGhpcy5jb21waWxlci5jb21waWxlKHZhbHVlLCBsYW5nKTtcclxuICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcclxuICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGxhbmdcclxuICAgKi9cclxuICBwcml2YXRlIGNoYW5nZUxhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnRMYW5nID0gbGFuZztcclxuICAgIHRoaXMub25MYW5nQ2hhbmdlLmVtaXQoe2xhbmc6IGxhbmcsIHRyYW5zbGF0aW9uczogdGhpcy50cmFuc2xhdGlvbnNbbGFuZ119KTtcclxuXHJcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBkZWZhdWx0IGxhbmcsIHVzZSB0aGUgb25lIHRoYXQgd2UganVzdCBzZXRcclxuICAgIGlmICh0aGlzLmRlZmF1bHRMYW5nID09IG51bGwpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VEZWZhdWx0TGFuZyhsYW5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgdGhlIGRlZmF1bHQgbGFuZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hhbmdlRGVmYXVsdExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcclxuICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGxvd3MgdG8gcmVsb2FkIHRoZSBsYW5nIGZpbGUgZnJvbSB0aGUgZmlsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWxvYWRMYW5nKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICB0aGlzLnJlc2V0TGFuZyhsYW5nKTtcclxuICAgIHJldHVybiB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlcyBpbm5lciB0cmFuc2xhdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLl90cmFuc2xhdGlvblJlcXVlc3RzW2xhbmddID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBsYW5ndWFnZSBjb2RlIG5hbWUgZnJvbSB0aGUgYnJvd3NlciwgZS5nLiBcImRlXCJcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QnJvd3NlckxhbmcoKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYnJvd3Nlckxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xyXG4gICAgYnJvd3NlckxhbmcgPSBicm93c2VyTGFuZyB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlO1xyXG5cclxuICAgIGlmICh0eXBlb2YgYnJvd3NlckxhbmcgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYnJvd3NlckxhbmcuaW5kZXhPZignLScpICE9PSAtMSkge1xyXG4gICAgICBicm93c2VyTGFuZyA9IGJyb3dzZXJMYW5nLnNwbGl0KCctJylbMF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJyb3dzZXJMYW5nLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcclxuICAgICAgYnJvd3NlckxhbmcgPSBicm93c2VyTGFuZy5zcGxpdCgnXycpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBicm93c2VyTGFuZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1bHR1cmUgbGFuZ3VhZ2UgY29kZSBuYW1lIGZyb20gdGhlIGJyb3dzZXIsIGUuZy4gXCJkZS1ERVwiXHJcbiAgICovXHJcbiAgcHVibGljIGdldEJyb3dzZXJDdWx0dXJlTGFuZygpOiBzdHJpbmcge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBicm93c2VyQ3VsdHVyZUxhbmc6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VzID8gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsO1xyXG4gICAgYnJvd3NlckN1bHR1cmVMYW5nID0gYnJvd3NlckN1bHR1cmVMYW5nIHx8IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2U7XHJcblxyXG4gICAgcmV0dXJuIGJyb3dzZXJDdWx0dXJlTGFuZztcclxuICB9XHJcbn1cclxuIl19