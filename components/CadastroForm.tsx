import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function CadastroForm({ onCadastro }: { onCadastro: () => void }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

 

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCadastro = async () => {
    
    const nomeLimpo = nome.trim();
    const sobrenomeLimpo = sobrenome.trim();
    const emailLimpo = email.trim();
    
  if (!nomeLimpo || !sobrenomeLimpo || !emailLimpo || !senha || !confirmarSenha) {
    console.log("ENTROU NO IF DE CAMPO VAZIO1");
    Alert.alert("Erro", "Todos os campos devem ser preenchidos");//tirar esses alerts
    return; 
  }

  
  if (!validarEmail(emailLimpo)) {
    console.log("ENTROU NO IF DE CAMPO VAZIO2");
    Alert.alert("Erro", "Email inválido");
    return; 
  }

  
  if (senha !== confirmarSenha) {
    console.log("ENTROU NO IF DE CAMPO VAZIO222");
    Alert.alert("Erro", "As senhas não coincidem");
    return;
  }

    try {
  console.log("Antes do fetch");
  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, sobrenome, email, senha }),
  });
  console.log("Depois do fetchs");
  console.log(response.body)

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    alert("Erro: " + (data.message || "Erro no cadastro"));
    return;
  }

  alert("Cadastro realizado com sucesso!");
  onCadastro();
} catch (error) {
  alert("Falha na conexão: " + error);
}
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Cadastro</Text>

      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="SobreNome" style={styles.input} value={sobrenome} onChangeText={setSobrenome} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />
      <TextInput placeholder="ConfirmarSenha" secureTextEntry style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <View style={styles.containerInfos}>
        <Text style={styles.titleInfos}>Cadastre-se e descubra</Text>
        <Text style={styles.subInfos}>Onde seu dinheiro vai</Text>
        <Text style={styles.subInfos}>Como reduzir gastos automáticos</Text>
        <Text style={styles.subInfos}>Quando você atingirá suas metas</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.activeButton]} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Criar Contaaa</Text>
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
