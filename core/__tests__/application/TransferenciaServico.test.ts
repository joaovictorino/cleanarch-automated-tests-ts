import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { MemoriaContaRepositorio } from "../fake/MemoriaContaRepositorio";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";
import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";

describe("Transferência Serviço", () =>{

    test("transferir com sucesso", async () => {
        const repositorio: Repositorio<string, Conta> = criarContaRepositorio();

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);

        const dto: TransferenciaDTO = new TransferenciaDTO("123456", "654321", 100.0);

        const recibo: string = await transferenciaServico.transferir(dto);
        const contaOrigemRepo = await repositorio.buscar("123456");
        const contaDestinoRepo = await repositorio.buscar("654321");
        expect(contaOrigemRepo!.saldo).toBe(4900.0);
        expect(contaDestinoRepo!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });

    test("conta de origem não encontrada", async () => {
        const repositorio: Repositorio<string, Conta> = criarContaRepositorio();

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);

        const dto: TransferenciaDTO = new TransferenciaDTO("111111", "654321", 100.0);

        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de origem não encontrada"));
    });

    test("conta de destino não encontrada", async () => {
        const repositorio: Repositorio<string, Conta> = criarContaRepositorio();

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);

        const dto: TransferenciaDTO = new TransferenciaDTO("123456", "222222", 100.0);

        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de destino não encontrada"));
    });

});

function criarContaRepositorio(): Repositorio<string, Conta> {
    const repositorio: MemoriaContaRepositorio = new MemoriaContaRepositorio();
    const contaOrigem: Conta = new Conta("123456", 5000);
    const contaDestino: Conta = new Conta("654321", 5000);
    repositorio.adicionar(contaOrigem);
    repositorio.adicionar(contaDestino);
    return repositorio;
}
