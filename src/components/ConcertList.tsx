// src/components/ConcertList.tsx
"use client";

import ConcertCard from "./ConcertCard";
import type { Concert } from "@/types/concert";

interface Props {
  concerts: Concert[];
  onHover?: (concert: Concert | null) => void;
  hoveredId?: string | null;
}

export default function ConcertList({ concerts, onHover, hoveredId }: Props) {
  if (concerts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🎤</p>
        <p className="font-medium text-gray-500">No concerts found.</p>
        <p className="text-sm mt-1">Try expanding your search radius or removing filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {concerts.map((concert) => (
        <ConcertCard
          key={concert.id}
          concert={concert}
          onHover={onHover}
          highlighted={hoveredId === concert.id}
        />
      ))}
    </div>
  );
}