import { createMocks } from "node-mocks-http";
import contas from "../../../../pages/api/contas/index";
import { prismaMock } from "../../../mock/prisma";

describe("API criação de contas", () => {
    test("criação com sucesso", async() => {
        const { req, res } = createMocks({
            method: "POST",
            url: "api/contas/",
            body: {
                numero: "123456",
                saldo: 100.0
            }
        });

        prismaMock.conta.create.mockResolvedValue(null);

        await contas(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: "sucesso"
            })
        );
    });

    test("criação sem sucesso", async() => {
        const { req, res } = createMocks({
            method: "POST",
            url: "api/contas/",
            body: {
                numero: "1234567",
                saldo: 100.0
            }
        });

        prismaMock.conta.findUnique.mockResolvedValue(null);

        await contas(req, res);
        
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: "número de conta inválida"
            })
        );
    });
});