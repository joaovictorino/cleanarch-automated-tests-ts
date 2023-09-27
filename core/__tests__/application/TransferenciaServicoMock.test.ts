import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";
import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";

describe("Transferencia serviço mock", () => {

    test("transferir com sucesso", async () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();

        const transferenciaServico = new TransferenciaServico(repositorio);
        const dto = new TransferenciaDTO("123456", "654321", 100.0);
        const recibo = await transferenciaServico.transferir(dto);

        expect(repositorio.buscar).toBeCalledWith("123456");
        expect(repositorio.buscar).toBeCalledWith("654321");
        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).toBeCalledWith(contaOrigem);
        expect(repositorio.adicionar).toBeCalledWith(contaDestino);
        expect(repositorio.adicionar).toBeCalledTimes(2);
        
        const contaOrigemRepo = await repositorio.buscar("123456");
        const contaDestinoRepo = await repositorio.buscar("654321");
        expect(contaOrigemRepo!.saldo).toBe(4900.0);
        expect(contaDestinoRepo!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });

    test("conta de origem não encontrada", async () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("111111", "654321", 100.0);

        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de origem não encontrada"));
        expect(repositorio.buscar).toBeCalledWith("111111");
        expect(repositorio.buscar).toBeCalledWith("654321");
        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).not.toBeCalled();
    });

    test("conta de destino não encontrada", async () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("123456", "222222", 100.0);

        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de destino não encontrada"));
        expect(repositorio.buscar).toBeCalledWith("123456");
        expect(repositorio.buscar).toBeCalledWith("222222");
        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).not.toBeCalled();
    });

});

function criarMock() {
    const dicionario = new Map<string, Conta>();
    const contaOrigem = new Conta("123456", 5000);
    const contaDestino = new Conta("654321", 5000);
    dicionario.set(contaOrigem.numero, contaOrigem);
    dicionario.set(contaDestino.numero, contaDestino);

    const repositorio: jest.Mocked<Repositorio<Conta, string>> = {
        adicionar: jest.fn((entidade: Conta) => {
            dicionario.set(entidade.numero, entidade);
        }),
        buscar: jest.fn((numero: string) => {
            const promise = new Promise<Conta | undefined>((resolve, reject) => {
                resolve(dicionario.get(numero));
            });
            return promise;
        })
    };

    return { repositorio, contaOrigem, contaDestino };
}
