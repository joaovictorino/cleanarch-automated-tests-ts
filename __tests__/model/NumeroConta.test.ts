import { NumeroConta } from "../../src/model/NumeroConta";

describe("Número Conta", () => {
  test("conta com seis dígitos", async () => {
    const numeroConta = new NumeroConta("123456");
    expect(numeroConta.numero).toBe("123456");
    expect(numeroConta.numero.length).toBe(6);
  });

  test("conta com quatro dígitos", async () => {
    expect(() => { new NumeroConta("3456"); }).toThrow("número de conta inválida");
  });

  test("conta com sete dígitos", async () => {
    expect(() => { new NumeroConta("1234567"); }).toThrow("número de conta inválida");
  });

  test("conta com valor que não sejam digitos", async () => {
    expect(() => { new NumeroConta("abc123"); }).toThrow("número de conta inválida");
  });
});
