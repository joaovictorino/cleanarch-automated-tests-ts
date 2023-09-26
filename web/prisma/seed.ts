import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const contaOrigem = await prisma.conta.upsert({
    where: { numero: '123456' },
    update: {},
    create: {
      numero: '123456',
      saldo: 1000.0
    },
  })
  const contaDestino = await prisma.conta.upsert({
    where: { numero: '654321' },
    update: {},
    create: {
      numero: '654321',
      saldo: 1000.0
    },
  })
  console.log({ contaOrigem, contaDestino })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })