import { Bot } from 'grammy';
import { env } from '../config/env.js';
import { handleStartCommand } from './handlers/start.js';
import { handleLeadCallback } from './handlers/callbacks.js';

export const isBotTokenConfigured = Boolean(
  env.TELEGRAM_BOT_TOKEN &&
    env.TELEGRAM_BOT_TOKEN !== '123456789:ABCdefGHIjklMNOpqrsTUVwxyz' &&
    env.TELEGRAM_BOT_TOKEN.includes(':')
);

export const bot = new Bot(isBotTokenConfigured ? env.TELEGRAM_BOT_TOKEN : '123456789:ABCdefGHIjklMNOpqrsTUVwxyz');

if (isBotTokenConfigured) {
  bot.command('start', handleStartCommand);
  bot.on('callback_query:data', handleLeadCallback);

  bot.catch((err) => {
    console.error('grammY error handler caught an error:', err);
  });
}
