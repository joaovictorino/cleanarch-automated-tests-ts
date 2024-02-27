import chalk from 'chalk';
export class DiffChanges {
    constructor() {
        this.added = 0;
        this.removed = 0;
    }
    toString() {
        return `${chalk.greenBright(`+${this.added}`)} ${chalk.redBright(`-${this.removed}`)}`;
    }
}
export class DiffStatisticsCollector {
    constructor() {
        this.changesByFile = new Map();
        this.total = new DiffChanges();
    }
    count(file, change, amount = 1) {
        if (amount === 0) {
            // Nothing to see here
            return;
        }
        let changes = this.changesByFile.get(file);
        if (!changes) {
            changes = new DiffChanges();
            this.changesByFile.set(file, changes);
        }
        switch (change) {
            case 'added':
                changes.added += amount;
                this.total.added += amount;
                break;
            case 'removed':
                changes.removed += amount;
                this.total.removed += amount;
                break;
        }
    }
    createDetailedReport() {
        return [...this.changesByFile.entries()].map(([fileName, changes]) => `${fileName} ${changes.toString()}`);
    }
    createTotalsReport() {
        return `${chalk.yellowBright(this.changesByFile.size)} files changed (${this.total.toString()})`;
    }
}
//# sourceMappingURL=diff-statistics-collector.js.map