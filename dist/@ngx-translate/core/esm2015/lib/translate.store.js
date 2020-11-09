/**
 * @fileoverview added by tsickle
 * Generated from: lib/translate.store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from "@angular/core";
export class TranslateStore {
    constructor() {
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * a list of translations per lang
         */
        this.translations = {};
        /**
         * an array of langs
         */
        this.langs = [];
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         */
        this.onTranslationChange = new EventEmitter();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         */
        this.onLangChange = new EventEmitter();
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         */
        this.onDefaultLangChange = new EventEmitter();
    }
}
if (false) {
    /**
     * The default lang to fallback when translations are missing on the current lang
     * @type {?}
     */
    TranslateStore.prototype.defaultLang;
    /**
     * The lang currently used
     * @type {?}
     */
    TranslateStore.prototype.currentLang;
    /**
     * a list of translations per lang
     * @type {?}
     */
    TranslateStore.prototype.translations;
    /**
     * an array of langs
     * @type {?}
     */
    TranslateStore.prototype.langs;
    /**
     * An EventEmitter to listen to translation change events
     * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onTranslationChange;
    /**
     * An EventEmitter to listen to lang change events
     * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onLangChange;
    /**
     * An EventEmitter to listen to default lang change events
     * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
     * @type {?}
     */
    TranslateStore.prototype.onDefaultLangChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXRyYW5zbGF0ZS9jb3JlL3NyYy9saWIvdHJhbnNsYXRlLnN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sY0FBYztJQUEzQjs7OztRQVNTLGdCQUFXLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7OztRQUt2QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQzs7OztRQUt2QixVQUFLLEdBQWtCLEVBQUUsQ0FBQzs7Ozs7OztRQVExQix3QkFBbUIsR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7Ozs7Ozs7UUFRdkcsaUJBQVksR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7Ozs7Ozs7UUFRbEYsd0JBQW1CLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO0lBQ2hILENBQUM7Q0FBQTs7Ozs7O0lBeENDLHFDQUEyQjs7Ozs7SUFLM0IscUNBQThDOzs7OztJQUs5QyxzQ0FBOEI7Ozs7O0lBSzlCLCtCQUFpQzs7Ozs7Ozs7SUFRakMsNkNBQThHOzs7Ozs7OztJQVE5RyxzQ0FBeUY7Ozs7Ozs7O0lBUXpGLDZDQUE4RyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRMYW5nQ2hhbmdlRXZlbnQsIExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRpb25DaGFuZ2VFdmVudH0gZnJvbSBcIi4vdHJhbnNsYXRlLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVTdG9yZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGRlZmF1bHQgbGFuZyB0byBmYWxsYmFjayB3aGVuIHRyYW5zbGF0aW9ucyBhcmUgbWlzc2luZyBvbiB0aGUgY3VycmVudCBsYW5nXHJcbiAgICovXHJcbiAgcHVibGljIGRlZmF1bHRMYW5nOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsYW5nIGN1cnJlbnRseSB1c2VkXHJcbiAgICovXHJcbiAgcHVibGljIGN1cnJlbnRMYW5nOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRMYW5nO1xyXG5cclxuICAvKipcclxuICAgKiBhIGxpc3Qgb2YgdHJhbnNsYXRpb25zIHBlciBsYW5nXHJcbiAgICovXHJcbiAgcHVibGljIHRyYW5zbGF0aW9uczogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIGFuIGFycmF5IG9mIGxhbmdzXHJcbiAgICovXHJcbiAgcHVibGljIGxhbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gdHJhbnNsYXRpb24gY2hhbmdlIGV2ZW50c1xyXG4gICAqIG9uVHJhbnNsYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChwYXJhbXM6IFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQpID0+IHtcclxuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAqIH0pO1xyXG4gICAqL1xyXG4gIHB1YmxpYyBvblRyYW5zbGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbGFuZyBjaGFuZ2UgZXZlbnRzXHJcbiAgICogb25MYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcclxuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAqIH0pO1xyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkxhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gZGVmYXVsdCBsYW5nIGNoYW5nZSBldmVudHNcclxuICAgKiBvbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50KSA9PiB7XHJcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgKiB9KTtcclxuICAgKi9cclxuICBwdWJsaWMgb25EZWZhdWx0TGFuZ0NoYW5nZTogRXZlbnRFbWl0dGVyPERlZmF1bHRMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEZWZhdWx0TGFuZ0NoYW5nZUV2ZW50PigpO1xyXG59XHJcbiJdfQ==