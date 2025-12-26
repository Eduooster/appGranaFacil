import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { useState } from "react";
import PluggyConnectScreen from "@/components/PluggyConnectionScreen";
import { router } from "expo-router";
import { Ionicons,Feather } from "@expo/vector-icons";



export default function PluggyConextionInfo() {
  const [loading, setLoading] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  const infos = [
    "Conecte sua conta de forma segura e rápida",
    "Visualize suas transações em tempo real",
    "Integração com múltiplas instituições financeiras",
    "Não compartilhamos suas senhas com terceiros"
  ];
  return (
    <View style={styles.container}>
      <Pressable style={{marginVertical:30}}  onPress={() => router.back()} >
            <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>
      <View style={styles.imageContainer}>
      <Image source={require("@/assets/images/image-removebg-preview (1).png")} style={styles.image} />
                  </View>
                  
      <Text style={styles.description}>
        Conectar sua conta com a Pluggy é rápido, seguro e permite acompanhar suas finanças de forma centralizada.
      </Text>
      <View style={styles.container}>
      {infos.map((info, index) => (
        <View key={index} style={styles.row}>
          <Feather name="check-circle" size={24} color="#22c55e" />
          <Text style={styles.text}>{info}</Text>
        </View>
      ))}
    </View>
      <PluggyConnectScreen/>
      

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    
   
  },
  image: {
    width:250,height:250
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    gap: 12,
  },
   row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9
  },
  text: {
    fontSize: 16,
    color: "#fffefeff",
    marginLeft: 8
  }
});
