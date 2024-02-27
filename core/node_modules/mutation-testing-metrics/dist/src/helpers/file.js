"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareNames = exports.determineCommonBasePath = exports.normalize = exports.normalizeFileNames = void 0;
const SEPARATOR = '/';
function normalizeFileNames(input, projectRoot = '') {
    return normalize(input, projectRoot, (input) => input);
}
exports.normalizeFileNames = normalizeFileNames;
function normalize(input, projectRoot, factory) {
    const fileNames = Object.keys(input);
    const commonBasePath = determineCommonBasePath(fileNames);
    const output = Object.create(null);
    fileNames.forEach((fileName) => {
        const relativeFileName = normalizeName(fileName.startsWith(projectRoot) ? fileName.substr(projectRoot.length) : fileName);
        output[normalizeName(fileName.substr(commonBasePath.length))] = factory(input[fileName], relativeFileName);
    });
    return output;
}
exports.normalize = normalize;
function normalizeName(fileName) {
    return fileName.split(/\/|\\/).filter(Boolean).join('/');
}
function determineCommonBasePath(fileNames) {
    const directories = fileNames.map((fileName) => fileName.split(/\/|\\/).slice(0, -1));
    if (fileNames.length) {
        return directories.reduce(filterDirectories).join(SEPARATOR);
    }
    else {
        return '';
    }
    function filterDirectories(previousDirectories, currentDirectories) {
        for (let i = 0; i < previousDirectories.length; i++) {
            if (previousDirectories[i] !== currentDirectories[i]) {
                return previousDirectories.splice(0, i);
            }
        }
        return previousDirectories;
    }
}
exports.determineCommonBasePath = determineCommonBasePath;
function compareNames(a, b) {
    const sortValue = (metricsResult) => {
        // Directories first
        if (metricsResult.file) {
            return `1${metricsResult.name}`;
        }
        else {
            return `0${metricsResult.name}`;
        }
    };
    return sortValue(a).localeCompare(sortValue(b));
}
exports.compareNames = compareNames;
//# sourceMappingURL=file.js.map