import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  stages: [
    { duration: '30s', target: 20 }
  ],
};

export default function () {
  const payload = JSON.stringify({
    origem: '654321',
    destino: '123456',
    valor: 1
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`http://${__ENV.HOST_URL}/api/contas/transferir`, payload, params);
  check(res, { 
    'status 200': (r) => r.status == 200,
    'recibo gerado': (r) => r.body.includes('recibo')
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}