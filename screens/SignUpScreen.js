import React, { useState } from "react";
import { StyleSheet,ScrollView,View, Image, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { signUp } from "../services/authServices"; // Asegúrate de importar signUp
import { themeColors } from "../theme";
import { SafeAreaView} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";


export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Asegúrate de que 'role' tenga un valor válido
  const navigation = useNavigation();

 const onRoleChange = (newRole) => {
   setRole(newRole);
 };

  const handleSignUp = async () => {
    try {
      const userData = await signUp({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      console.log("Registro exitoso:", userData);
      // Muestra un mensaje de alerta cuando el registro es exitoso
      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada con éxito.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      // Manejar errores
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
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
            source={require("../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">First Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter First Name"
          />

          <Text className="text-gray-700 ml-4">Last Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter Last Name"
          />

          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
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
          <TouchableOpacity
            onPress={handleSignUp}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
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
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
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