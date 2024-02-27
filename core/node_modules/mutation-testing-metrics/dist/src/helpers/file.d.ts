import type { FileUnderTestModel } from '../model/file-under-test-model';
import type { MetricsResult } from '../model/metrics-result';
import type { Metrics } from '../model/metrics';
export declare function normalizeFileNames<TIn>(input: Record<string, TIn>, projectRoot?: string): Record<string, TIn>;
export declare function normalize<TIn, TOut>(input: Record<string, TIn>, projectRoot: string, factory: (input: TIn, relativeFileName: string) => TOut): Record<string, TOut>;
export declare function determineCommonBasePath(fileNames: ReadonlyArray<string>): string;
export declare function compareNames<TFile = FileUnderTestModel, TMetrics = Metrics>(a: MetricsResult<TFile, TMetrics>, b: MetricsResult<TFile, TMetrics>): number;
//# sourceMappingURL=file.d.ts.map