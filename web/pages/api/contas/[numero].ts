import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";

export default async function consultar(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "GET") {
        const { numero } = req.query;
        const contaRepositorio: ContaRepositorio = new ContaRepositorio();
        const conta = await contaRepositorio.buscar(numero.toString());

        if(conta !== undefined){
            res.status(200).json({ numero: conta.numero, saldo: conta.saldo });
        } else {
            res.status(404).json({ mensagem: "conta nao encontrada" });
        }
    }
}