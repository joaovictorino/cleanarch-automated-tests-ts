#!/bin/bash

npm init -y

npm install typescript -D
npm install jest -D
npm install ts-jest -D
npm install @types/jest -D
npx ts-jest config:init
npm install typescript -g
tsc --init
npx gitignore node
# create account model and test
# 