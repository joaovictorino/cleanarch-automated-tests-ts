import { Repositorio } from "core/src/model/contract/Repositorio";
import { Conta } from "core/src/model/Conta";
import prisma from "../prisma/prisma";

export class ContaRepositorio implements Repositorio<string, Conta> {

    public async buscar(numero: string): Promise<Conta | undefined> {
        const conta = await prisma.conta.findUnique({
            where: {
                numero: numero.toString(),
            },
        });

        if(conta !== null
            && conta !== undefined){
            return new Conta(conta.numero, conta.saldo);
        } else {
            return undefined;
        }
    }

    public async adicionar(conta: Conta) {
        await prisma.conta.upsert({
            where: {
                numero: conta.numero,
            },
            update: {
                saldo: conta.saldo,
            },
            create: {
                numero: conta.numero,
                saldo: conta.saldo,
            },
        });
    }
}