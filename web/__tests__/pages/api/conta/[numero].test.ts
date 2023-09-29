import { createMocks } from "node-mocks-http";
import { Conta } from "@prisma/client";
import consultar from "../../../../pages/api/contas/[numero]";
import { prismaMock } from "../../../mock/prisma";

describe("API consulta de contas", () => {
    test("consulta com sucesso", async() => {
        const { req, res } = createMocks({
            method: "GET",
            url: "api/contas/",
            query: {
                numero: "123456",
            }
        });

        const conta: Conta = {
            numero: "123456",
            saldo: 100.0 
        };

        prismaMock.conta.findUnique.mockResolvedValue(conta);

        await consultar(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                numero: expect.any(String),
                saldo: expect.any(Number)
            })
        );
    });

    test("consulta sem registro", async() => {
        const { req, res } = createMocks({
            method: "GET",
            url: "api/contas/",
            query: {
                numero: "123456",
            }
        });

        prismaMock.conta.findUnique.mockResolvedValue(null);

        await consultar(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: "conta nao encontrada"
            })
        );
    });
});