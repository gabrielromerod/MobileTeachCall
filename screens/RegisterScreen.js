import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const defaultProfileImage = require('../assets/test.png');
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissions required", "You need to grant gallery permissions to use this feature");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    const pickedImageUri = pickerResult.assets && pickerResult.assets[0].uri;
    if (pickedImageUri) {
      setImage(pickedImageUri);
    }  
  };

  const takePhoto = async () => {
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermissionResult.granted === false) {
      Alert.alert("Permissions required", "You need to grant camera permissions to use this feature");
      return;
    }

    const photoResult = await ImagePicker.launchCameraAsync();
    if (photoResult.canceled === true) {
      return;
    }

    const photoUri = photoResult.assets && photoResult.assets[0].uri;
    if (photoUri) {
      setImage(photoUri);
    }
  };

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://localhost:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#105ccc", fontSize: 17, fontWeight: "600" }}>
            Register
          </Text>

          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register To your Account
          </Text>
        </View>

        <Image 
          source={image ? { uri: image } : defaultProfileImage} 
          style={styles.profileImage} 
        />


        <View style={{ marginTop: 20 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter Your Name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter Your Email"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Password"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Select a Photo</Text>
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.button}>
              <Text style={styles.buttonText}>Take a Photo</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#105ccc",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already Have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', 
    marginTop: 20,
  },
  button: {
    backgroundColor: '#105ccc',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5, 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    color: '#105ccc',
    fontSize: 17,
    fontWeight: '600',
  },
  subHeaderText: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
  },
  signInButtonText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});