import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Alert} from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useFocusEffect, useNavigation } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import WaterDrop from '../assets/waterdrop.png'

import { loadPlant, PlantProps, removePlant } from '../libs/storage';

import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import { Header } from '../components/Header';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>('Cadastre uma nova planta para ver aqui suas próximas regadas.');

    const navigation = useNavigation();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'sim 😢',
                onPress: async () => {
                    try{

                        removePlant(plant.id);

                        setMyPlants((oldData) => oldData.filter((item) => item.id !== plant.id));

                        if(myPlants.length < 1)
                            setNextWatered('Cadastre uma nova planta para ver aqui suas próximas regadas.');

                    } catch (error) {
                        
                        Alert.alert('Não foi possível remover! 😢');

                    }
                },
                style: 'cancel'
            }
        ])
    }

    useFocusEffect(
        React.useCallback(() => {

            async function loadStorageData(){
                const plantsStoraged = await loadPlant();
                
                if(plantsStoraged.length > 0){
    
                    const nextTime = formatDistance(
                        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                        new Date().getTime(),
                        { locale: pt }
                    )
        
                    setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}.`);
        
                    setMyPlants(plantsStoraged);
    
                }else{
        
                    setNextWatered('Cadastre uma nova planta para ver aqui suas próximas regadas.');
        
                    setMyPlants([]);
    
                }
    
                setLoading(false);
            }
    
            loadStorageData();

        }, [navigation])
    )

    if(loading)
        return <Load />

    return(
        <View style={styles.container}>
            <Header/>

            <View style={styles.content}>
                <View style={styles.spotlight}>
                    <Image
                        source={WaterDrop}
                        style={styles.spotlightImage}
                    />
                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View>

                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>
                        Próximas regadas
                    </Text>

                    <FlatList
                        data={myPlants}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <PlantCardSecondary
                                data={item}
                                handleRemove={() => {handleRemove(item)}}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        width: '100%'
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        marginHorizontal: 20,
        flex: 1,
        color: colors.blue
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})