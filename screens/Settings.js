import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ProfileImagePicker from '../components/ProfileImagePicker';
//import { getUserData, updateProfileImage } from '../api/userApi';
//import { saveUserData, getUserDataLocal } from '../storage/localStorage';

export default function SettingsScreen() {
  const [userData, setUserData] = useState({ name: '', imageUri: null });

  const handleImageChange = (newImageUri) => {
    setUserData({ ...userData, imageUri: newImageUri });
    updateProfileImage(newImageUri); // Actualizar la imagen en la API
    saveUserData({ ...userData, imageUri: newImageUri }); // Actualizar datos localmente
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{userData.name}</Text>
      <ProfileImagePicker imageUri={userData.imageUri} onImagePicked={handleImageChange} />
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para el contenedor, texto y botón
});
