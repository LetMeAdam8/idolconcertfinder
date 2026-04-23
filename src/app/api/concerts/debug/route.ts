// src/app/api/concerts/debug/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const TM_KEY = process.env.TICKETMASTER_API_KEY!;
const TM_BASE = "https://app.ticketmaster.com/discovery/v2/events.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const attractionId = searchParams.get("attractionId");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const radius = searchParams.get("radius") || "100";

  if (!TM_KEY) {
    return NextResponse.json({ error: "TICKETMASTER_API_KEY not set" });
  }

  try {
    // Test 1: geocode if location provided
    let geocodeResult = null;
    if (city || state) {
      const gmKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const address = [city, state].filter(Boolean).join(", ");
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${gmKey}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      geocodeResult = {
        status: geoData.status,
        location: geoData.results?.[0]?.geometry?.location || null,
        formattedAddress: geoData.results?.[0]?.formatted_address || null,
      };
    }

    // Test 2: fetch by attractionId if provided
    let attractionIdResults = null;
    if (attractionId) {
      const url = `${TM_BASE}?apikey=${TM_KEY}&attractionId=${attractionId}&countryCode=US&size=5&sort=date,asc`;
      const res = await fetch(url);
      const data = await res.json();
      attractionIdResults = {
        totalFound: data.page?.totalElements ?? 0,
        events: (data._embedded?.events || []).map((e: any) => ({
          id: e.id,
          name: e.name,
          date: e.dates?.start?.dateTime || e.dates?.start?.localDate,
          venue: e._embedded?.venues?.[0]?.name,
          city: e._embedded?.venues?.[0]?.city?.name,
          state: e._embedded?.venues?.[0]?.state?.stateCode,
          lat: e._embedded?.venues?.[0]?.location?.latitude,
          lng: e._embedded?.venues?.[0]?.location?.longitude,
          headliner: e._embedded?.attractions?.[0]?.name,
          headlinerId: e._embedded?.attractions?.[0]?.id,
        })),
      };
    }

    // Test 3: fetch by keyword if provided
    let keywordResults = null;
    if (keyword) {
      const url = `${TM_BASE}?apikey=${TM_KEY}&keyword=${encodeURIComponent(keyword)}&classificationName=music&countryCode=US&size=5&sort=date,asc`;
      const res = await fetch(url);
      const data = await res.json();
      keywordResults = {
        totalFound: data.page?.totalElements ?? 0,
        events: (data._embedded?.events || []).map((e: any) => ({
          id: e.id,
          name: e.name,
          date: e.dates?.start?.dateTime || e.dates?.start?.localDate,
          venue: e._embedded?.venues?.[0]?.name,
          city: e._embedded?.venues?.[0]?.city?.name,
          state: e._embedded?.venues?.[0]?.state?.stateCode,
          lat: e._embedded?.venues?.[0]?.location?.latitude,
          lng: e._embedded?.venues?.[0]?.location?.longitude,
          headliner: e._embedded?.attractions?.[0]?.name,
          headlinerId: e._embedded?.attractions?.[0]?.id,
        })),
      };
    }

    return NextResponse.json({
      geocodeResult,
      attractionIdResults,
      keywordResults,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}