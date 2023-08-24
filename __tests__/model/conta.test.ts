import { Conta } from "../../model/conta";

describe("Conta", () => {
  test("sacar com sucesso", async () => {
    const conta = criarConta();
    conta.sacar(200.0);
    expect(conta.saldo).toBe(4800.00);
  });

  test("sacar com valor zerado", async () => {
    const conta = criarConta();
    expect(() => { conta.sacar(0); }).toThrow(Error);
  });

  test("sacar com valor negativo", async () => {
    const conta = criarConta();
    expect(() => { conta.sacar(-5.0); }).toThrow(Error);
  });

  test("sacar valor acima do saldo", async () => {
    const conta = criarContaSaldo199();
    expect(() => { conta.sacar(200.0); }).toThrow(Error);
  });

  test("depositar com sucesso", async () => {
    const conta = criarConta();
    conta.depositar(200.0);
    expect(conta.saldo).toBe(5200.00);
  });

  test("depositar com valor zerado", async () => {
    const conta = criarConta();
    expect(() => { conta.depositar(0); }).toThrow(Error);
  });

  test("depositar com valor negativo", async () => {
    const conta = criarConta();
    expect(() => { conta.depositar(-5.0); }).toThrow(Error);
  });
});

function criarConta() {
  return new Conta("123456", 5000.0);
};

function criarContaSaldo199() {
  return new Conta("123456", 199.0);
};
