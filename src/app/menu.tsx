import React, {useState} from 'react';
import { useRouter } from 'expo-router';
import {View,Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';


export default function Menu(){
    const rota = useRouter()
    return(
        <View>
            <Text>Bem- vindo </Text>

            <TouchableOpacity onPress={() => rota.push('/pomodoro')}><Text>Pomodoro</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => rota.push('/consultar')}><Text>Consultar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => rota.push('/Index')}><Text>Voltar</Text></TouchableOpacity>

        </View>
    )

}