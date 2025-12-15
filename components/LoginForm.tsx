import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Alert,StyleSheet } from "react-native";


type LoginFormProps = {
  onLogin: (data: { email: string; password: string }) => Promise<boolean>;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

        const handleSubmit = async () => {
        const success = await onLogin({ email, password });
        if (!success) Alert.alert("Erro");
        else router.replace("/(protected)/(tabs)/home");
        };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.loginText}>Bem-Vindo de volta</Text>
      <Text style={styles.loginText2}>Faça login para continuar</Text>

      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text>Senha:</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />


      

      <TouchableOpacity style={[styles.button, styles.activeButton]}>
              <Text style={styles.buttonText}  onPress={() => onLogin({ email, password })}>Entrar</Text>
    </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
     loginText:{fontSize:20,marginBottom:10},
  loginText2:{marginBottom:20,color:"#706f6fff"},
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
   activeButton: {
    backgroundColor: "#020202ff",
  },
   buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  }

})