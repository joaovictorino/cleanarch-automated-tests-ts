import { Recibo } from "../../model/recibo"

describe("Recibo", () => {
  test("criar com sucesso", async () => {
    const recibo = new Recibo();
    expect(recibo.codigo.length).toBe(6);
  });
});
