npm init -y
npm install next@13.5.3 react@18.2.0 react-dom@18.2.0

# Workspaces
npm run test --workspaces
npm run test -w core
npm run test -w web

# Prisma
npm install prisma@5.3.1 -D
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
npm install ts-node@10.9.1 -D

# MySQL
docker compose up -d

# Jest
npm install jest@29.6.2 -D
npm install ts-jest@29.1.1 -D
npm install @types/jest@29.5.3 -D
npm install node-mocks-http@1.13.0 -D
npx ts-jest config:init
npm install jest-mock-extended@3.0.5 -D

npm install swr@2.2.4