import { PrismaClient } from '@prisma/client'

// Prisma Client Singleton
const prismaClientSingleton = () => {
  // Try POSTGRES_URL first, then DATABASE_URL
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!url) {
    console.error('Database URL is missing');
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
