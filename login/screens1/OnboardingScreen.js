import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 20 }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/education.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Aprende y Enseña",
            subtitle:
              "Descubre TeachCall un mundo de conocimiento donde cada interacción es una oportunidad de crecimiento.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/posts.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Interactúa con otros",
            subtitle: "Comparte tus conocimientos y aprende de los demás",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/review.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Da Voz a Tu Experiencia",
            subtitle:
              " Comparte tus impresiones para construir juntos una experiencia de aprendizaje excepcional.",
          },
        ]}
        onDone={() => navigation.navigate("StartScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: height * 0.5,
  },
});
