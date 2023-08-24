#!/bin/bash

npm init -y
npm install typescript -g
npm install typescript -D
tsc --init
npx gitignore node

npm install jest -D
npm install ts-jest -D
npm install @types/jest -D
npx ts-jest config:init
# create account model and test