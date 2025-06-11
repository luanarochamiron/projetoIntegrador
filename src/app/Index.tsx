import React, {useState} from 'react';
import { useRouter } from 'expo-router';
import {View,Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';

export default function Index(){
    const rota = useRouter()
    return(
        <View>
            <Text>Bem- vindo </Text>

            <TouchableOpacity onPress={() => rota.push('/login')}><Text>Acessar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => rota.push('/cadastrar')}><Text>Não tem uma conta? Cadastre-se </Text></TouchableOpacity>

        </View>
    )
}