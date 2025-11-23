import { PrismaClient } from '@prisma/client'

// Prisma Client Singleton
const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is missing in prisma.ts');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: url,
      },
    },
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export { prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
