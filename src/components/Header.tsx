import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/user.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
    const [name, setName] = useState<string>();

    useEffect(() => {

        async function getName(){
            
            let userName = await AsyncStorage.getItem('@platmenager:user');

            setName(userName || '');

        }

        getName();

    }, [name])

    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.greeting}>Olá, </Text>
                <Text style={styles.userName}>{name}</Text>
            </View>

            <Image 
                source={userImg}
                style={styles.image}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
})