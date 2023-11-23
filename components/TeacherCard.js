import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TeacherCard = ({ id, firstName, lastName, description, rating, reviewCount, pricePerHour }) => {
  const [showWeek, setShowWeek] = useState(false);

  const handleShowWeek = () => {
    setShowWeek(!showWeek);
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://picsum.photos/80' }}
          style={styles.profilePic}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.rating}>{rating.toFixed(1)} ({reviewCount})</Text>
        <Text style={styles.price}>S/. {pricePerHour}</Text>
        <TouchableOpacity style={styles.button} onPress={handleShowWeek}>
          <Text style={styles.buttonText}>Ver disponibilidad</Text>
        </TouchableOpacity>
      </View>
      {showWeek && <Week teacherId={id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'grey',
  },
  details: {
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    color: '#F0AA07',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default TeacherCard;
