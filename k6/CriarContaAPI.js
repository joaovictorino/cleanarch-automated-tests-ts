import http from 'k6/http';
import { check, sleep } from 'k6';
import { scenario } from 'k6/execution';
import { SharedArray } from 'k6/data';

const data = new SharedArray('contas', function () {
  return JSON.parse(open('./data.json')).contas;
});

export const options = {
  scenarios: {
    'use-all-the-data': {
      executor: 'shared-iterations',
      vus: 1,
      iterations: data.length,
      maxDuration: '1h',
    },
  },
};

export default function () {
  const conta = data[scenario.iterationInTest];
  const payload = JSON.stringify({
    numero: conta.numero,
    saldo: conta.saldo
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`http://${__ENV.HOST_URL}/api/contas`, payload, params);

  check(res, { 'status 201': (r) => r.status == 201 });

  sleep(1);
}