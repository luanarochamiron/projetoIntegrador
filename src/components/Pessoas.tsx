import { View, Pressable, PressableProps, Text, ScrollView, StyleSheet } from "react-native";

type Props = PressableProps & {
  data: {
    id: string;
    cpf: string;
    nome: string;
    nomeSocial: string;
    dataNascimento: string;
    email: string;
    senha: string;
  };
};

export function Pessoas({ data, ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.container}>
      <ScrollView horizontal>
        <Text style={styles.text}>
          {data.id} - {data.cpf} - {data.nome} - {data.nomeSocial} - {data.dataNascimento} - {data.email} - {data.senha}
        </Text>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#EEE",
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
  },
});
