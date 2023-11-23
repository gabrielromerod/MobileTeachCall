import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../services/authServices.js"; 
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoginScreen() {
  const navigation = useNavigation();

  // Estados para email, contraseña y rol
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
   const onRoleChange = (newRole) => {
     setRole(newRole);
   };
  const handleLogin = async () => {
    try {
      console.log("Intentando iniciar sesión con:", email, password, role);
      const userData = await signIn(email, password, role);
      console.log("Login exitoso:", userData);
      // Navegar a HomeScreen después del inicio de sesión exitoso
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un estado fuera del rango 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.log(error.request);
      } else {
        // Algo más causó el error
        console.log("Error", error.message);
      }
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={setPassword}
          />
          <Text className="text-gray-700 ml-4">Elige tu Role</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={role === "student" ? styles.buttonSelected : styles.button}
              onPress={() => onRoleChange("student")}
            >
              <Text style={styles.buttonText}>Estudiante</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={role === "teacher" ? styles.buttonSelected : styles.button}
              onPress={() => onRoleChange("teacher")}
            >
              <Text style={styles.buttonText}>Profesor</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/apple.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});