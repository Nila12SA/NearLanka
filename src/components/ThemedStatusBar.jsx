import React from "react";
import { StatusBar } from "expo-status-bar";
import { getCurrentThemeMode } from "../theme/runtimeTheme";

export default function ThemedStatusBar(props) {
  const light = getCurrentThemeMode() === "Light";
  return (
    <StatusBar
      {...props}
      style={light ? "dark" : "light"}
      backgroundColor={light ? "#F3F6F2" : "#0B1211"}
    />
  );
}
