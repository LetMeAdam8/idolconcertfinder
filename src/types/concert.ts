// src/types/concert.ts

export interface Concert {
  id: string;
  name: string;         // Event name (e.g. "Carrie Underwood Live")
  artist: string;       // Contestant name
  date: string;         // ISO date string: "2025-08-14T20:00:00Z"
  venue: string;        // Venue name
  city: string;
  state: string;
  country: string;
  url: string;          // Ticketmaster ticket purchase URL
  imageUrl?: string;    // Optional promo image from Ticketmaster
  lat?: number;         // Latitude for map pin
  lng?: number;         // Longitude for map pin
  minPrice?: number;
  maxPrice?: number;
}

export interface SearchParams {
  city?: string;
  state?: string;
  zipCode?: string;
  radiusMiles?: number;
  contestantId?: string;
}