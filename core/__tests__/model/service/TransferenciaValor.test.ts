import { Conta } from "../../../src/model/Conta";
import { Recibo } from "../../../src/model/Recibo";
import { TransferenciaValor } from "../../../src/model/service/TransferenciaValor";

describe("Transferência Valor", () => {
    test("transferencia de valor entre contas com sucesso", async () => {
        const contaOrigem: Conta = new Conta("123456", 1000.0);
        const contaDestino: Conta = new Conta("654321", 1000.0);
        
        const transferenciaValor: TransferenciaValor = new TransferenciaValor();
        const recibo: Recibo = transferenciaValor.transferir(contaOrigem, contaDestino, 100.0);

        expect(contaOrigem.saldo).toBe(900.0);
        expect(contaDestino.saldo).toBe(1100.0);
        expect(recibo.codigo.length).toBe(6);
    });
});