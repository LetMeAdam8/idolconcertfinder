// src/lib/googleMapsConfig.ts
import type { Libraries } from "@react-google-maps/api";

// Defined outside any component so the array reference is stable across renders.
// @react-google-maps/api warns if this changes between renders.
export const GOOGLE_MAPS_LIBRARIES: Libraries = ["geometry"];