import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';

const BookingListScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnYWJvbGFuZGlhMTU2QGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX3N0dWRlbnQiLCJleHAiOjE3MDA3NDk5MzQsImlhdCI6MTcwMDcxMzkzNH0.jRA0VNS18bxb0ze72Io_8QXbqWG68J5cQLq2yZa2DT8"; // Asegúrate de que tu token está actualizado
        const response = await fetch("https://deployteachcall-production.up.railway.app/bookings/student", {
          headers: {
            'Authorization': authToken
          }
        });
  
        // Verifica si la respuesta es ok antes de proceder
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Asegúrate de que la respuesta tiene contenido antes de analizarla
        const text = await response.text();
        if (!text) {
          throw new Error('No content returned from the API');
        }
  
        const data = JSON.parse(text);
        setBookings(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error('Error al obtener los bookings:', error);
      }
    };
  
    fetchBookings();
  }, [page]);
  

  const renderItem = ({ item }) => {
    // Accediendo directamente a las propiedades que esperamos según la respuesta de la API
    const title = item.title ?? 'Título no disponible';
    const dateTime = `${item.date} ${item.startTime}`; // Combinando fecha y hora
    const studentName = `${item.firstName} ${item.lastName}`;
    const link = item.link ?? 'Enlace no disponible';
  
    return (
      <Card>
        <Card.Title title={title} subtitle={`Hora: ${dateTime}`} />
        <Card.Content>
          <Text>{link}</Text>
          <Text>{`Estudiante: ${studentName}`}</Text>
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
    <View>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View>
        <Button disabled={page === 0} onPress={handlePreviousPage}>Anterior</Button>
        <Text>{`Página ${page + 1} de ${totalPages}`}</Text>
        <Button disabled={page === totalPages - 1} onPress={handleNextPage}>Siguiente</Button>
      </View>
    </View>
  );
};

export default BookingListScreen;
