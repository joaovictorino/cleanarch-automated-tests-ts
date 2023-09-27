import { Repositorio } from "core/src/model/contract/Repositorio";
import { Conta } from "core/src/model/Conta";
import prisma from "../prisma/prisma";

export class ContaRepositorio implements Repositorio<Conta, string> {

    public async buscar(numero: string): Promise<Conta | undefined> {
        const conta = await prisma.conta.findUnique({
            where: {
                numero: numero.toString(),
            },
        });

        if(conta !== null){
            return new Conta(conta.numero, conta.saldo);
        } else {
            return null;
        }
    }

    public async adicionar(conta: Conta) {
        await prisma.conta.create({
            data: {
                numero: conta.numero,
                saldo: conta.saldo
            },
        });
    }
}