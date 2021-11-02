import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import wateringImg from '../assets/watering.png';
import fonts from '../styles/fonts';

import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Welcome(){
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function checkName(){

            const name = await AsyncStorage.getItem('@platmenager:user');
    
            if(!name)
                setLoading(false);
            else
                navigation.navigate('MyPlants');

        }

        checkName();

    }, []);

    if(loading)
        return <Load />

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.wrappler}>

                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'} 
                    forma fácil {'\n'}
                </Text>

                <Image 
                    source={wateringImg}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('UserIdentification')}
                >
                    <Feather 
                        name="chevron-right" 
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrappler:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 34,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    image:{
        width: Dimensions.get('window').width * 0.7,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
        width: 56
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    }
})