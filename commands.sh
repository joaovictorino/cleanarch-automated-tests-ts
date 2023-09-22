#!/bin/bash

npm init -y
npm install typescript@5.1.6 -g
npm install typescript@5.1.6 -D
tsc --init
npx gitignore node

npm install jest@29.6.2 -D
npm install ts-jest@29.1.1 -D
npm install @types/jest@29.5.3 -D
npx ts-jest config:init

npm install sonarqube-scanner@3.1.0 -D
npm run sonar:scanner

npm install @stryker-mutator/core@7.1.1 -D
npm install @stryker-mutator/jest-runner@7.1.1 -D
npx stryker init
npx stryker run

npm install @cucumber/cucumber@9.5.1 cucumber-tsflow@4.1.1 ts-node@10.9.1 -D