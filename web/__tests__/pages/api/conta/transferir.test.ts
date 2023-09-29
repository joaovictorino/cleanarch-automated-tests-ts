import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../../mock/prisma";
import { Conta, PrismaPromise } from "@prisma/client";
import transferir from "../../../../pages/api/contas/transferir";

describe("API de transferência", () => {
    test("transferência com sucesso", async () => {
        const { req, res } = createMocks({
            method: "POST",
            url: "api/contas/transferir",
            body: {
                origem: "123456",
                destino: "654321",
                valor: 100.0
            }
        });

        criarMockPrisma();

        await transferir(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                recibo: expect.any(String)
            })
        );
    });

    test("transferência conta de origem inexistente", async () => {
        const { req, res } = createMocks({
            method: "POST",
            url: "api/contas/transferir",
            body: {
                origem: "123455",
                destino: "654321",
                valor: 100.0
            }
        });

        criarMockPrisma();

        await transferir(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject(
            expect.objectContaining({
                mensagem: "conta de origem não encontrada"
            })
        );
    });
});

function criarMockPrisma() {
    prismaMock.conta.findUnique.mockImplementation((args) => {
        const contaOrigem: Conta = {
            numero: "123456",
            saldo: 1000.0
        };

        const contaDestino: Conta = {
            numero: "654321",
            saldo: 1000.0
        };

        if (args.where.numero === "123456") {
            return contaOrigem as unknown as PrismaPromise<Conta>;
        } else if (args.where.numero === "654321") {
            return contaDestino as unknown as PrismaPromise<Conta>;
        } else {
            return undefined;
        }
    });

    prismaMock.conta.create.mockResolvedValue(null);
}
