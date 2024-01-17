import { NumeroConta } from "../../src/model/NumeroConta";

describe("Número Conta", () => {
  test("conta com seis dígitos", async () => {
    const numeroConta: NumeroConta = new NumeroConta("123456");
    expect(numeroConta.numero).toBe("123456");
    expect(numeroConta.numero.length).toBe(6);
  });

  test("conta com cinco dígitos", async () => {
    expect(() => { new NumeroConta("23456"); }).toThrow("número de conta inválida");
  });

  test("conta com sete dígitos", async () => {
    expect(() => { new NumeroConta("1234567"); }).toThrow("número de conta inválida");
  });

  test("conta com valor que não sejam digitos", async () => {
    expect(() => { new NumeroConta("abc123"); }).toThrow("número de conta inválida");
  });
});
