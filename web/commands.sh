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

# MySQL (Docker)
docker compose up -d

# Jest
npm install jest@29.6.2 -D
npm install ts-jest@29.1.1 -D
npm install @types/jest@29.5.3 -D
npm install node-mocks-http@1.13.0 -D
npx ts-jest config:init
npm install jest-mock-extended@3.0.5 -D

npm install swr@2.2.4

# Playwright
npm install @playwright/test@1.38.1 -D
npx playwright install [chromium|firefox|webkit|msedge|chrome]

# Docker
docker build -t web .
docker build -t migrate -f Dockerfile.migrate .

# K6
k6 run ConsultarContaAPI.js
k6 run --out json=test.json ConsultarContaAPI.js
k6 run -e HOST_URL=localhost:3000 TransferenciaAPI.js

# Kubernetes
kubectl apply -f 01-db.yaml
kubectl apply -f 02-svc-db.yaml
kubectl apply -f 03-migrate.yaml
kubectl apply -f 04-app.yaml
kubectl apply -f 05-svc-app.yaml
kubectl get svc/app-svc
kubectl get nodes -o wide

# Chaos Toolkit
pip install chaostoolkit-kubernetes
chaos run experiment-app.json
chaos run experiment-db.json