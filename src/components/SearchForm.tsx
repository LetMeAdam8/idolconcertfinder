// src/components/SearchForm.tsx
"use client";

import { useState } from "react";
import { Search, MapPin, User } from "lucide-react";
import { CONTESTANTS } from "@/data/contestants";
import type { SearchParams } from "@/types/concert";

interface Props {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const RADIUS_OPTIONS = [25, 50, 100, 200, 500];

export default function SearchForm({ onSearch, loading }: Props) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [radiusMiles, setRadiusMiles] = useState(100);
  const [contestantId, setContestantId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, state, zipCode, radiusMiles, contestantId: contestantId || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 space-y-5"
    >
      {/* Location section */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <MapPin size={15} />
          Your Location (optional — leave blank for all US concerts)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          <input
            type="text"
            placeholder="State (e.g. TX)"
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            maxLength={2}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>
      </div>

      {/* Radius */}
      {(city || state || zipCode) && (
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Search Radius
          </label>
          <div className="flex gap-2 flex-wrap">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRadiusMiles(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  radiusMiles === r
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r} mi
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contestant picker */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <User size={15} />
          Filter by Contestant (optional)
        </label>
        <select
          value={contestantId}
          onChange={(e) => setContestantId(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white"
        >
          <option value="">All American Idol Alumni</option>
          {[...CONTESTANTS]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — S{c.season} {c.placement}
              </option>
            ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <Search size={16} />
        )}
        {loading ? "Searching..." : "Find Concerts"}
      </button>
    </form>
  );
}