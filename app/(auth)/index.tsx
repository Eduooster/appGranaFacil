// app/(auth)/index.tsx

import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useAuth } from "../../context/AuthContext";
import LoginForm from "@/components/LoginForm";
import CadastroForm from "@/components/CadastroForm";
import cadastrarUsuario from "@/services/authService";


type CadastroData = {
  nome: string;
  sobrenome: string;
  email:string;
  senha:string;
};

export default function LoginScreen() {
  const { signIn, authToken } = useAuth();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(true);
  const [showCadastro, setShowCadastro] = useState(false);

  const [pluggyOptIn, setPluggyOptIn] = useState<boolean | undefined>(undefined);

   function responderPluggy(optIn: boolean) {
    setPluggyOptIn(optIn);
    console.log("Usuário respondeu:", optIn ? "Aceitou conectar" : "Não quis conectar");
  }

  async function handleCadastro(data: CadastroData) {
    const ok = await cadastrarUsuario(data);

    if (!ok) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Cadastro realizado",
      text2: "Faça login para continuar",
    });

    setShowCadastro(false);
    setShowLogin(true);
  }

  useEffect(() => {
    if (authToken) {
      router.replace("/home");
    }
  }, [authToken]);

  return (
    <>
      <SafeAreaView style={styles.textContainer}>
        <Text style={styles.title}>GranaFácil</Text>
        <Text style={styles.subtitle}>Comece gerenciando seu dinheiro</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, showLogin ? styles.activeButton : styles.inactiveButton]}
            onPress={() => {
              setShowLogin(true);
              setShowCadastro(false);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showCadastro ? styles.activeButton : styles.inactiveButton]}
            onPress={() => {
              setShowCadastro(true);
              setShowLogin(false);
            }}
          >
            <Text style={styles.buttonText}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {showLogin && <LoginForm onLogin={signIn} />}
        {showCadastro && <CadastroForm onCadastro={handleCadastro} />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 27,
    backgroundColor: "#202020ff",
  },
  textContainer: {
    width: "100%",
    backgroundColor: "#480E5B",
    paddingVertical: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    gap: 4,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#1b1b1bff",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
