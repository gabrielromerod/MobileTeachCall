import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Go to Onboarding" onPress={() => navigation.navigate('Onboarding')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});