import { buildServer } from './api/server.js';
import { env } from './config/env.js';
import { bot, isBotTokenConfigured } from './bot/bot.js';
import { prisma } from './services/lead.service.js';

async function main() {
  const app = await buildServer();

  try {
    await app.listen({ port: env.PORT, host: env.HOST });
    console.log(`🚀 [Server] Fastify API listening on http://${env.HOST}:${env.PORT}`);
    console.log(`📡 [API Endpoints] /api/v1/geo | /api/v1/leads | /api/v1/health`);

    // Start Telegram Bot
    if (isBotTokenConfigured) {
      if (env.TELEGRAM_WEBHOOK_URL) {
        console.log(`🤖 [Telegram Bot] Running in Webhook mode on ${env.TELEGRAM_WEBHOOK_URL}`);
        await bot.api.setWebhook(env.TELEGRAM_WEBHOOK_URL, {
          secret_token: env.TELEGRAM_WEBHOOK_SECRET,
        });
      } else {
        console.log(`🤖 [Telegram Bot] Running in Long Polling mode (development)`);
        bot.start({
          onStart: (botInfo) => {
            console.log(`✅ [Telegram Bot] Connected as @${botInfo.username}`);
          },
        });
      }
    } else {
      console.log(`⚠️ [Telegram Bot] Real bot token not set. Operating in Dev Mock Mode.`);
      console.log(`💡 Set TELEGRAM_BOT_TOKEN in .env to connect a live Telegram bot.`);
    }
  } catch (err) {
    console.error('Fatal error during startup:', err);
    process.exit(1);
  }

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      try {
        if (isBotTokenConfigured && !env.TELEGRAM_WEBHOOK_URL) {
          await bot.stop();
        }
        await app.close();
        await prisma.$disconnect();
        console.log('✅ All services stopped safely.');
        process.exit(0);
      } catch (e) {
        console.error('Error during shutdown:', e);
        process.exit(1);
      }
    });
  }
}

main();
