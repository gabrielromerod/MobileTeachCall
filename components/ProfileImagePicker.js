import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';

const ProfileImagePicker = ({ imageUri, onImagePicked }) => {
    const [image, setImage] = useState(null);
  
    const defaultProfileImage = require('../assets/test.png');

    useEffect(() => {
        if (imageUri) {
            setImage(imageUri);
        }
    }, [imageUri]);
    
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

    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : defaultProfileImage} style={styles.image} />
            <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
                <Icon
                    name='camera'
                    type='font-awesome'
                    color='#fff'
                    size={22}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        top: 30,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#fff',
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 8,
        elevation: 5,
        bottom: 5,
        marginRight: 120,
    },
});

export default ProfileImagePicker;
