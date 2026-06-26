let currentThemeMode = "Dark";

export function setCurrentThemeMode(mode) {
  currentThemeMode = mode === "Light" ? "Light" : "Dark";
}

export function getCurrentThemeMode() {
  return currentThemeMode;
}

const exactColors = {
  "#0b1211": "#F3F6F2",
  "#081816": "#F7FAF8",
  "#0b221f": "#EDF3F0",
  "#0e2421": "#E8F0ED",
  "#0f3a36": "#FFFFFF",
  "#102d2a": "#FFFFFF",
  "#123c39": "#FFFFFF",
  "#123f3a": "#FFFFFF",
  "#151a18": "#F8FAF9",
  "#101817": "#FFFFFF",
  "#244e4b": "#E3ECE9",
  "#273d3b": "#DCE8E4",
  "#2d302e": "#E6ECE9",
  "#333734": "#DCE4E1",
  "#050908": "#E8EFEC",
  "#f4f6f2": "#17322F",
  "#f2f0e8": "#17322F",
  "#e8efed": "#17322F",
  "#e7efed": "#17322F",
  "#d8e2df": "#17322F",
  "#d5e0dd": "#3F5651",
  "#d3dedb": "#3F5651",
  "#c8d8d5": "#17322F",
  "#c8d7d4": "#17322F",
  "#c5d4d1": "#526762",
  "#b9c4be": "#60736F",
  "#b7c8c5": "#60736F",
  "#b6d9d6": "#245F58",
  "#afc8c4": "#526D67",
  "#afc1bd": "#60736F",
  "#9fb8b4": "#526D67",
  "#91a8a5": "#718581",
  "#ffc05a": "#B7791F",
  "#f5b956": "#B7791F",
  "#d19f65": "#9A641D",
  "#245f58": "#B8CBC6",
  "#4f8178": "#397069",
};

function transformColor(value, property) {
  if (typeof value !== "string") return value;
  const lower = value.toLowerCase();
  if (exactColors[lower]) return exactColors[lower];

  if (lower.startsWith("rgba(255,255,255") || lower.startsWith("rgba(255, 255, 255")) {
    if (property === "backgroundColor") return "rgba(23,50,47,0.06)";
    if (property?.includes("border")) return "rgba(23,50,47,0.16)";
    return "#60736F";
  }
  if (lower.startsWith("rgba(182,217,214") || lower.startsWith("rgba(182, 217, 214")) {
    return property?.includes("border") ? "rgba(36,95,88,0.24)" : "#245F58";
  }
  if (lower.startsWith("rgba(18,63,58") || lower.startsWith("rgba(18, 63, 58")) {
    return property === "backgroundColor" ? "rgba(255,255,255,0.94)" : "#245F58";
  }
  if (lower.startsWith("rgba(0,0,0") || lower.startsWith("rgba(0, 0, 0")) {
    return value;
  }
  return value;
}

function transformStyle(style) {
  if (!style || typeof style !== "object") return style;
  const result = { ...style };
  for (const property of ["backgroundColor", "color", "borderColor", "borderTopColor", "borderBottomColor", "tintColor", "shadowColor"]) {
    if (property in result) result[property] = transformColor(result[property], property);
  }
  return result;
}

export function createThemedStyles(definitions) {
  const cache = new Map();
  return new Proxy(definitions, {
    get(target, property) {
      const value = target[property];
      if (currentThemeMode !== "Light" || !value || typeof value !== "object") {
        return value;
      }
      if (!cache.has(property)) cache.set(property, transformStyle(value));
      return cache.get(property);
    },
  });
}
