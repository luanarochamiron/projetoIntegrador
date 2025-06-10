import React, {useState} from 'react';
import { useNavigation } from "expo-router";
import {View,Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';

export default function Index(){
    const navigation = useNavigation();
    return(
        <View>
            <Text>Bem- vindo </Text>

            <TouchableOpacity onPress={() => navigation.navigate('login')}><Text>Acessar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}><Text>Não tem uma conta? Cadastre-se </Text></TouchableOpacity>

        </View>
    )
}