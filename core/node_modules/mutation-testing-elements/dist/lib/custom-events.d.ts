import { MutantModel, TestModel } from 'mutation-testing-metrics';
export interface CustomEventMap {
    'mutant-selected': {
        selected: boolean;
        mutant: MutantModel | undefined;
    };
    'test-selected': {
        selected: boolean;
        test: TestModel | undefined;
    };
    'theme-changed': {
        theme: string;
        themeBackgroundColor: string;
    };
    'theme-switch': 'dark' | 'light';
    'filters-changed': string[];
    next: void;
    previous: void;
}
export declare function createCustomEvent<T extends keyof CustomEventMap>(eventName: T, detail: CustomEventMap[T], opts?: Omit<CustomEventInit, 'detail'>): CustomEvent<CustomEventMap[T]>;
export type MteCustomEvent<T extends keyof CustomEventMap> = CustomEvent<CustomEventMap[T]>;
//# sourceMappingURL=custom-events.d.ts.map