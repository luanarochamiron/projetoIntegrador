import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";

import { Platform, View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { usePessoasDataBase, PessoasDataBase } from '../database/usePessoasDataBase';

export default function Cadastrar() {
  const rota = useRouter();
  const pessoasDataBase = usePessoasDataBase();

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  function onChangeDate(event: any, selectedDate?: Date) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formato = selectedDate.toISOString().split("T")[0];
      setDataNascimento(formato);
    }
  }

  async function create() {
    try {
      await pessoasDataBase.create({
        cpf,
        nome,
        nomeSocial,
        dataNascimento,
        email,
        senha
      });

      Alert.alert("Usuário cadastrado no sistema");

      // Limpar os campos após cadastro
      setCpf("");
      setNome("");
      setNomeSocial("");
      setDataNascimento("");
      setEmail("");
      setSenha("");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome Social"
        value={nomeSocial}
        onChangeText={setNomeSocial}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={{ fontSize: 16, color: dataNascimento ? "#000" : "#888" }}>
          {dataNascimento || "Selecione a data de nascimento"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataNascimento ? new Date(dataNascimento) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()} // não deixa escolher data futura
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={create} />
      <TouchableOpacity onPress={() => rota.push('/Index')} style={styles.backButton}>
        <Text style={{ color: 'blue', marginTop: 15 }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  datePicker: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginBottom: 12,
  },
  backButton: {
    alignItems: 'center',
  },
});
