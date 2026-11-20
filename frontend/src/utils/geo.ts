export interface ClientGeo {
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  suggested_location: string | null;
}

let cachedGeo: ClientGeo | null = null;

export async function fetchClientGeo(): Promise<ClientGeo> {
  if (cachedGeo) return cachedGeo;

  try {
    const res = await fetch('/api/v1/geo');
    if (res.ok) {
      const data = (await res.json()) as ClientGeo;
      cachedGeo = data;
      return data;
    }
  } catch {
    // Graceful offline fallback
  }

  return {
    country: null,
    region: null,
    city: null,
    timezone: null,
    suggested_location: null,
  };
}
