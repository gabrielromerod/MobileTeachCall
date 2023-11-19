import { View, Text, StyleSheet, Button, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Home');
    }

    const doneButton = ({...props}) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Listo</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
        <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            DoneButtonComponent={doneButton}
            containerStyles={{  paddingHorizontal: 20 }}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            <LottieView source={require('../assets/animations/education.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Aprende y Enseña',
                    subtitle: 'Descubre TeachCall un mundo de conocimiento donde cada interacción es una oportunidad de crecimiento.',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            <LottieView source={require('../assets/animations/posts.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Interactúa con otros',
                    subtitle: 'Comparte tus conocimientos y aprende de los demás',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            <LottieView source={require('../assets/animations/review.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Da Voz a Tu Experiencia',
                    subtitle: ' Comparte tus impresiones para construir juntos una experiencia de aprendizaje excepcional.',
                },
            ]}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lottie: {
        width: width*0.9,
        height: height*0.5,
    },
    doneButton: {
        padding: 20,
    }
});