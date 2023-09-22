let common = [
    'features/**/*.feature',
    '--require-module ts-node/register',
    '--require features/steps/**/*.step.ts',
    '--format progress-bar',
  ].join(' ');
  
  module.exports = {
    default: common
  };