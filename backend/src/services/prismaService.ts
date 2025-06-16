/**
 * Prevent multiple PrismaClient instances in development (hot reload)
 * https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 */
import type { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new (require('@prisma/client').PrismaClient)();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new (require('@prisma/client').PrismaClient)();
  }
  prisma = globalThis.prisma;
}

module.exports = prisma; 