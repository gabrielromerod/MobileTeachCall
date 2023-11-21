import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Logo() {
  return (
    <View style={styles.lottie}>
      <LottieView
        source={require("my-teach-app/assets/animations/login.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: "center",
    height:400,
    marginBottom: 8,
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
