import { env } from '../config/env.js';

export class TurnstileService {
  public async verifyToken(token?: string, ip?: string): Promise<boolean> {
    if (!env.TURNSTILE_ENABLED) {
      return true; // Bypass when disabled in development
    }

    if (!token || !env.TURNSTILE_SECRET_KEY) {
      return false;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('secret', env.TURNSTILE_SECRET_KEY);
      formData.append('response', token);
      if (ip) {
        formData.append('remoteip', ip);
      }

      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const outcome = (await res.json()) as { success: boolean };
      return outcome.success;
    } catch (err) {
      console.error('Turnstile verification error:', err);
      return false;
    }
  }
}

export const turnstileService = new TurnstileService();
