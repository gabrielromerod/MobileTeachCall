import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import { Card, Button } from 'react-native-paper';

const BookingListScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const fetchBookings = async () => {
    setIsLoading(true);
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnYWJvbGFuZGlhMTU2QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX3N0dWRlbnQiLCJleHAiOjE3MDA3NjY0NjMsImlhdCI6MTcwMDczMDQ2M30.U0ub4ev2t2yNVzAU9ghnTsi1woSqwsA03POPFcfRGm4";
    const endpoint = `http://192.168.3.7:8080/bookings/student?page=${page}`;

    try {
      const response = await fetch(endpoint, {
        headers: { 'Authorization': authToken }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookings(prevBookings => (page === 0 ? data.content : [...prevBookings, ...data.content]));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error al obtener los bookings:', error);
    }
    setIsLoading(false);
  };

  const addOneHour = (startTime) => {
    const [hours, minutes, seconds] = startTime.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
    date.setHours(date.getHours() + 1);
    return date.toTimeString().split(' ')[0];
  };

  const renderItem = ({ item }) => {
    const { link, timeSlot, course, professor, student } = item;
    const dateTime = timeSlot ? `${timeSlot.date}` : 'No disponible';
    const startTime = timeSlot ? `${timeSlot.startTime}` : 'No disponible';
    const endTime = timeSlot ? addOneHour(timeSlot.startTime) : 'No disponible';
    const name = professor ? `${professor.firstName} ${professor.lastName}` : `${student.firstName} ${student.lastName}`;
    const role = professor ? 'Profesor' : 'Estudiante';

    return (
      <Card style={styles.card}>
        <Card.Title title={course.title} subtitle={`Fecha: ${dateTime}`} />
        <Card.Content>
          <Text style={styles.text}>{`Hora: ${startTime} - ${endTime}`}</Text>
          <Text style={styles.text}>{`${role}: ${name}`}</Text>
          <Button 
            icon="link" 
            mode="contained" 
            style={styles.button}
            onPress={() => Linking.openURL(link)}>
            Unirse a la clase
          </Button>
        </Card.Content>
      </Card>
    );
  };

  const loadMore = () => {
    if (page < totalPages - 1 && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index} // Modificado para garantizar claves únicas
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 50,
    backgroundColor: '#f0f0f0'
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageText: {
    fontSize: 16,
  }
});

export default BookingListScreen;
