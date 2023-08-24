export class Recibo {
    private _codigo: string;

    constructor(){
        this._codigo = this.gerarCodigo();
    }

    get codigo(): string {
        return this._codigo;
    }

    private gerarCodigo(): string {
        return Math.floor(Math.random()*899999+100000).toString();
    }
}