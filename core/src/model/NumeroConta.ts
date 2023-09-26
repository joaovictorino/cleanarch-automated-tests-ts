export class NumeroConta {
    private _numero: string;

    public constructor(numero: string){
        this.validar(numero);
        this._numero = numero;
    }

    public get numero(): string {
        return this._numero;
    }

    private validar(numero: string): void {
        if(!this.temSeisDigitosNumericos(numero)){
            throw new Error("número de conta inválida");
        }
    }

    private temSeisDigitosNumericos(numero: string): boolean {
        const regExp: RegExp = /^\d{6}$/;
        return regExp.test(numero);
    }
}