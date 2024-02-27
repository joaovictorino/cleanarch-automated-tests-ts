import inquirer from 'inquirer';
import { CommandTestRunner } from '../test-runner/command-test-runner.js';
export class StrykerInquirer {
    async promptPresets(options) {
        const choices = options.map((_) => _.name);
        choices.push(new inquirer.Separator());
        choices.push('None/other');
        const answers = await inquirer.prompt({
            choices,
            message: 'Are you using one of these frameworks? Then select a preset configuration.',
            name: 'preset',
            type: 'list',
        });
        return options.find((_) => _.name === answers.preset);
    }
    async promptTestRunners(options) {
        var _a;
        if (options.length) {
            const choices = options.map((_) => _.name);
            choices.push(new inquirer.Separator());
            choices.push(CommandTestRunner.runnerName);
            const answers = await inquirer.prompt({
                choices,
                message: 'Which test runner do you want to use? If your test runner isn\'t listed here, you can choose "command" (it uses your `npm test` command, but will come with a big performance penalty)',
                name: 'testRunner',
                type: 'list',
            });
            return (_a = options.filter((_) => _.name === answers.testRunner)[0]) !== null && _a !== void 0 ? _a : { name: CommandTestRunner.runnerName, pkg: null };
        }
        else {
            return { name: CommandTestRunner.runnerName, pkg: null };
        }
    }
    async promptBuildCommand(skip) {
        const { buildCommand } = await inquirer.prompt({
            message: 'What build command should be executed just before running your tests? For example: "npm run build" or "tsc -b" (leave empty when this is not needed).',
            name: 'buildCommand',
            default: 'none',
            when: !skip,
        });
        return { name: buildCommand !== 'none' ? buildCommand : '', pkg: null };
    }
    async promptReporters(options) {
        const answers = await inquirer.prompt({
            choices: options.map((_) => _.name),
            default: ['html', 'clear-text', 'progress'],
            message: 'Which reporter(s) do you want to use?',
            name: 'reporters',
            type: 'checkbox',
        });
        return options.filter((option) => answers.reporters.some((reporterName) => option.name === reporterName));
    }
    async promptPackageManager(options) {
        const answers = await inquirer.prompt({
            choices: options.map((_) => _.name),
            default: ['npm'],
            message: 'Which package manager do you want to use?',
            name: 'packageManager',
            type: 'list',
        });
        return options.filter((_) => _.name === answers.packageManager)[0];
    }
    async promptJsonConfigType() {
        const json = 'JSON';
        const answers = await inquirer.prompt({
            choices: [json, 'JavaScript'],
            default: json,
            message: 'What file type do you want for your config file?',
            name: 'configType',
            type: 'list',
        });
        return answers.configType === json;
    }
}
//# sourceMappingURL=stryker-inquirer.js.map