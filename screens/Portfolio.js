import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import { Button, Card } from 'react-native-paper';

const BookingListScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnYWJvbGFuZGlhMTU2QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX3N0dWRlbnQiLCJleHAiOjE3MDA3NjY0NjMsImlhdCI6MTcwMDczMDQ2M30.U0ub4ev2t2yNVzAU9ghnTsi1woSqwsA03POPFcfRGm4"; // Asegúrate de que tu token está actualizado
      const endpoint = "http://192.168.3.7:8080/bookings/student"; // Endpoint para estudiantes

      try {
        const response = await fetch(endpoint, {
          headers: { 'Authorization': authToken }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error('Error al obtener los bookings:', error);
      }
    };

    fetchBookings();
  }, [page]);

  const renderItem = ({ item }) => {
    const { link, timeSlot, course, professor } = item;
    const dateTime = timeSlot ? `${timeSlot.date} ${timeSlot.startTime}` : 'No disponible';
    const professorName = `${professor.firstName} ${professor.lastName}`;

    return (
      <Card style={styles.card}>
        <Card.Title title={course.title} subtitle={`Hora: ${dateTime}`} />
        <Card.Content>
          <Text style={styles.text}>{`Profesor: ${professorName}`}</Text>
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

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.pagination}>
        <Button mode="outlined" disabled={page === 0} onPress={handlePreviousPage}>Anterior</Button>
        <Text style={styles.pageText}>{`Página ${page + 1} de ${totalPages}`}</Text>
        <Button mode="outlined" disabled={page === totalPages - 1} onPress={handleNextPage}>Siguiente</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
