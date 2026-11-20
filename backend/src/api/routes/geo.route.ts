import type { FastifyPluginAsync } from 'fastify';
import { getClientIp } from '../../utils/ip.js';
import { geoService } from '../../services/geo.service.js';

export const geoRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/geo', async (request, reply) => {
    const ip = getClientIp(request);
    const geoData = await geoService.lookup(ip);
    return reply.status(200).send(geoData);
  });
};
