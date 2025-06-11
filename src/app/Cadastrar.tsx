import { useRouter } from 'expo-router';
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, View,Text,Button, StyleSheet, TextInput, TouchableOpacity,Alert, } from 'react-native';
import { usePessoasDataBase, PessoasDataBase } from '../database/usePessoasDataBase';

export default function Cadastrar(){
    const rota = useRouter()
    const [pessoas, setPessoas] = useState<PessoasDataBase[]>()
    const pessoasDataBase = usePessoasDataBase()
    const [id, setId] = useState("");
    const [cpf, setCpf] = useState("")
    const [nome, setNome] = useState("")
    const [nomeSocial, setNomeSocial] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false);


    function onChangeDate(event: any, selectedDate: Date) {
        setShowDatePicker(Platform.OS === "ios"); 
        if (selectedDate) {
          const formato = selectedDate.toISOString().split("T")[0];
          setDataNascimento(formato);
        }
    }

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

            Alert.alert("Usuario cadastrado no sistema")
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
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={{ fontSize: 16, color: "#000000" }}>{dataNascimento || "Selecione a data de nascimento"}</Text>
            </TouchableOpacity>
            <TextInput placeholder='Email'/>
            {showDatePicker && (
                <DateTimePicker
                value={dataNascimento ? new Date(dataNascimento) : new Date()}
                mode="date"
                display="default"onChange={onChangeDate}/>
            )}

            <TextInput placeholder='Senha'/>
            <Button title="Cadastrar" onPress={create}/>
            <TouchableOpacity onPress={() => rota.push('/Index')}><Text>Voltar</Text></TouchableOpacity>

        </View>
    );
}