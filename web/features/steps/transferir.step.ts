import { createMocks } from "node-mocks-http";
import { binding, given, when, then } from "cucumber-tsflow";
import contas from "../../pages/api/contas/index";
import transferir from "../../pages/api/contas/transferir";
import consultar from "../../pages/api/contas/[numero]";
import assert from "assert";
import { setTimeout } from 'timers/promises';

@binding()
class Transferir {

  @given("conta {string} com saldo {float} e a conta {string} com saldo {float}")
  public async dadaDuasContas(numeroOrigem: string, saldoOrigem: number, numeroDestino: string, saldoDestino: number) {    
    const mockOrigem = createMocks({
      method: "POST",
      url: "api/contas/",
      body: {
          numero: numeroOrigem,
          saldo: saldoOrigem
      }
    });

    await contas(mockOrigem.req, mockOrigem.res);
    assert.equal(201, mockOrigem.res.statusCode);

    const mockDestino = createMocks({
      method: "POST",
      url: "api/contas/",
      body: {
          numero: numeroDestino,
          saldo: saldoDestino
      }
    });

    await contas(mockDestino.req, mockDestino.res);
    assert.equal(201, mockDestino.res.statusCode);
  }

  @when("a conta {string} transferir {float} para a conta {string}")
  public async quandoTransferirValores(numeroOrigem: string, valor: number, numeroDestino: string) {
    const { req, res } = createMocks({
      method: "POST",
      url: "api/contas/transferir",
      body: {
          origem: numeroOrigem,
          destino: numeroDestino,
          valor: valor
      }
    });

    await transferir(req, res);
    assert.equal(200, res.statusCode);
  }

  @then("o saldo da conta {string} deve ser {float} e a conta {string} {float}")
  public async entaoSaldoDeveSer(numeroOrigem: string, resultadoOrigem: number, numeroDestino: string, resultadoDestino: number) {
    await setTimeout(10);

    const mockOrigem = createMocks({
      method: "GET",
      url: "api/contas/",
      query: {
          numero: numeroOrigem,
      }
    });

    await consultar(mockOrigem.req, mockOrigem.res);
    assert.equal(200, mockOrigem.res.statusCode);

    const mockDestino = createMocks({
      method: "GET",
      url: "api/contas/",
      query: {
          numero: numeroDestino,
      }
    });

    await consultar(mockDestino.req, mockDestino.res);
    assert.equal(200, mockDestino.res.statusCode);

    assert.equal(resultadoOrigem, mockOrigem.res._getJSONData().saldo);
    assert.equal(resultadoDestino, mockDestino.res._getJSONData().saldo);
  }
}

export default Transferir;