import { TransferenciaServico } from "../../application/transferencia-servico";
import { MemoriaContaRepositorio } from "../fake/memoria-conta-repositorio";
import { TransferenciaDTO } from "../../application/dto/transferencia-dto";
import { Conta } from "../../model/conta";

describe("Transferência serviço", () =>{

    test("transferir com sucesso", () => {
        const repositorio = criarContaRepositorio();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("123456", "654321", 100.0);

        const recibo = transferenciaServico.transferir(dto);

        expect(repositorio.buscar("123456")!.saldo).toBe(4900.0);
        expect(repositorio.buscar("654321")!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });

    test("conta de origem não encontrada", () => {
        const repositorio = criarContaRepositorio();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("111111", "654321", 100.0);

        expect(() => { transferenciaServico.transferir(dto); }).toThrow("conta de origem não encontrada");
    });

    test("conta de destino não encontrada", () => {
        const repositorio = criarContaRepositorio();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("123456", "222222", 100.0);

        expect(() => { transferenciaServico.transferir(dto); }).toThrow("conta de destino não encontrada");
    });

});

function criarContaRepositorio() {
    const repositorio = new MemoriaContaRepositorio();
    const contaOrigem = new Conta("123456", 5000);
    const contaDestino = new Conta("654321", 5000);
    repositorio.adicionar(contaOrigem);
    repositorio.adicionar(contaDestino);
    return repositorio;
}
