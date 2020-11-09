/**
 * @fileoverview added by tsickle
 * Generated from: lib/translate.compiler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
/**
 * @abstract
 */
export class TranslateCompiler {
}
if (false) {
    /**
     * @abstract
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    TranslateCompiler.prototype.compile = function (value, lang) { };
    /**
     * @abstract
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    TranslateCompiler.prototype.compileTranslations = function (translations, lang) { };
}
/**
 * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
 */
export class TranslateFakeCompiler extends TranslateCompiler {
    /**
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    compile(value, lang) {
        return value;
    }
    /**
     * @param {?} translations
     * @param {?} lang
     * @return {?}
     */
    compileTranslations(translations, lang) {
        return translations;
    }
}
TranslateFakeCompiler.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXRyYW5zbGF0ZS9jb3JlL3NyYy9saWIvdHJhbnNsYXRlLmNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQUV6QyxNQUFNLE9BQWdCLGlCQUFpQjtDQUl0Qzs7Ozs7Ozs7SUFIQyxpRUFBaUU7Ozs7Ozs7SUFFakUsb0ZBQW1FOzs7OztBQU9yRSxNQUFNLE9BQU8scUJBQXNCLFNBQVEsaUJBQWlCOzs7Ozs7SUFDMUQsT0FBTyxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQ2pDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsWUFBaUIsRUFBRSxJQUFZO1FBQ2pELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7OztZQVJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJhbnNsYXRlQ29tcGlsZXIge1xyXG4gIGFic3RyYWN0IGNvbXBpbGUodmFsdWU6IHN0cmluZywgbGFuZzogc3RyaW5nKTogc3RyaW5nIHwgRnVuY3Rpb247XHJcblxyXG4gIGFic3RyYWN0IGNvbXBpbGVUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBhbnksIGxhbmc6IHN0cmluZyk6IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcGlsZXIgaXMganVzdCBhIHBsYWNlaG9sZGVyIHRoYXQgZG9lcyBub3RoaW5nLCBpbiBjYXNlIHlvdSBkb24ndCBuZWVkIGEgY29tcGlsZXIgYXQgYWxsXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVGYWtlQ29tcGlsZXIgZXh0ZW5kcyBUcmFuc2xhdGVDb21waWxlciB7XHJcbiAgY29tcGlsZSh2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmcgfCBGdW5jdGlvbiB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb21waWxlVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9uczogYW55LCBsYW5nOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9ucztcclxuICB9XHJcbn1cclxuIl19