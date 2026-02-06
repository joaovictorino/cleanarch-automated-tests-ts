import { Recibo } from "../../src/model/Recibo"

describe("Recibo", () => {
  test("criar com sucesso", async () => {
    const recibo: Recibo = new Recibo();
    expect(recibo.codigo.length).toBe(6);
  });

  test("gerar codigo com Math.random mockado", () => {
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const recibo: Recibo = new Recibo();
    expect(recibo.codigo).toBe("549999");
    mockRandom.mockRestore();
  });
});
