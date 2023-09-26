export class Recibo {
    private _codigo: string;

    public constructor(){
        this._codigo = this.gerarCodigo();
    }

    public get codigo(): string {
        return this._codigo;
    }

    private gerarCodigo(): string {
        return Math.floor(Math.random()*899999+100000).toString();
    }
}