export const rgba = (hex, alpha) => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const colors = {
  base: {
    white: "#FFFFFF",
    black: "#000000",
  },

  primaryBlue: {
    50: "#D4F8F7",
    100: "#C6E9E9",
    200: "#AACDCD",
    300: "#8FB2B1",
    400: "#759797",
    500: "#5C7D7D",
    600: "#436464",
    700: "#2B4C4C",
    800: "#133536",
    900: "#002020",
  },

  secondaryBlue: {
    50: "#C8FAFA",
    100: "#BAECEB",
    200: "#9ED0CF",
    300: "#83B4B4",
    400: "#699999",
    500: "#4F7F7F",
    600: "#366666",
    700: "#1B4E4E",
    800: "#003737",
  },

  brown: {
    50: "#FFEDE7",
    100: "#FFDBCD",
    200: "#ECBCA9",
    300: "#CFA18F",
    400: "#B28776",
    500: "#966E5D",
    600: "#7B5646",
    700: "#613F30",
    800: "#47291C",
    900: "#2E1409",
  },

  neutral: {
    50: "#F1F1F0",
    100: "#E3E2E2",
    200: "#C6C6C6",
    300: "#ABABAB",
    400: "#909190",
    500: "#767777",
    600: "#5D5F5E",
    700: "#464747",
    800: "#2F3130",
    900: "#1A1C1C",
    950: "#121414",
  },

  accent: {
    gold: "#D19F65",
  },

  semantic: {
    background: "#121414",
    surface: "#1A1C1C",
    card: "#2F3130",
    border: "#464747",

    textPrimary: "#FFFFFF",
    textSecondary: "#C6C6C6",
    textMuted: "#909190",

    primary: "#D19F65",
    primarySoft: rgba("#D19F65", 0.2),

    categoryHotel: "#5C7D7D",
    categoryNature: "#366666",
    categoryHistorical: "#7B5646",

    error: "#E53935",
    success: "#4CAF50",
  },

  opacity: {
    white10: rgba("#FFFFFF", 0.1),
    white20: rgba("#FFFFFF", 0.2),
    white50: rgba("#FFFFFF", 0.5),
    white80: rgba("#FFFFFF", 0.8),

    black20: rgba("#000000", 0.2),
    black50: rgba("#000000", 0.5),

    neutral950_40: rgba("#121414", 0.4),
    neutral950_70: rgba("#121414", 0.7),
    neutral950_80: rgba("#121414", 0.8),

    gold10: rgba("#D19F65", 0.1),
    gold20: rgba("#D19F65", 0.2),
    gold30: rgba("#D19F65", 0.3),
    gold90: rgba("#D19F65", 0.9),
  },
};