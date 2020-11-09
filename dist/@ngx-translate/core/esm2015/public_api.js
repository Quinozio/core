/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateFakeLoader } from "./lib/translate.loader";
import { MissingTranslationHandler, FakeMissingTranslationHandler } from "./lib/missing-translation-handler";
import { TranslateParser, TranslateDefaultParser } from "./lib/translate.parser";
import { TranslateCompiler, TranslateFakeCompiler } from "./lib/translate.compiler";
import { TranslateDirective } from "./lib/translate.directive";
import { TranslatePipe } from "./lib/translate.pipe";
import { TranslateStore } from "./lib/translate.store";
import { USE_DEFAULT_LANG, DEFAULT_LANGUAGE, USE_STORE, TranslateService, USE_EXTEND } from "./lib/translate.service";
export { TranslateLoader, TranslateFakeLoader } from "./lib/translate.loader";
export { USE_STORE, USE_DEFAULT_LANG, DEFAULT_LANGUAGE, USE_EXTEND, TranslateService } from "./lib/translate.service";
export { MissingTranslationHandler, FakeMissingTranslationHandler } from "./lib/missing-translation-handler";
export { TranslateParser, TranslateDefaultParser } from "./lib/translate.parser";
export { TranslateCompiler, TranslateFakeCompiler } from "./lib/translate.compiler";
export { TranslateDirective } from "./lib/translate.directive";
export { TranslatePipe } from "./lib/translate.pipe";
export { TranslateStore } from "./lib/translate.store";
/**
 * @record
 */
export function TranslateModuleConfig() { }
if (false) {
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.loader;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.compiler;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.parser;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.missingTranslationHandler;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.isolate;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.extend;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.useDefaultLang;
    /** @type {?|undefined} */
    TranslateModuleConfig.prototype.defaultLanguage;
}
export class TranslateModule {
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                TranslateStore,
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                { provide: USE_EXTEND, useValue: config.extend },
                { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
                TranslateService
            ]
        };
    }
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
        return {
            ngModule: TranslateModule,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                { provide: USE_EXTEND, useValue: config.extend },
                { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
                TranslateService
            ]
        };
    }
}
TranslateModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TranslatePipe,
                    TranslateDirective
                ],
                exports: [
                    TranslatePipe,
                    TranslateDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC10cmFuc2xhdGUvY29yZS9zcmMvcHVibGljX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUMseUJBQXlCLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRyxPQUFPLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXBILHFEQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLDRGQUFjLHlCQUF5QixDQUFDO0FBQ3hDLHlFQUFjLG1DQUFtQyxDQUFDO0FBQ2xELHdEQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLHlEQUFjLDBCQUEwQixDQUFDO0FBQ3pDLG1DQUFjLDJCQUEyQixDQUFDO0FBQzFDLDhCQUFjLHNCQUFzQixDQUFDO0FBQ3JDLCtCQUFjLHVCQUF1QixDQUFDOzs7O0FBRXRDLDJDQVdDOzs7SUFWQyx1Q0FBa0I7O0lBQ2xCLHlDQUFvQjs7SUFDcEIsdUNBQWtCOztJQUNsQiwwREFBcUM7O0lBRXJDLHdDQUFrQjs7SUFFbEIsdUNBQWlCOztJQUNqQiwrQ0FBeUI7O0lBQ3pCLGdEQUF5Qjs7QUFhM0IsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQUkxQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWdDLEVBQUU7UUFDL0MsT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVCxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFDO2dCQUNoRixNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7Z0JBQzdFLE1BQU0sQ0FBQyx5QkFBeUIsSUFBSSxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsNkJBQTZCLEVBQUM7Z0JBQ2pILGNBQWM7Z0JBQ2QsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFDO2dCQUM5QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGNBQWMsRUFBQztnQkFDNUQsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFDO2dCQUM5QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGVBQWUsRUFBQztnQkFDN0QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUtELE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBZ0MsRUFBRTtRQUNoRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQztnQkFDMUUsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUM7Z0JBQ2hGLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBQztnQkFDN0UsTUFBTSxDQUFDLHlCQUF5QixJQUFJLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSw2QkFBNkIsRUFBQztnQkFDakgsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFDO2dCQUM5QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGNBQWMsRUFBQztnQkFDNUQsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFDO2dCQUM5QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGVBQWUsRUFBQztnQkFDN0QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWxERixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGFBQWE7b0JBQ2Isa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixrQkFBa0I7aUJBQ25CO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZUZha2VMb2FkZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUubG9hZGVyXCI7XHJcbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciwgRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9IGZyb20gXCIuL2xpYi9taXNzaW5nLXRyYW5zbGF0aW9uLWhhbmRsZXJcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVQYXJzZXIsIFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9IGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGFyc2VyXCI7XHJcbmltcG9ydCB7VHJhbnNsYXRlQ29tcGlsZXIsIFRyYW5zbGF0ZUZha2VDb21waWxlcn0gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5jb21waWxlclwiO1xyXG5pbXBvcnQge1RyYW5zbGF0ZURpcmVjdGl2ZX0gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVQaXBlfSBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnBpcGVcIjtcclxuaW1wb3J0IHtUcmFuc2xhdGVTdG9yZX0gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5zdG9yZVwiO1xyXG5pbXBvcnQge1VTRV9ERUZBVUxUX0xBTkcsIERFRkFVTFRfTEFOR1VBR0UsIFVTRV9TVE9SRSwgVHJhbnNsYXRlU2VydmljZSwgVVNFX0VYVEVORH0gZnJvbSBcIi4vbGliL3RyYW5zbGF0ZS5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmxvYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnNlcnZpY2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGliL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnBhcnNlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLmNvbXBpbGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUuZGlyZWN0aXZlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi90cmFuc2xhdGUucGlwZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWIvdHJhbnNsYXRlLnN0b3JlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyB7XHJcbiAgbG9hZGVyPzogUHJvdmlkZXI7XHJcbiAgY29tcGlsZXI/OiBQcm92aWRlcjtcclxuICBwYXJzZXI/OiBQcm92aWRlcjtcclxuICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyPzogUHJvdmlkZXI7XHJcbiAgLy8gaXNvbGF0ZSB0aGUgc2VydmljZSBpbnN0YW5jZSwgb25seSB3b3JrcyBmb3IgbGF6eSBsb2FkZWQgbW9kdWxlcyBvciBjb21wb25lbnRzIHdpdGggdGhlIFwicHJvdmlkZXJzXCIgcHJvcGVydHlcclxuICBpc29sYXRlPzogYm9vbGVhbjtcclxuICAvLyBleHRlbmRzIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZSBpbnN0ZWFkIG9mIGlnbm9yaW5nIHRoZW0gaWYgcHJlc2VudFxyXG4gIGV4dGVuZD86IGJvb2xlYW47XHJcbiAgdXNlRGVmYXVsdExhbmc/OiBib29sZWFuO1xyXG4gIGRlZmF1bHRMYW5ndWFnZT86IHN0cmluZztcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFRyYW5zbGF0ZVBpcGUsXHJcbiAgICBUcmFuc2xhdGVEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRyYW5zbGF0ZVBpcGUsXHJcbiAgICBUcmFuc2xhdGVEaXJlY3RpdmVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHJvb3QgbW9kdWxlIHRvIHByb3ZpZGUgdGhlIFRyYW5zbGF0ZVNlcnZpY2VcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxUcmFuc2xhdGVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIGNvbmZpZy5sb2FkZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZUZha2VMb2FkZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5jb21waWxlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlQ29tcGlsZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5wYXJzZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZVBhcnNlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHx8IHtwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCB1c2VDbGFzczogRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxyXG4gICAgICAgIFRyYW5zbGF0ZVN0b3JlLFxyXG4gICAgICAgIHtwcm92aWRlOiBVU0VfU1RPUkUsIHVzZVZhbHVlOiBjb25maWcuaXNvbGF0ZX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IFVTRV9ERUZBVUxUX0xBTkcsIHVzZVZhbHVlOiBjb25maWcudXNlRGVmYXVsdExhbmd9LFxyXG4gICAgICAgIHtwcm92aWRlOiBVU0VfRVhURU5ELCB1c2VWYWx1ZTogY29uZmlnLmV4dGVuZH0sXHJcbiAgICAgICAge3Byb3ZpZGU6IERFRkFVTFRfTEFOR1VBR0UsIHVzZVZhbHVlOiBjb25maWcuZGVmYXVsdExhbmd1YWdlfSxcclxuICAgICAgICBUcmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciBvdGhlciAobm9uIHJvb3QpIG1vZHVsZXMgdG8gaW1wb3J0IHRoZSBkaXJlY3RpdmUvcGlwZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc6IFRyYW5zbGF0ZU1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxUcmFuc2xhdGVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIGNvbmZpZy5sb2FkZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZUZha2VMb2FkZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5jb21waWxlciB8fCB7cHJvdmlkZTogVHJhbnNsYXRlQ29tcGlsZXIsIHVzZUNsYXNzOiBUcmFuc2xhdGVGYWtlQ29tcGlsZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5wYXJzZXIgfHwge3Byb3ZpZGU6IFRyYW5zbGF0ZVBhcnNlciwgdXNlQ2xhc3M6IFRyYW5zbGF0ZURlZmF1bHRQYXJzZXJ9LFxyXG4gICAgICAgIGNvbmZpZy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHx8IHtwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCB1c2VDbGFzczogRmFrZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiBVU0VfU1RPUkUsIHVzZVZhbHVlOiBjb25maWcuaXNvbGF0ZX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IFVTRV9ERUZBVUxUX0xBTkcsIHVzZVZhbHVlOiBjb25maWcudXNlRGVmYXVsdExhbmd9LFxyXG4gICAgICAgIHtwcm92aWRlOiBVU0VfRVhURU5ELCB1c2VWYWx1ZTogY29uZmlnLmV4dGVuZH0sXHJcbiAgICAgICAge3Byb3ZpZGU6IERFRkFVTFRfTEFOR1VBR0UsIHVzZVZhbHVlOiBjb25maWcuZGVmYXVsdExhbmd1YWdlfSxcclxuICAgICAgICBUcmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==