// src/app/api/concerts/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { CONTESTANTS } from "@/data/contestants";
import type { Concert } from "@/types/concert";

const TM_KEY = process.env.TICKETMASTER_API_KEY!;
const TM_BASE = "https://app.ticketmaster.com/discovery/v2/events.json";

// Google Geocoding — converts a city/state/zip into lat/lng
async function geocode(city?: string, state?: string, zip?: string) {
  const gmKey = process.env.GOOGLE_GEOCODE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = [city, state, zip].filter(Boolean).join(", ");
  if (!address) return null;

  const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: { address, key: gmKey },
  });

  const result = res.data.results?.[0];
  if (!result) return null;
  return {
    lat: result.geometry.location.lat as number,
    lng: result.geometry.location.lng as number,
  };
}

// Parse Ticketmaster event into our Concert shape
function parseEvent(event: any, artist: string): Concert {
  const venue = event._embedded?.venues?.[0];
  const priceRanges = event.priceRanges?.[0];
  const image = event.images?.find((img: any) => img.ratio === "16_9" && img.width > 500);

  return {
    id: event.id,
    name: event.name,
    artist,
    date: event.dates?.start?.dateTime || event.dates?.start?.localDate,
    venue: venue?.name || "TBA",
    city: venue?.city?.name || "",
    state: venue?.state?.stateCode || "",
    country: venue?.country?.countryCode || "",
    url: event.url,
    imageUrl: image?.url,
    lat: venue?.location?.latitude ? parseFloat(venue.location.latitude) : undefined,
    lng: venue?.location?.longitude ? parseFloat(venue.location.longitude) : undefined,
    minPrice: priceRanges?.min,
    maxPrice: priceRanges?.max,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const state = searchParams.get("state") || undefined;
  const zip = searchParams.get("zip") || undefined;
  const radius = searchParams.get("radius") || "100";
  const contestantId = searchParams.get("contestantId") || undefined;

  // Determine which contestants to fetch
  const targets = contestantId
    ? CONTESTANTS.filter((c) => c.id === contestantId)
    : CONTESTANTS;

  // Geocode the location if provided
  const location = (city || state || zip) ? await geocode(city, state, zip) : null;

  // Build Ticketmaster query params shared across all requests
  const baseParams: Record<string, string> = {
    apikey: TM_KEY,
    classificationName: "music",
    size: "10", // max per artist per request
    sort: "date,asc",
  };

  if (location) {
    baseParams.latlong = `${location.lat},${location.lng}`;
    baseParams.radius = radius;
    baseParams.unit = "miles";
  }

  // Fan out requests for every targeted contestant
  const requests = targets.map((contestant) =>
    axios
      .get(TM_BASE, {
        params: { ...baseParams, keyword: contestant.ticketmasterKeyword },
      })
      .then((res) => {
        const events: any[] = res.data._embedded?.events || [];
        return events.map((e) => parseEvent(e, contestant.name));
      })
      .catch(() => [] as Concert[]) // silently skip if one artist has no results
  );

  const nested = await Promise.all(requests);
  const concerts: Concert[] = nested
    .flat()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Deduplicate by event ID (some artists might have the same event)
  const seen = new Set<string>();
  const unique = concerts.filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  return NextResponse.json({ concerts: unique, location });
}