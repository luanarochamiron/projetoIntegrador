import React, {useState} from 'react';
import { useNavigation } from "expo-router";
import {View,Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    
    async function getLogin(){
        try{
            setLoading(true)
            if(!email || !password){
                return Alert.alert('Atenção', 'Informe os campos obrigatório!')
            }

            setTimeout(()=>{
                Alert.alert('Logado com sucesso!')
            },3000)

        } catch(error) {
            console.log(error)
        }
    }

    return(
        <View>
            <Text>Bem- vindo </Text>

            <Text>Email</Text>
            <TextInput placeholder='Informe seu email institucional'value={email} onChangeText={(e)=> setEmail(e)} />

            <Text>Senha</Text>
            <TextInput placeholder='Digite sua senha' value={password} onChangeText={(e)=> setPassword(e)}/>

            <TouchableOpacity onPress={()=>getLogin()}><Text>Acessar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}><Text>Não tem uma conta? Cadastre-se </Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}><Text>Voltar</Text></TouchableOpacity>

        </View>
    )
}