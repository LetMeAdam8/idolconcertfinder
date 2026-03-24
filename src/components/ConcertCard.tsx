"use client";

import { format, parseISO } from "date-fns";
import { MapPin, Calendar, DollarSign, ExternalLink } from "lucide-react";
import type { Concert } from "@/types/concert";

interface Props {
  concert: Concert;
  onHover?: (concert: Concert | null) => void;
  highlighted?: boolean;
}

export default function ConcertCard({ concert, onHover, highlighted }: Props) {
  const date = concert.date
    ? format(parseISO(concert.date), "EEE, MMM d yyyy · h:mm a")
    : "Date TBA";

  return (
    <div
      onMouseEnter={() => onHover?.(concert)}
      onMouseLeave={() => onHover?.(null)}
      className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-200 ${
        highlighted
          ? "border-red-400 shadow-red-100 shadow-md scale-[1.01]"
          : "border-gray-100 hover:shadow-md hover:scale-[1.005]"
      }`}
    >
      {/* Image strip */}
      {concert.imageUrl && (
        <img
          src={concert.imageUrl}
          alt={concert.name}
          className="w-full h-36 object-cover"
        />
      )}

      <div className="p-4 space-y-2.5">
        {/* Artist badge */}
        <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
          {concert.artist}
        </span>

        {/* Event name */}
        <h3 className="font-bold text-gray-900 text-base leading-snug">
          {concert.name}
        </h3>

        {/* Date */}
        <div className="flex items-start gap-2 text-sm text-gray-500">
          <Calendar size={14} className="mt-0.5 shrink-0 text-gray-400" />
          <span>{date}</span>
        </div>

        {/* Venue + location */}
        <div className="flex items-start gap-2 text-sm text-gray-500">
          <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
          <span>
            {concert.venue}
            {concert.city && ` · ${concert.city}`}
            {concert.state && `, ${concert.state}`}
          </span>
        </div>

        {/* Price range */}
        {concert.minPrice && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <DollarSign size={14} className="shrink-0 text-gray-400" />
            <span>
              From ${concert.minPrice.toFixed(0)}
              {concert.maxPrice && concert.maxPrice !== concert.minPrice
                ? ` – $${concert.maxPrice.toFixed(0)}`
                : ""}
            </span>
          </div>
        )}

        {/* Tickets link */}
        <a
          href={concert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-1.5 w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 rounded-lg transition"
        >
          Get Tickets
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}