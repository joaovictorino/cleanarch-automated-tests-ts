import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "GET") {
    const { numero } = req.query;
    const contaRepositorio = new ContaRepositorio();
    const conta = await contaRepositorio.buscar(numero.toString());

    if(conta !== null){
      res.status(200).json({ "numero": conta.numero, "saldo": conta.saldo });
    } else {
      res.status(404).json({ "mensagem": "conta nao encontrada" });
    }
  }
}