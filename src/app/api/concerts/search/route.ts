// src/app/api/concerts/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CONTESTANTS } from "@/data/contestants";
import type { Concert } from "@/types/concert";

const TM_KEY = process.env.TICKETMASTER_API_KEY!;
const TM_BASE = "https://app.ticketmaster.com/discovery/v2/events.json";

// ─── Geocode ──────────────────────────────────────────────────────────────────

async function geocode(
  city?: string,
  state?: string,
  zip?: string
): Promise<{ lat: number; lng: number } | null> {
  const gmKey =
    process.env.GOOGLE_GEOCODE_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = [city, state, zip].filter(Boolean).join(", ");
  if (!address) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("key", gmKey!);

  const res = await fetch(url.toString());
  const data = await res.json();
  const result = data.results?.[0];
  if (!result) return null;
  return {
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
  };
}

// ─── Haversine distance in miles ─────────────────────────────────────────────

function distanceMiles(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Fetch events for one attraction ID, all pages ───────────────────────────

async function fetchEventsForAttraction(
  attractionId: string
): Promise<any[]> {
  const buildUrl = (page: number): string => {
    const params = new URLSearchParams({
      apikey: TM_KEY,
      attractionId,
      classificationName: "music",
      sort: "date,asc",
      countryCode: "US",
      size: "200",
      page: String(page),
    });
    return `${TM_BASE}?${params.toString()}`;
  };

  const res = await fetch(buildUrl(0));
  if (!res.ok) return [];
  const data = await res.json();

  const firstPage: any[] = data._embedded?.events || [];
  const totalPages: number = data.page?.totalPages ?? 1;

  if (totalPages <= 1) return firstPage;

  const extraPageNumbers = Array.from(
    { length: Math.min(totalPages - 1, 4) },
    (_, i) => i + 1
  );

  const extraPages = await Promise.all(
    extraPageNumbers.map(async (page) => {
      const r = await fetch(buildUrl(page));
      if (!r.ok) return [];
      const d = await r.json();
      return d._embedded?.events || [];
    })
  );

  return [...firstPage, ...extraPages.flat()];
}

// ─── Parse a Ticketmaster event into our Concert shape ────────────────────────

function parseEvent(event: any, artistName: string): Concert {
  const venue = event._embedded?.venues?.[0];
  const priceRanges = event.priceRanges?.[0];
  const image = event.images?.find(
    (img: any) => img.ratio === "16_9" && img.width > 500
  );
  return {
    id: event.id,
    name: event.name,
    artist: artistName,
    date: event.dates?.start?.dateTime || event.dates?.start?.localDate || "",
    venue: venue?.name || "TBA",
    city: venue?.city?.name || "",
    state: venue?.state?.stateCode || "",
    country: venue?.country?.countryCode || "",
    url: event.url || "",
    imageUrl: image?.url,
    lat: venue?.location?.latitude
      ? parseFloat(venue.location.latitude)
      : undefined,
    lng: venue?.location?.longitude
      ? parseFloat(venue.location.longitude)
      : undefined,
    minPrice: priceRanges?.min,
    maxPrice: priceRanges?.max,
  };
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const state = searchParams.get("state") || undefined;
  const zip = searchParams.get("zip") || undefined;
  const radiusParam = searchParams.get("radius") || "100";
  const radius = parseInt(radiusParam, 10);
  const contestantId = searchParams.get("contestantId") || undefined;

  // Only include contestants that have a confirmed attractionId.
  // Keyword search is disabled entirely — it matches venue names, not artists.
const targets = (
  contestantId
    ? CONTESTANTS.filter((c) => c.id === contestantId)
    : CONTESTANTS
).filter((c): c is typeof c & { attractionId: string } =>
  typeof c.attractionId === "string" && c.attractionId.trim() !== ""
);

  if (targets.length === 0) {
    return NextResponse.json({ concerts: [], location: null });
  }

  // Geocode the search location if provided
  const location =
    city || state || zip ? await geocode(city, state, zip) : null;

  // Fetch events for all target artists in parallel
const results = await Promise.all(
  targets.map(async (contestant) => {
    const events = await fetchEventsForAttraction(contestant.attractionId);
    return events.map((e) => parseEvent(e, contestant.name));
  })
);

  let concerts: Concert[] = results.flat();

  // ── Strict radius filter using Haversine ─────────────────────────────────
  // We do NOT pass location params to Ticketmaster — their geo filtering
  // is unreliable as confirmed by debug output. We filter entirely ourselves.
  // Concerts with no coordinates are always excluded when a location is given.
  if (location) {
    concerts = concerts.filter((c) => {
      if (c.lat == null || c.lng == null) return false;
      return (
        distanceMiles(location.lat, location.lng, c.lat, c.lng) <= radius
      );
    });
  }

  // Sort by date, deduplicate by event ID
  concerts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const seen = new Set<string>();
  const unique = concerts.filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  return NextResponse.json({ concerts: unique, location });
}