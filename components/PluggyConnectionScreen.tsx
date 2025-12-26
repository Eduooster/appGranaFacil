import React, { useState } from "react";
import { View, Button, StyleSheet, Modal, SafeAreaView, Pressable,Text } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useAuth } from "@/context/AuthContext";
import { enviarItemPluggy, iniciarPluggy } from "@/services/pluggyService";
import { gerarHtmlPluggy } from "@/constants/pluggyHtml";
import { Ionicons } from "@expo/vector-icons";


export default function PluggyConnectScreen() {
  const [visible, setVisible] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { authToken } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleIniciarPluggy() {
    if (!authToken) return;
    const token = await iniciarPluggy(authToken);
    if (token) {
      setAccessToken(token);
      setVisible(true);
    }
  }

  async function handleMessage(event: WebViewMessageEvent) {
      let message;

      try {
        message = JSON.parse(event.nativeEvent.data);
      } catch {
        return;
      }

      const item =
        message.payload?.item ||
        message.payload?.data?.item;

    
    

      

      if (message.type === "SUCCESS" && item && authToken) {
        await enviarItemPluggy(authToken, item);
        setIsSuccess(true);
        return;
      }

      if (message.type === "ERROR") {
        setVisible(false);
        setIsSuccess(false);
        return;
      }

      if (message.type === "CLOSE") {
        setVisible(false);
        return;
      }

     


  
  

  return (
    <View style={styles.container}>
          <Pressable style={styles.buttonCustom} onPress={handleIniciarPluggy}>
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={{marginRight: 8}} />
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Conectar nova conta</Text>
      </Pressable>
        <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#020202" }}>
        
        {isSuccess ? (
          
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4e09a8" />
            <Text style={styles.successTitle}>Conexão realizada!</Text>
            <Text style={styles.successText}>
              Sua conta foi vinculada com sucesso. Agora estamos importando seus dados.
            </Text>
            
            <Pressable 
              style={styles.buttonOk} 
              onPress={() => {
                setVisible(false);
                setIsSuccess(false);
                
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Entendido</Text>
            </Pressable>
          </View>
        ) : (
          // --- WEBVIEW (O que já existia) ---
          accessToken && (
            <WebView
              originWhitelist={["*"]}
              javaScriptEnabled
              domStorageEnabled
              style={{ flex: 1 }}
              source={{ html: gerarHtmlPluggy(accessToken), baseUrl: "https://pluggy.ai" }}
              onMessage={handleMessage}
            />
          )
        )}
        
      </SafeAreaView>
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create({
  
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#020202",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  successText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  buttonOk: {
    marginTop: 30,
    backgroundColor: "#4e09a8",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonCustom: {
  backgroundColor: "#4e09a8",
  flexDirection: 'row',
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},
container: {
    
    width: '100%', 
    marginVertical: 55, 
    paddingHorizontal: 16,
  }
})}