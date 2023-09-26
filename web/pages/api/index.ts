import { NextApiRequest, NextApiResponse } from "next";
import { Conta } from "core/src/model/Conta";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const conta = new Conta("123456", 2000.0)
  res.status(200).json({ valor: conta.saldo });
}