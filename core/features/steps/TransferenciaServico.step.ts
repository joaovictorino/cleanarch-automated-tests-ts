import { binding, given, when, then } from "cucumber-tsflow";
import assert from "assert";
import { MemoriaContaRepositorio } from "../../__tests__/fake/MemoriaContaRepositorio";
import { Conta } from "../../src/model/Conta";
import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";

@binding()
class TransferenciaServicoStep {
  private repositorio = new MemoriaContaRepositorio();

  @given("conta {string} com saldo {float} e a conta {string} com saldo {float}")
  public dadaDuasContas(numeroOrigem: string, saldoOrigem: number, numeroDestino: string, saldoDestino: number): void {    
    const contaOrigem = new Conta(numeroOrigem, saldoOrigem);
    const contaDestino = new Conta(numeroDestino, saldoDestino);
    this.repositorio.adicionar(contaOrigem);
    this.repositorio.adicionar(contaDestino);
  }

  @when("a conta {string} transferir {float} para a conta {string}")
  public quandoTransferirValores(numeroOrigem: string, valor: number, numeroDestino: string): void {
    const transferenciaServico = new TransferenciaServico(this.repositorio);
    const dto = new TransferenciaDTO(numeroOrigem, numeroDestino, valor);
    transferenciaServico.transferir(dto);
  }

  @then("o saldo da conta {string} deve ser {float} e a conta {string} {float}")
  public async entaoSaldoDeveSer(numeroOrigem: string, resultadoOrigem: number, numeroDestino: string, resultadoDestino: number) {
    const contaOrigem = await this.repositorio.buscar(numeroOrigem);
    const contaDestino = await this.repositorio.buscar(numeroDestino);
    assert.equal(contaOrigem!.saldo, resultadoOrigem);
    assert.equal(contaDestino!.saldo, resultadoDestino);
  }
}

export = TransferenciaServico;