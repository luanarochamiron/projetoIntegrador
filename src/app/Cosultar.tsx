import { View, Button, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { usePessoasDataBase, PessoasDataBase } from '../database/usePessoasDataBase';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Atualizar(){
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const clienteDataBase = usePessoasDataBase();
  const rota = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.id) {
      setId(String(params.id));
      setNome(params.nome as string);
      setTelefone(params.telefone as string);
      setEndereco(params.endereco as string);
    }
  }, []);

  async function atualizar(){
    try {
      await clienteDataBase.atualizar({
        id: Number(id),
        nome,
        telefone,
        endereco
      });

      Alert.alert(
        "Sucesso!",
        "Cliente atualizado com sucesso.",
        [
          {
            text: "OK",
            onPress: () => rota.push("/Consultar"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function salvarAtualizacao(){
    try {
      if (id) await atualizar();
    } catch (error) {
      console.log(error);
    }

    setId("");
    setNome("");
    setTelefone("");
    setEndereco("");
  }

  return (
    <View style={styles.container}>
      <Texto>Atualizar</Texto>
      <Input placeholder="Nome" onChangeText={setNome} value={nome}/>
      <Input placeholder="Telefone" onChangeText={setTelefone} value={telefone}/>
      <Input placeholder="Endereço" onChangeText={setEndereco} value={endereco}/>
      <Button title="Atualizar" onPress={salvarAtualizacao} />
      <Button title="Voltar" onPress={() => rota.push('/Consultar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});