import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '30s', target: 20 }
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/api/contas/123456');
  check(res, { 'status 200': (r) => r.status == 200 });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}