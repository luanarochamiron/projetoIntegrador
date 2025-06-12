import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { usePessoasDataBase } from '../database/usePessoasDataBase'; // ajuste o caminho se precisar

export default function Login() {
  const rota = useRouter();
  const pessoasDataBase = usePessoasDataBase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
    }

    try {
      setLoading(true);

      // Busca usuário pelo email na base local
      const usuario = await pessoasDataBase.findByEmail(email);

      if (!usuario) {
        Alert.alert('Erro', 'Usuário não encontrado');
        setLoading(false);
        return;
      }

      if (usuario.senha !== password) {
        Alert.alert('Erro', 'Senha incorreta');
        setLoading(false);
        return;
      }

      setLoading(false);
      Alert.alert('Sucesso', 'Logado com sucesso!');
      rota.push('/menu');

    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Erro', 'Falha ao tentar logar');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder='Informe seu email institucional'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder='Digite sua senha'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={getLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Acessar</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => rota.push('/cadastrar')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => rota.push('/Index')}>
        <Text style={styles.link}>Voltar</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0CFFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: 'blue',
    marginBottom: 12,
    textAlign: 'center',
  },
});
