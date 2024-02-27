#!/bin/bash

# Projeto e Typescript
npm init -y
npm install typescript@5.1.6 -g
npm install typescript@5.1.6 -D
tsc --init
npx gitignore node

# Jest
npm install jest@29.6.2 -D
npm install ts-jest@29.1.1 -D
npm install @types/jest@29.5.3 -D
npx ts-jest config:init
npx jest