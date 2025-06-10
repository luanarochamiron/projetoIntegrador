import { useRouter } from 'expo-router';
import React, {useState} from 'react';
import {View,Text,Button, StyleSheet, TextInput, TouchableOpacity,Alert, } from 'react-native';
import { usePessoasDataBase, PessoasDataBase } from '../database/usePessoasDataBase';

export default function Cadastrar(){
    const rota = useRouter()
    const [pessoas, setPessoas] = useState<PessoasDataBase[]>()
    const pessoasDataBase = usePessoasDataBase()
    const [cpf, setCpf] = useState("")
    const [nome, setNome] = useState("")
    const [nomeSocial, setNomeSocial] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function create(){
        try{
            const response = await pessoasDataBase.create({
                cpf,
                nome,
                nomeSocial,
                dataNascimento,
                email,
                senha
            })

            Alert.alert("Usuario cadastrao no sistema")
        }catch(error){
            console.log(error)
        }
        setCpf("");
        setNome("");
        setNomeSocial("");
        setDataNascimento("");
        setEmail("");
        setSenha("");
    }

    return(
        <View>
            <TextInput placeholder='CPF'/>
            <TextInput placeholder='Nome'/>
            <TextInput placeholder='Nome Social'/>
            <TextInput placeholder='Data de nascimento'/>
            <TextInput placeholder='Email'/>
            <TextInput placeholder='Senha'/>
            <Button title="Cadastrar" onPress={create}/>
            <Button onPress={() => rota.push('/')}><Text>Voltar</Text></Button>

        </View>
    );
}