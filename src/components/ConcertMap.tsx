// src/components/ConcertMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";
import { format, parseISO } from "date-fns";
import type { Concert } from "@/types/concert";
import { GOOGLE_MAPS_LIBRARIES } from "@/lib/googleMapsConfig";

interface Props {
  concerts: Concert[];
  userLocation?: { lat: number; lng: number } | null;
  radiusMiles?: number;
  highlightedId?: string | null;
}

const MAP_CONTAINER = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 38.5, lng: -96.0 };
const MILES_TO_METERS = 1609.34;

function getRadiusBounds(
  center: { lat: number; lng: number },
  radiusMiles: number
): google.maps.LatLngBounds {
  const radiusMeters = radiusMiles * MILES_TO_METERS;
  const bounds = new google.maps.LatLngBounds();

  const origin = new google.maps.LatLng(center.lat, center.lng);

  // Guard in case geometry library isn't ready
  if (!google.maps.geometry?.spherical) return bounds;

  const north = google.maps.geometry.spherical.computeOffset(origin, radiusMeters, 0);
  const south = google.maps.geometry.spherical.computeOffset(origin, radiusMeters, 180);
  const east = google.maps.geometry.spherical.computeOffset(origin, radiusMeters, 90);
  const west = google.maps.geometry.spherical.computeOffset(origin, radiusMeters, 270);

  bounds.extend(north);
  bounds.extend(south);
  bounds.extend(east);
  bounds.extend(west);

  return bounds;
}

export default function ConcertMap({
  concerts,
  userLocation,
  radiusMiles,
  highlightedId,
}: Props) {
const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  libraries: GOOGLE_MAPS_LIBRARIES,
});

  const [selected, setSelected] = useState<Concert | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasZoomedToLocation = useRef(false);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !userLocation || !radiusMiles) return;
    if (hasZoomedToLocation.current) return;

    hasZoomedToLocation.current = true;

    const bounds = getRadiusBounds(userLocation, radiusMiles);
    mapRef.current.fitBounds(bounds, 40);
  }, [isLoaded, userLocation, radiusMiles]);

  useEffect(() => {
    hasZoomedToLocation.current = false;
  }, [userLocation]);

  useEffect(() => {
    if (!highlightedId || !mapRef.current) return;

    const concert = concerts.find((c) => c.id === highlightedId);
    if (concert?.lat != null && concert?.lng != null) {
      mapRef.current.panTo({ lat: concert.lat, lng: concert.lng });
    }
  }, [highlightedId, concerts]);

  if (!isLoaded || typeof google === "undefined") {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-2xl">
        <span className="text-gray-400 text-sm">Loading map...</span>
      </div>
    );
  }

  const withCoords = concerts.filter(
    (c) => c.lat != null && c.lng != null
  );

  let initialCenter = DEFAULT_CENTER;
  let initialZoom = 4;

  if (userLocation) {
    initialCenter = userLocation;
    initialZoom = 8;
  } else if (withCoords.length > 0) {
    initialCenter = {
      lat: withCoords[0].lat!,
      lng: withCoords[0].lng!,
    };
    initialZoom = 5;
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER}
      center={initialCenter}
      zoom={initialZoom}
      onLoad={(map) => {
        mapRef.current = map;

        if (!userLocation && withCoords.length > 1) {
          const bounds = new google.maps.LatLngBounds();
          withCoords.forEach((c) =>
            bounds.extend({ lat: c.lat!, lng: c.lng! })
          );
          map.fitBounds(bounds, 48);
        }

        if (userLocation && radiusMiles) {
          hasZoomedToLocation.current = true;
          const bounds = getRadiusBounds(userLocation, radiusMiles);
          map.fitBounds(bounds, 40);
        }
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
      {/* Radius circle */}
      {userLocation && radiusMiles && (
        <Circle
          center={userLocation}
          radius={radiusMiles * MILES_TO_METERS}
          options={{
            fillColor: "#EF4444",
            fillOpacity: 0.06,
            strokeColor: "#EF4444",
            strokeOpacity: 0.5,
            strokeWeight: 1.5,
          }}
        />
      )}

      {/* User location */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: "#3B82F6",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2.5,
          }}
          title="Your search location"
          zIndex={1000}
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
            scale: highlightedId === concert.id ? 11 : 8,
            fillColor:
              highlightedId === concert.id ? "#EF4444" : "#F97316",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
          title={concert.name}
          zIndex={highlightedId === concert.id ? 999 : 1}
        />
      ))}

      {/* Info window */}
      {selected && selected.lat != null && selected.lng != null && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ padding: "4px", maxWidth: "220px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#EF4444", marginBottom: "2px" }}>
              {selected.artist}
            </p>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
              {selected.name}
            </p>
            <p style={{ fontSize: "11px", color: "#6B7280", marginBottom: "2px" }}>
              {selected.venue}
            </p>
            <p style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
              {selected.city}{selected.state ? `, ${selected.state}` : ""}
            </p>
            <p style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px" }}>
              {selected.date
                ? format(parseISO(selected.date), "MMM d, yyyy")
                : "Date TBA"}
            </p>

            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", fontWeight: 600, color: "#2563EB" }}
            >
              Get Tickets
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}