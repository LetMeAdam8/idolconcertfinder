"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { format, parseISO } from "date-fns";
import type { Concert } from "@/types/concert";

interface Props {
  concerts: Concert[];
  userLocation?: { lat: number; lng: number } | null;
  highlightedId?: string | null;
}

const MAP_CONTAINER = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 38.5, lng: -96.0 };
const DEFAULT_ZOOM = 4;

export default function ConcertMap({ concerts, userLocation, highlightedId }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selected, setSelected] = useState<Concert | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(9);
    }
  }, [userLocation]);

  useEffect(() => {
    if (highlightedId && mapRef.current) {
      const concert = concerts.find((c) => c.id === highlightedId);
      if (concert?.lat && concert?.lng) {
        mapRef.current.panTo({ lat: concert.lat, lng: concert.lng });
      }
    }
  }, [highlightedId, concerts]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-2xl">
        <span className="text-gray-400 text-sm">Loading map...</span>
      </div>
    );
  }

  // ✅ FIX: allow 0 coordinates (valid lat/lng)
  const withCoords = concerts.filter(
    (c) => c.lat !== undefined && c.lng !== undefined
  );

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER}
      center={userLocation || DEFAULT_CENTER}
      zoom={userLocation ? 9 : DEFAULT_ZOOM}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#3B82F6",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
          title="Your location"
        />
      )}

      {/* Concert markers */}
      {withCoords.map((concert) => (
        <Marker
          key={concert.id}
          position={{ lat: concert.lat!, lng: concert.lng! }}
          onClick={() => setSelected(concert)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: highlightedId === concert.id ? 10 : 7,
            fillColor: highlightedId === concert.id ? "#EF4444" : "#F97316",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
          title={concert.name}
        />
      ))}

      {/* Info window */}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat!, lng: selected.lng! }}
          onCloseClick={() => setSelected(null)}
        >
          <div className="p-1 max-w-xs">
            <p className="text-xs font-semibold text-red-500 mb-0.5">
              {selected.artist}
            </p>
            <p className="font-bold text-gray-900 text-sm mb-1">
              {selected.name}
            </p>
            <p className="text-xs text-gray-500 mb-0.5">
              {selected.venue}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              {selected.date
                ? format(parseISO(selected.date), "MMM d, yyyy")
                : "Date TBA"}
            </p>

            {/* ✅ FIXED LINK */}
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Get Tickets →
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}