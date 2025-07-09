export const colors = {
  // Primary brand colors
  primary: {
    green: "#39AE70",
    lightGreen: "#D2ECDE",
  },

  // Emerald scale (for main page)
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    500: "#10b981",
    600: "#059669",
  },

  // Green scale
  green: {
    100: "#dcfce7",
    400: "#4ade80",
  },

  // Gray scale
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
  },

  // Base colors
  black: "#000000",
  white: "#ffffff",

  // Semantic colors
  background: {
    default: "#ffffff",
    secondary: "#f9fafb",
    accent: "#39AE70",
    lightAccent: "#D2ECDE",
  },

  text: {
    primary: "#000000",
    secondary: "#374151",
    muted: "#6b7280",
    inverse: "#ffffff",
    accent: "#39AE70",
  },

  border: {
    default: "#e5e7eb",
    dark: "#000000",
    accent: "#39AE70",
    emerald: "#d1fae5",
  },

  button: {
    primary: {
      bg: "#39AE70",
      text: "#ffffff",
      border: "#39AE70",
    },
    secondary: {
      bg: "#ffffff",
      text: "#000000",
      border: "#000000",
    },
    emerald: {
      bg: "#10b981",
      text: "#ffffff",
      border: "#10b981",
    },
    outlined: {
      bg: "#ffffff",
      text: "#059669",
      border: "#10b981",
    },
  },
} as const;

// Export individual color categories for easier access
export const {
  primary,
  emerald,
  green,
  gray,
  black,
  white,
  background,
  text,
  border,
  button,
} = colors;
