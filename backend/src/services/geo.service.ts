import { isPrivateIp } from '../utils/ip.js';

export interface GeoLocation {
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  suggested_location: string | null;
}

export class GeoService {
  /**
   * Resolves IP to GeoLocation data.
   * If IP is private or lookup fails, returns null fields gracefully per SPEC 5.1.
   */
  public async lookup(ip: string): Promise<GeoLocation> {
    const emptyGeo: GeoLocation = {
      country: null,
      region: null,
      city: null,
      timezone: null,
      suggested_location: null,
    };

    if (!ip || isPrivateIp(ip)) {
      return emptyGeo;
    }

    try {
      // Optional fast online lookup for development/staging when mmdb isn't installed
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,timezone`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = (await response.json()) as {
          status: string;
          country?: string;
          regionName?: string;
          city?: string;
          timezone?: string;
        };

        if (data.status === 'success') {
          const city = data.city || null;
          const region = data.regionName || null;
          const country = data.country || null;
          const timezone = data.timezone || null;

          return {
            country,
            region,
            city,
            timezone,
            suggested_location: city || region || country,
          };
        }
      }
    } catch {
      // Timeout or offline - return emptyGeo without throwing
    }

    return emptyGeo;
  }
}

export const geoService = new GeoService();
