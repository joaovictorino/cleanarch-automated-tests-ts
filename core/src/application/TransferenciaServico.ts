import { Repositorio } from "../model/contract/Repositorio";
import { Conta } from "../model/Conta";
import { TransferenciaDTO } from "./dto/TransferenciaDTO";
import { TransferenciaValor } from "../model/service/TransferenciaValor";

export class TransferenciaServico {
    private _repositorio: Repositorio<Conta, string>;

    public constructor(repositorio: Repositorio<Conta, string>){
        this._repositorio = repositorio;
    }

    public async transferir(dto: TransferenciaDTO): Promise<string> {
        const contaOrigem = await this._repositorio.buscar(dto.contaOrigem);
        const contaDestino = await this._repositorio.buscar(dto.contaDestino);

        if(contaOrigem === undefined) 
            throw Error("conta de origem não encontrada");

        if(contaDestino === undefined)
            throw Error("conta de destino não encontrada");

        const transferencia = new TransferenciaValor();
        const recibo = transferencia.transferir(contaOrigem, contaDestino, dto.valor);

        this._repositorio.adicionar(contaOrigem);
        this._repositorio.adicionar(contaDestino);

        return recibo.codigo;
    }
}