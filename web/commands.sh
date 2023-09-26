npm init -y
npm install next@13.5.3 react@18.2.0 react-dom@18.2.0

# Prisma
npm install prisma@5.3.1 -D
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
npm install ts-node@10.9.1 -D

# MySQL
docker compose up -d

