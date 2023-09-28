import { createMocks } from "node-mocks-http";
import { binding, given, when, then } from "cucumber-tsflow";
import cadastrar from "../../pages/api/conta/index";
import transferir from "../../pages/api/conta/transferir";
import consultar from "../../pages/api/conta/[numero]";
import assert from "assert";
import { setTimeout } from 'timers/promises';

@binding()
class Transferir {

  @given("conta {string} com saldo {float} e a conta {string} com saldo {float}")
  public async dadaDuasContas(numeroOrigem: string, saldoOrigem: number, numeroDestino: string, saldoDestino: number) {    
    const mockOrigem = createMocks({
      method: "POST",
      url: "api/conta/",
      body: {
          numero: numeroOrigem,
          saldo: saldoOrigem
      }
    });

    await cadastrar(mockOrigem.req, mockOrigem.res);
    assert.equal(201, mockOrigem.res.statusCode);

    const mockDestino = createMocks({
      method: "POST",
      url: "api/conta/",
      body: {
          numero: numeroDestino,
          saldo: saldoDestino
      }
    });

    await cadastrar(mockDestino.req, mockDestino.res);
    assert.equal(201, mockDestino.res.statusCode);
  }

  @when("a conta {string} transferir {float} para a conta {string}")
  public async quandoTransferirValores(numeroOrigem: string, valor: number, numeroDestino: string) {
    const { req, res } = createMocks({
      method: "POST",
      url: "api/conta/transferir",
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
      url: "api/conta/",
      query: {
          numero: numeroOrigem,
      }
    });

    await consultar(mockOrigem.req, mockOrigem.res);
    assert.equal(200, mockOrigem.res.statusCode);

    const mockDestino = createMocks({
      method: "GET",
      url: "api/conta/",
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