import { tokens, commonTokens } from '@stryker-mutator/api/plugin';
import { createInstrumenter } from '@stryker-mutator/instrumenter';
import { coreTokens } from '../di/index.js';
import { Sandbox } from '../sandbox/sandbox.js';
import { ConcurrencyTokenProvider, createCheckerPool } from '../concurrent/index.js';
import { createCheckerFactory } from '../checker/index.js';
import { createPreprocessor } from '../sandbox/index.js';
import { IdGenerator } from '../child-proxy/id-generator.js';
export class MutantInstrumenterExecutor {
    constructor(injector, project, options) {
        this.injector = injector;
        this.project = project;
        this.options = options;
    }
    async execute() {
        // Create the checker and instrumenter
        const instrumenter = this.injector.injectFunction(createInstrumenter);
        // Instrument files in-memory
        const instrumentResult = await instrumenter.instrument(await this.readFilesToMutate(), this.options.mutator);
        // Preprocess the project
        const preprocess = this.injector.injectFunction(createPreprocessor);
        this.writeInstrumentedFiles(instrumentResult);
        await preprocess.preprocess(this.project);
        // Initialize the checker pool
        const concurrencyTokenProviderProvider = this.injector.provideClass(coreTokens.concurrencyTokenProvider, ConcurrencyTokenProvider);
        const concurrencyTokenProvider = concurrencyTokenProviderProvider.resolve(coreTokens.concurrencyTokenProvider);
        const checkerPoolProvider = concurrencyTokenProviderProvider
            .provideValue(coreTokens.checkerConcurrencyTokens, concurrencyTokenProvider.checkerToken$)
            .provideClass(coreTokens.workerIdGenerator, IdGenerator)
            .provideFactory(coreTokens.checkerFactory, createCheckerFactory)
            .provideFactory(coreTokens.checkerPool, createCheckerPool);
        const checkerPool = checkerPoolProvider.resolve(coreTokens.checkerPool);
        await checkerPool.init();
        // Feed the sandbox
        const dryRunProvider = checkerPoolProvider.provideClass(coreTokens.sandbox, Sandbox).provideValue(coreTokens.mutants, instrumentResult.mutants);
        const sandbox = dryRunProvider.resolve(coreTokens.sandbox);
        await sandbox.init();
        return dryRunProvider;
    }
    readFilesToMutate() {
        return Promise.all([...this.project.filesToMutate.values()].map((file) => file.toInstrumenterFile()));
    }
    writeInstrumentedFiles(instrumentResult) {
        for (const { name, content } of Object.values(instrumentResult.files)) {
            this.project.files.get(name).setContent(content);
        }
    }
}
MutantInstrumenterExecutor.inject = tokens(commonTokens.injector, coreTokens.project, commonTokens.options);
//# sourceMappingURL=2-mutant-instrumenter-executor.js.map