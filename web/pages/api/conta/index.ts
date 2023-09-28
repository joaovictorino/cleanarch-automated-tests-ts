import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";
import { Conta } from "core/src/model/Conta";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "POST") {
        try {
            const conta = req.body;
            const contaRepositorio = new ContaRepositorio();
            await contaRepositorio.adicionar(new Conta(conta["numero"], conta["saldo"]));
            res.status(201).json({ mensagem: "sucesso" });
        } catch (error) {
            res.status(500).json({ mensagem: "erro" });
        }
    }
}