import React from "react";
import { StatusBar } from "expo-status-bar";

export default function ThemedStatusBar(props) {
  return <StatusBar {...props} style={props.style || "light"} backgroundColor={props.backgroundColor || "#0B1211"} />;
}