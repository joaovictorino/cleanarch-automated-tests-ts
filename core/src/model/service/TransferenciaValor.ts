import { Conta } from "../Conta";
import { Recibo } from "../Recibo";

export class TransferenciaValor {
    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number): Recibo {
        contaOrigem.sacar(valor);
        contaDestino.depositar(valor);
        return new Recibo();
    }
}