import { Recibo } from "../../src/model/Recibo"

describe("Recibo", () => {
  test("criar com sucesso", async () => {
    const recibo: Recibo = new Recibo();
    expect(recibo.codigo.length).toBe(6);
  });

  test("criar recibos diferentes", async () => {
    const recibo1: Recibo = new Recibo();
    const recibo2: Recibo = new Recibo();
    expect(recibo1.codigo).not.toBe(recibo2.codigo);
  });
});
