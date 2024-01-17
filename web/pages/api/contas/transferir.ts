import { NextApiRequest, NextApiResponse } from "next";
import { ContaRepositorio } from "../../../repositories/ContaRepositorio";
import { TransferenciaServico } from "core/src/application/TransferenciaServico";
import { TransferenciaDTO } from "core/src/application/dto/TransferenciaDTO";

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
            res.status(400).json({ mensagem: error.message });
        }
    }
}