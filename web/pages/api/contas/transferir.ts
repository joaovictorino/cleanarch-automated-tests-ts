import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";
import { TransferenciaServico } from "core/src/application/TransferenciaServico";
import { TransferenciaDTO } from "core/src/application/dto/TransferenciaDTO";
import { NegocioErro } from "core/src/error/NegocioErro";

export default async function transferir(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        try {
            const body = req.body;
            const contaRepositorio: ContaRepositorio = new ContaRepositorio();
            const transferencia: TransferenciaServico = new TransferenciaServico(contaRepositorio);
            const dto: TransferenciaDTO = new TransferenciaDTO(body.origem, body.destino, Number(body.valor));
            const recibo: string = await transferencia.transferir(dto);
            res.status(200).json({ recibo: recibo });
        } catch (error) {
            if (error instanceof NegocioErro) {
                res.status(400).json({ mensagem: error.message });
            } else {
                res.status(500).json({ mensagem: "erro" });
            }
        }
    }
}