// app/(auth)/index.tsx

import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity,StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "@/components/LoginForm";
import CadastroForm from "@/components/CadastroForm";

export default function LoginScreen() {
  const { signIn, authToken } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [showCadastro, setShowCadastro] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await signIn({ email, password });

    console.log(success)

    if (!success) {
      Alert.alert("Erro", "Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    setShowLogin(true);
  }, []);

  function handleOpenLogin() {
    setShowLogin(true);
    setShowCadastro(false);
  }

  function handleOpenCadastro() {
    setShowCadastro(true);
    setShowLogin(false);
  }

  function handleCadastro() {
    router.push("/");
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
            onPress={handleOpenLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showCadastro ? styles.activeButton : styles.inactiveButton]}
            onPress={handleOpenCadastro}
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
    paddingTop: 20,
  },
  textContainer: {
    width: "100%",
    backgroundColor: "#480E5B",
    paddingVertical: 27,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 4,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#020202ff",
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

