import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

type LoginFormProps = {
  onLogin: (data: { email: string; password: string }) => Promise<boolean>;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  

    

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const success = await onLogin({ email, password });
    if (success) {
      router.replace("/(protected)/(tabs)/home");
    } else {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
    }
  };

  return (

    <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
      enableOnAndroid
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
        
      }}
    >
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.formWrapper,
         ,
        ]}
      >
       
          <>
            <Text style={styles.loginText}>Bem-Vindo de volta</Text>
            <Text style={styles.loginText2}>Faça login para continuar</Text>
          </>
        

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical:50
    ,backgroundColor:"#3a3939ff",borderRadius:20
  },
  formWrapper: {
    width: "100%",
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color:"white"
  },
  loginText2: {
    fontSize: 16,
    marginBottom: 30,
    color: "#706f6f",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
    color:"white"
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#020202",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

