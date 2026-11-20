import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../services/lead.service.js';

export const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (_request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        database: 'connected',
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      return reply.status(503).send({
        status: 'error',
        database: 'disconnected',
        error: err?.message,
      });
    }
  });
};
