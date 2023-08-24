import { Conta } from "../conta";
import { Recibo } from "../recibo";

export class TransferenciaValor {
    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number): Recibo {
        contaOrigem.sacar(valor);
        contaDestino.depositar(valor);
        return new Recibo();
    }
}