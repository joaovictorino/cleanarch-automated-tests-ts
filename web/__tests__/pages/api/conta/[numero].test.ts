import { createMocks } from "node-mocks-http";
import { Conta } from "@prisma/client";
import handler from "../../../../pages/api/conta/[numero]";
import { prismaMock } from "../../../mock/prisma";

describe("API consulta de contas", () => {
    test("consulta com sucesso", async() => {
        const { req, res } = createMocks({
            method: "GET",
            url: "api/conta/",
            query: {
                numero: "123456",
            }
        });

        const conta: Conta = {
            numero: "123456",
            saldo: 100.0 
        };

        prismaMock.conta.findUnique.mockResolvedValue(conta);

        await handler(req, res);
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
            url: "api/conta/",
            query: {
                numero: "123456",
            }
        });

        prismaMock.conta.findUnique.mockResolvedValue(null);

        await handler(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });
});