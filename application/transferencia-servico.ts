import { Repositorio } from "../model/contract/repositorio";
import { Conta } from "../model/conta";
import { TransferenciaDTO } from "./dto/transferencia-dto";
import { TransferenciaValor } from "../model/service/transferencia-valor";

export class TransferenciaServico {
    private _repositorio: Repositorio<Conta, string>;

    public constructor(repositorio: Repositorio<Conta, string>){
        this._repositorio = repositorio;
    }

    public transferir(dto: TransferenciaDTO): string {
        const contaOrigem = this._repositorio.buscar(dto.contaOrigem);
        const contaDestino = this._repositorio.buscar(dto.contaDestino);

        if(contaOrigem === undefined) 
            throw Error("conta de origem não encontrada");

        if(contaDestino === undefined)
            throw Error("conta de destino não encontrada");

        const transferencia = new TransferenciaValor();
        const recibo = transferencia.transferir(contaOrigem!, contaDestino!, dto.valor);

        this._repositorio.adicionar(contaOrigem!);
        this._repositorio.adicionar(contaDestino!);

        return recibo.codigo;
    }
}