import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    // Llamar a la función onSearch con el término de búsqueda
    // Esta función puede ser proporcionada por el componente padre para manejar la navegación
    onSearch(search);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="¿Qué quieres aprender hoy?"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    height: 40,
    borderRadius: 5,
  },
});
