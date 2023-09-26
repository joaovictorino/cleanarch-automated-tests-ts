import { NumeroConta } from "./NumeroConta";

export class Conta {
    private _numeroConta: NumeroConta;
    private _saldo: number;

    public constructor(numero: string, saldo: number){
      this._numeroConta = new NumeroConta(numero);
      this._saldo = saldo;
    }

    public sacar(valor: number): void {
      this.validarValor(valor);
      
      if((this._saldo - valor) < 0)
        throw new Error("saldo indisponível para operação");
          
      this._saldo -= valor;
    }

    public depositar(valor: number): void {
      this.validarValor(valor);

      this._saldo += valor;
    }
    
    public get saldo(): number {
      return this._saldo;
    }

    public get numero(): string {
      return this._numeroConta.numero;
    }

    private validarValor(valor: number): void {
      if(valor <= 0)
        throw new Error("valor não pode ser igual ou menor que zero");
    }
  }  