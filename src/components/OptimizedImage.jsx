import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

const contentFitByResizeMode = {
  contain: "contain",
  cover: "cover",
  stretch: "fill",
  center: "none",
  repeat: "cover",
};

export function OptimizedImage({
  resizeMode = "cover",
  contentFit,
  transition = 120,
  ...props
}) {
  return (
    <Image
      {...props}
      cachePolicy="memory-disk"
      contentFit={contentFit || contentFitByResizeMode[resizeMode] || "cover"}
      transition={transition}
    />
  );
}

export function OptimizedImageBackground({
  children,
  imageStyle,
  resizeMode = "cover",
  source,
  style,
  ...props
}) {
  return (
    <View style={style}>
      <OptimizedImage
        {...props}
        source={source}
        resizeMode={resizeMode}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
      />
      {children}
    </View>
  );
}