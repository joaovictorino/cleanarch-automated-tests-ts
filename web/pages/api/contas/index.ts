import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";
import { Conta } from "core/src/model/Conta";
import { NegocioErro } from "core/src/error/NegocioErro";

export default async function contas(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "POST") {
        try {
            const conta = req.body;
            const contaRepositorio: ContaRepositorio = new ContaRepositorio();
            await contaRepositorio.adicionar(new Conta(conta["numero"], conta["saldo"]));
            res.status(201).json({ mensagem: "sucesso" });
        } catch (error) {
            if (error instanceof NegocioErro) {
                res.status(400).json({ mensagem: error.message });
            } else {
                res.status(500).json({ mensagem: "erro" });
            }
        }
    }

    if(req.method === "GET") {
        const contaRepositorio: ContaRepositorio = new ContaRepositorio();
        const contas = await contaRepositorio.listar();
        res.status(200).json(contas);
    }
}