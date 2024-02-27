import os from 'os';
import chalk from 'chalk';
import flatMap from 'lodash.flatmap';
import emojiRegex from 'emoji-regex';
import { stringWidth } from '../utils/string-utils.js';
const FILES_ROOT_NAME = 'All files';
const emojiRe = emojiRegex();
const repeat = (char, nTimes) => new Array(nTimes > -1 ? nTimes + 1 : 0).join(char);
const spaces = (n) => repeat(' ', n);
const dots = (n) => repeat('.', n);
/**
 * Represents a column in the clear text table
 */
class Column {
    constructor(header, valueFactory, rows) {
        this.header = header;
        this.valueFactory = valueFactory;
        this.rows = rows;
        this.emojiMatchInHeader = emojiRe.exec(this.header);
        const maxContentSize = this.determineValueSize();
        this.width = this.pad(dots(maxContentSize)).length;
    }
    determineValueSize(row = this.rows, ancestorCount = 0) {
        const valueWidths = row.childResults.map((child) => this.determineValueSize(child, ancestorCount + 1));
        valueWidths.push(this.headerLength);
        valueWidths.push(this.valueFactory(row, ancestorCount).length);
        return Math.max(...valueWidths);
    }
    get headerLength() {
        return stringWidth(this.header);
    }
    /**
     * Adds padding (spaces) to the front and end of a value
     * @param input The string input
     */
    pad(input) {
        return `${spaces(this.width - stringWidth(input) - 2)} ${input} `;
    }
    drawLine() {
        return repeat('-', this.width);
    }
    drawTableCell(score, ancestorCount) {
        return this.color(score)(this.pad(this.valueFactory(score, ancestorCount)));
    }
    drawHeader() {
        return this.pad(this.header);
    }
    color(_score) {
        return (input) => input;
    }
}
class MutationScoreColumn extends Column {
    constructor(rows, thresholds) {
        super('% score', (row) => (isNaN(row.metrics.mutationScore) ? 'n/a' : row.metrics.mutationScore.toFixed(2)), rows);
        this.thresholds = thresholds;
    }
    color(metricsResult) {
        const { mutationScore: score } = metricsResult.metrics;
        if (isNaN(score)) {
            return chalk.grey;
        }
        else if (score >= this.thresholds.high) {
            return chalk.green;
        }
        else if (score >= this.thresholds.low) {
            return chalk.yellow;
        }
        else {
            return chalk.red;
        }
    }
}
class FileColumn extends Column {
    constructor(rows) {
        super('File', (row, ancestorCount) => spaces(ancestorCount) + (ancestorCount === 0 ? FILES_ROOT_NAME : row.name), rows);
    }
    pad(input) {
        return `${input} ${spaces(this.width - stringWidth(input) - 1)}`;
    }
}
/**
 * Represents a clear text table for mutation score
 */
export class ClearTextScoreTable {
    constructor(metricsResult, options) {
        this.metricsResult = metricsResult;
        this.columns = [
            new FileColumn(metricsResult),
            new MutationScoreColumn(metricsResult, options.thresholds),
            new Column(`${options.clearTextReporter.allowEmojis ? '✅' : '#'} killed`, (row) => row.metrics.killed.toString(), metricsResult),
            new Column(`${options.clearTextReporter.allowEmojis ? '⌛️' : '#'} timeout`, (row) => row.metrics.timeout.toString(), metricsResult),
            new Column(`${options.clearTextReporter.allowEmojis ? '👽' : '#'} survived`, (row) => row.metrics.survived.toString(), metricsResult),
            new Column(`${options.clearTextReporter.allowEmojis ? '🙈' : '#'} no cov`, (row) => row.metrics.noCoverage.toString(), metricsResult),
            new Column(`${options.clearTextReporter.allowEmojis ? '💥' : '#'} errors`, (row) => (row.metrics.runtimeErrors + row.metrics.compileErrors).toString(), metricsResult),
        ];
    }
    drawBorder() {
        return this.drawRow((column) => column.drawLine());
    }
    drawHeader() {
        return this.drawRow((c) => c.drawHeader());
    }
    drawRow(toDraw) {
        return this.columns.map(toDraw).join('|') + '|';
    }
    drawValues(current = this.metricsResult, ancestorCount = 0) {
        return [this.drawRow((c) => c.drawTableCell(current, ancestorCount))].concat(flatMap(current.childResults, (child) => this.drawValues(child, ancestorCount + 1)));
    }
    /**
     * Returns a string with the score results drawn in a table.
     */
    draw() {
        return [this.drawBorder(), this.drawHeader(), this.drawBorder(), this.drawValues().join(os.EOL), this.drawBorder()].join(os.EOL);
    }
}
//# sourceMappingURL=clear-text-score-table.js.map