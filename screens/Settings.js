import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Pressable, StyleSheet } from 'react-native';
import ProfileImagePicker from '../components/ProfileImagePicker';
//import { getUserData, updateProfileImage } from '../api/userApi';
//import { saveUserData, getUserDataLocal } from '../storage/localStorage';

export default function SettingsScreen() {
  const [userData, setUserData] = useState({ name: 'TEXT', imageUri: null });

  const handleImageChange = (newImageUri) => {
    setUserData({ ...userData, imageUri: newImageUri });
    updateProfileImage(newImageUri); // Actualizar la imagen en la API
    saveUserData({ ...userData, imageUri: newImageUri }); // Actualizar datos localmente
  };


  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', 'Has cerrado sesión correctamente');
    // Redirigir a la pantalla de login
  };

  return (
    <View style={styles.container}>
      <ProfileImagePicker imageUri={userData.imageUri} onImagePicked={handleImageChange} />
      <Text style={styles.name}>{userData.name}</Text>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
