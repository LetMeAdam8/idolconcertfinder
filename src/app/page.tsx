// src/app/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { Music } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import ConcertList from "@/components/ConcertList";
import ConcertMap from "@/components/ConcertMap";
import type { Concert, SearchParams } from "@/types/concert";

type ViewMode = "list" | "map" | "split";

export default function HomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [hoveredConcert, setHoveredConcert] = useState<Concert | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [searchedRadius, setSearchedRadius] = useState<number>(100);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setSearchedRadius(params.radiusMiles || 100);

    try {
      const query = new URLSearchParams();
      if (params.city) query.set("city", params.city);
      if (params.state) query.set("state", params.state);
      if (params.zipCode) query.set("zip", params.zipCode);
      if (params.radiusMiles) query.set("radius", String(params.radiusMiles));
      if (params.contestantId) query.set("contestantId", params.contestantId);

      const res = await axios.get(`/api/concerts/search?${query.toString()}`);
      setConcerts(res.data.concerts);
      if (res.data.location) setUserLocation(res.data.location);
    } catch (err) {
      setError("Something went wrong fetching concerts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-red-500 text-white rounded-xl p-2">
            <Music size={20} />
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 text-xl leading-tight tracking-tight">
              Idol Concert Finder
            </h1>
            <p className="text-xs text-gray-400">
              Find upcoming concerts from American Idol alumni
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {searched && !loading && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-gray-600 text-sm font-medium">
                {concerts.length > 0
                  ? `${concerts.length} concert${concerts.length !== 1 ? "s" : ""} found`
                  : "No results"}
              </p>

              {concerts.length > 0 && (
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                  {(["list", "split", "map"] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition ${
                        viewMode === mode
                          ? "bg-red-500 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {concerts.length > 0 && (
              <div
                className={
                  viewMode === "split"
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                    : "block"
                }
              >
                {viewMode !== "map" && (
                  <div className="overflow-y-auto max-h-[80vh] pr-1">
                    <ConcertList
                      concerts={concerts}
                      onHover={(c) => setHoveredConcert(c)}
                      hoveredId={hoveredConcert?.id}
                    />
                  </div>
                )}

                {viewMode !== "list" && (
                  <div
                    className={`rounded-2xl overflow-hidden shadow-md border border-gray-100 ${
                      viewMode === "map" ? "h-[75vh]" : "h-[80vh] sticky top-24"
                    }`}
                  >
                    <ConcertMap
                      concerts={concerts}
                      userLocation={userLocation}
                      radiusMiles={searchedRadius}
                      highlightedId={hoveredConcert?.id}
                    />
                  </div>
                )}
              </div>
            )}

            {concerts.length === 0 && <ConcertList concerts={[]} />}
          </>
        )}

        {!searched && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🎤</p>
            <p className="text-lg font-semibold text-gray-500">
              Search for upcoming American Idol alumni concerts
            </p>
            <p className="text-sm mt-2">
              Enter a location, choose a contestant, or just click search for all upcoming shows.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}