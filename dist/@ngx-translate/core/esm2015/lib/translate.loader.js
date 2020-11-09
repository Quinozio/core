/**
 * @fileoverview added by tsickle
 * Generated from: lib/translate.loader.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { of } from "rxjs";
/**
 * @abstract
 */
export class TranslateLoader {
}
if (false) {
    /**
     * @abstract
     * @param {?} lang
     * @return {?}
     */
    TranslateLoader.prototype.getTranslation = function (lang) { };
}
/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
export class TranslateFakeLoader extends TranslateLoader {
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return of({});
    }
}
TranslateFakeLoader.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC10cmFuc2xhdGUvY29yZS9zcmMvbGliL3RyYW5zbGF0ZS5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7QUFFcEMsTUFBTSxPQUFnQixlQUFlO0NBRXBDOzs7Ozs7O0lBREMsK0RBQXVEOzs7OztBQU96RCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsZUFBZTs7Ozs7SUFDdEQsY0FBYyxDQUFDLElBQVk7UUFDekIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7O1lBSkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSBcInJ4anNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmFuc2xhdGVMb2FkZXIge1xyXG4gIGFic3RyYWN0IGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbG9hZGVyIGlzIGp1c3QgYSBwbGFjZWhvbGRlciB0aGF0IGRvZXMgbm90aGluZywgaW4gY2FzZSB5b3UgZG9uJ3QgbmVlZCBhIGxvYWRlciBhdCBhbGxcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZUZha2VMb2FkZXIgZXh0ZW5kcyBUcmFuc2xhdGVMb2FkZXIge1xyXG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxufVxyXG4iXX0=