```typescript
import { PrismaClient } from '@prisma/client'

// Prisma Client Singleton
const prismaClientSingleton = () => {
  // FORCE HARDCODED URL TO BREAK THE LOOP
  const url = "postgresql://neondb_owner:npg_eQktP1bMlX4x@ep-lingering-snow-a4w3qe4l-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
  
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
