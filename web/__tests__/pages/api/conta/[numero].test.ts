import { createMocks } from "node-mocks-http";
import handler from "../../../../pages/api/conta/[numero]";

describe("API consulta de contas", () => {
    test("consulta com sucesso", async() => {
        const { req, res } = createMocks({
            method: "GET",
            url: "api/conta/",
            query: {
                numero: "123456",
            }
        });

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
                numero: "1234567",
            }
        });

        await handler(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });
});