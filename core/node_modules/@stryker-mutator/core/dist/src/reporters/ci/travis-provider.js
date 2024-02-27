import { objectUtils } from '../../utils/object-utils.js';
/**
 * See https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
 */
export class TravisProvider {
    determineProject() {
        const slug = objectUtils.getEnvironmentVariable('TRAVIS_REPO_SLUG');
        if (slug) {
            return `github.com/${slug}`;
        }
        else {
            return undefined;
        }
    }
    determineVersion() {
        var _a;
        return ((_a = objectUtils.undefinedEmptyString(objectUtils.getEnvironmentVariable('TRAVIS_PULL_REQUEST_BRANCH'))) !== null && _a !== void 0 ? _a : objectUtils.getEnvironmentVariable('TRAVIS_BRANCH'));
    }
}
//# sourceMappingURL=travis-provider.js.map