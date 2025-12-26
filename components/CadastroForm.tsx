import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onCadastro: (data: {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
  }) => Promise<void>;
};

export default function CadastroForm({ onCadastro }: Props) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function handleCadastro() {
    const nomeLimpo = nome.trim();
    const sobrenomeLimpo = sobrenome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo || !sobrenomeLimpo || !emailLimpo || !senha || !confirmarSenha) {
      return;
    }

    if (!validarEmail(emailLimpo)) {
      return;
    }

    if (senha !== confirmarSenha) {
      return;
    }

    await onCadastro({
      nome: nomeLimpo,
      sobrenome: sobrenomeLimpo,
      email: emailLimpo,
      senha: senha,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Cadastro</Text>

      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Sobrenome" style={styles.input} value={sobrenome} onChangeText={setSobrenome} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />
      <TextInput
        placeholder="Confirmar senha"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={[styles.button, styles.activeButton]} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#3a3939ff",
    borderRadius: 20,
  },
  formTitle: { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  activeButton: { backgroundColor: "#020202ff" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
