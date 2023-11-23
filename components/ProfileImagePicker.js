import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileImagePicker = ({ onImagePicked }) => {
    const [image, setImage] = useState(null);
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
        onImagePicked(pickedImageUri);
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
        onImagePicked(photoUri);
      }
    };

    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : defaultProfileImage} style={styles.image} />
            <Pressable onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Select a Photo</Text>
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.button}>
                <Text style={styles.buttonText}>Take a Photo</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Un color de fondo claro para un diseño minimalista
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75, // Hacer la imagen redonda
        marginBottom: 20,
        borderColor: '#ddd', // Bordes sutiles para la imagen
        borderWidth: 2,
    },
    button: {
        backgroundColor: '#007bff', // Un color sólido para los botones
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        shadowColor: '#000', // Sombra sutil para dar profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        color: 'white', // Texto blanco para contrastar con el fondo del botón
        fontSize: 16,
    }
});


export default ProfileImagePicker;
