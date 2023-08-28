export class TransferenciaDTO {
    public contaOrigem: string;
    public contaDestino: string;
    public valor: number;

    public constructor(contaOrigem: string, contaDestino: string, valor: number){
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
        this.valor = valor;
    }
}