import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface Marker {
  id: string;
  title: string;
  description?: string;
  location: Location;
  type: "retailer" | "recycling" | "user" | "donation";
  icon?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface MapState {
  currentLocation: Location | null;
  markers: Marker[];
  selectedMarker: Marker | null;
  mapCenter: Location | null;
  zoom: number;
  mapStyle: "standard" | "satellite" | "terrain";
  showUserLocation: boolean;
  isLocationLoading: boolean;
  locationError: string | null;
  isMarkersLoading: boolean;
  markersError: string | null;
}

// Initial state
const initialState: MapState = {
  currentLocation: null,
  markers: [],
  selectedMarker: null,
  mapCenter: { latitude: 44.4268, longitude: 26.1025 }, // Bucharest default
  zoom: 12,
  mapStyle: "standard",
  showUserLocation: true,
  isLocationLoading: false,
  locationError: null,
  isMarkersLoading: false,
  markersError: null,
};

// Mock data for retailers/recycling points
const mockMarkers: Marker[] = [
  {
    id: "retailer_1",
    title: "Mega Image Unirii",
    description: "Supermarket cu program de reciclare",
    location: { latitude: 44.428, longitude: 26.103 },
    type: "retailer",
    icon: "/icons/retailer_location_icon.png",
    metadata: { address: "Piața Unirii nr. 1, București" },
  },
  {
    id: "retailer_2",
    title: "Kaufland Berceni",
    description: "Hipermarket cu colectare PET",
    location: { latitude: 44.41, longitude: 26.12 },
    type: "retailer",
    icon: "/icons/retailer_location_icon.png",
    metadata: { address: "Șoseaua Berceni nr. 45, București" },
  },
  {
    id: "recycling_1",
    title: "Centru Reciclare Eco",
    description: "Centru de colectare selectivă",
    location: { latitude: 44.435, longitude: 26.11 },
    type: "recycling",
    icon: "/icons/map_location_icon.png",
    metadata: { address: "Strada Ecologiei nr. 12, București" },
  },
  {
    id: "donation_1",
    title: "Daruiește Aripi",
    description: "Punct de donație",
    location: { latitude: 44.42, longitude: 26.095 },
    type: "donation",
    icon: "/icons/donate_icon.png",
    metadata: { address: "Calea Victoriei nr. 120, București" },
  },
];

// Async thunks
export const getCurrentLocation = createAsyncThunk(
  "map/getCurrentLocation",
  async (_, { rejectWithValue }) => {
    try {
      if (!navigator.geolocation) {
        return rejectWithValue("Geolocation is not supported");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          });
        }
      );

      const location: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now(),
      };

      return location;
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            return rejectWithValue("Location access denied");
          case error.POSITION_UNAVAILABLE:
            return rejectWithValue("Location unavailable");
          case error.TIMEOUT:
            return rejectWithValue("Location request timeout");
          default:
            return rejectWithValue("Location error");
        }
      }
      return rejectWithValue("Failed to get location");
    }
  }
);

export const loadMarkers = createAsyncThunk(
  "map/loadMarkers",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Return mock markers
      return mockMarkers;
    } catch {
      return rejectWithValue("Failed to load markers");
    }
  }
);

export const addMarker = createAsyncThunk(
  "map/addMarker",
  async (marker: Omit<Marker, "id">, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMarker: Marker = {
        ...marker,
        id: `marker_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 15)}`,
      };

      return newMarker;
    } catch {
      return rejectWithValue("Failed to add marker");
    }
  }
);

export const removeMarker = createAsyncThunk(
  "map/removeMarker",
  async (markerId: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      return markerId;
    } catch {
      return rejectWithValue("Failed to remove marker");
    }
  }
);

// Slice
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCenter: (state, action: PayloadAction<Location>) => {
      state.mapCenter = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setMapStyle: (
      state,
      action: PayloadAction<"standard" | "satellite" | "terrain">
    ) => {
      state.mapStyle = action.payload;
    },
    setShowUserLocation: (state, action: PayloadAction<boolean>) => {
      state.showUserLocation = action.payload;
    },
    setSelectedMarker: (state, action: PayloadAction<Marker | null>) => {
      state.selectedMarker = action.payload;
    },
    clearLocationError: (state) => {
      state.locationError = null;
    },
    clearMarkersError: (state) => {
      state.markersError = null;
    },
    updateMarker: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Marker> }>
    ) => {
      const { id, updates } = action.payload;
      const markerIndex = state.markers.findIndex((m) => m.id === id);
      if (markerIndex !== -1) {
        state.markers[markerIndex] = {
          ...state.markers[markerIndex],
          ...updates,
        };
        if (state.selectedMarker?.id === id) {
          state.selectedMarker = { ...state.selectedMarker, ...updates };
        }
      }
    },
    clearMarkers: (state) => {
      state.markers = [];
      state.selectedMarker = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get current location
      .addCase(getCurrentLocation.pending, (state) => {
        state.isLocationLoading = true;
        state.locationError = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.isLocationLoading = false;
        state.currentLocation = action.payload;
        state.locationError = null;
        // Update map center to current location
        state.mapCenter = action.payload;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.isLocationLoading = false;
        state.locationError = action.payload as string;
      })
      // Load markers
      .addCase(loadMarkers.pending, (state) => {
        state.isMarkersLoading = true;
        state.markersError = null;
      })
      .addCase(loadMarkers.fulfilled, (state, action) => {
        state.isMarkersLoading = false;
        state.markers = action.payload;
        state.markersError = null;
      })
      .addCase(loadMarkers.rejected, (state, action) => {
        state.isMarkersLoading = false;
        state.markersError = action.payload as string;
      })
      // Add marker
      .addCase(addMarker.fulfilled, (state, action) => {
        state.markers.push(action.payload);
      })
      .addCase(addMarker.rejected, (state, action) => {
        state.markersError = action.payload as string;
      })
      // Remove marker
      .addCase(removeMarker.fulfilled, (state, action) => {
        state.markers = state.markers.filter((m) => m.id !== action.payload);
        if (state.selectedMarker?.id === action.payload) {
          state.selectedMarker = null;
        }
      })
      .addCase(removeMarker.rejected, (state, action) => {
        state.markersError = action.payload as string;
      });
  },
});

export const {
  setMapCenter,
  setZoom,
  setMapStyle,
  setShowUserLocation,
  setSelectedMarker,
  clearLocationError,
  clearMarkersError,
  updateMarker,
  clearMarkers,
} = mapSlice.actions;

export default mapSlice.reducer;
