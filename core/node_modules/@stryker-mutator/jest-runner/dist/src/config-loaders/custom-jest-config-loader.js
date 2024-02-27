import path from 'path';
import fs from 'fs';
import { tokens, commonTokens } from '@stryker-mutator/api/plugin';
import { pluginTokens } from '../plugin-di.js';
/**
 * The Default config loader will load the Jest configuration using the package.json in the package root
 */
export class CustomJestConfigLoader {
    constructor(log, options, requireFromCwd, jestConfig) {
        this.log = log;
        this.requireFromCwd = requireFromCwd;
        this.jestConfig = jestConfig;
        this.options = options;
    }
    async loadConfig() {
        try {
            return await this.readConfigNative();
        }
        catch {
            return this.readConfigManually();
        }
    }
    /**
     * Tries to read the jest config via the native jest api, available since jest@>=29.3
     */
    async readConfigNative() {
        const { config, configPath } = await this.jestConfig.readInitialOptions(this.options.jest.configFile, { skipMultipleConfigError: true });
        const hint = '(used native `readInitialOptions` from jest-config)';
        if (configPath) {
            this.log.debug(`Read config from "${path.relative(process.cwd(), configPath)}" ${hint}.`);
        }
        else {
            this.log.debug(`No config file read ${hint}.`);
        }
        return config;
    }
    /**
     * The legacy readConfig functionality
     */
    async readConfigManually() {
        var _a, _b;
        const jestConfig = (_b = (_a = (await this.readConfigFromJestConfigFile())) !== null && _a !== void 0 ? _a : (await this.readConfigFromPackageJson())) !== null && _b !== void 0 ? _b : {};
        this.log.debug("Read config: %s (used stryker's own config reading functionality)", jestConfig);
        return jestConfig;
    }
    async readConfigFromJestConfigFile() {
        const configFilePath = this.resolveJestConfigFilePath();
        if (configFilePath) {
            let config = this.requireFromCwd(configFilePath);
            if (typeof config === 'function') {
                config = await config();
            }
            this.log.debug(`Read Jest config from ${configFilePath}`);
            this.setRootDir(config, configFilePath);
            return config;
        }
        return undefined;
    }
    async readConfigFromPackageJson() {
        var _a;
        const pkgJsonFilePath = this.resolvePackageJsonFilePath();
        if (pkgJsonFilePath) {
            const config = (_a = JSON.parse(await fs.promises.readFile(pkgJsonFilePath, 'utf8')).jest) !== null && _a !== void 0 ? _a : {};
            this.log.debug(`Read Jest config from ${pkgJsonFilePath}`);
            this.setRootDir(config, pkgJsonFilePath);
            return config;
        }
        return undefined;
    }
    resolvePackageJsonFilePath() {
        var _a;
        const jestOptions = this.options;
        const packageJsonCandidate = path.resolve((_a = jestOptions.jest.configFile) !== null && _a !== void 0 ? _a : 'package.json');
        if (packageJsonCandidate.endsWith('package.json') && (jestOptions.jest.configFile || fs.existsSync(packageJsonCandidate))) {
            return packageJsonCandidate;
        }
        return undefined;
    }
    setRootDir(config, configFilePath) {
        var _a;
        config.rootDir = path.resolve(path.dirname(configFilePath), (_a = config.rootDir) !== null && _a !== void 0 ? _a : '.');
    }
    resolveJestConfigFilePath() {
        var _a;
        const jestOptions = this.options;
        const configFileCandidate = path.resolve((_a = jestOptions.jest.configFile) !== null && _a !== void 0 ? _a : 'jest.config.js');
        if (!configFileCandidate.endsWith('package.json') && (jestOptions.jest.configFile || fs.existsSync(configFileCandidate))) {
            return configFileCandidate;
        }
        return undefined;
    }
}
CustomJestConfigLoader.inject = tokens(commonTokens.logger, commonTokens.options, pluginTokens.requireFromCwd, pluginTokens.jestConfigWrapper);
//# sourceMappingURL=custom-jest-config-loader.js.map