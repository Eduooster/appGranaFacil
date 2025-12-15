import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CadastroForm({ onCadastro }: { onCadastro: () => void }) {
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Cadastro</Text>

      <TextInput placeholder="Nome" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />

      <View style={styles.containerInfos}>
        <Text style={styles.titleInfos}>Cadastre-se e descubra</Text>
        <Text style={styles.subInfos}>Onde seu dinheiro vai</Text>
        <Text style={styles.subInfos}>Como reduzir gastos automáticos</Text>
        <Text style={styles.subInfos}>Quando você atingirá suas metas</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.activeButton]} onPress={onCadastro}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: "100%", marginTop: 20 },
  formTitle: { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  containerInfos: { backgroundColor:"#320c5e86",borderRadius:20,paddingHorizontal:27,paddingVertical:10,marginBottom:20 },
  titleInfos: { marginBottom:10,fontWeight:"bold" },
  subInfos: { marginLeft:5,marginBottom:4,fontWeight:"bold" },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  activeButton: { backgroundColor: "#020202ff" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
