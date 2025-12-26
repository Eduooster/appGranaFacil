import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PersonInformation() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.dismiss()} >
                  <Ionicons name="arrow-back" size={26} color="#fff" />
                  </Pressable>
      
      
      <View style={styles.header}>
        <Text style={styles.title}>Dados pessoais</Text>

        <Pressable onPress={() => console.log("Editar dados")}>
          <Ionicons name="pencil-outline" size={22} color="#444" />
        </Pressable>
      </View>

      
      <View style={styles.card}>
        <InfoItem label="Nome" value="Eduardo" />
        <Divider />
        <InfoItem label="Sobrenome" value="Bindo" />
        <Divider />
        <InfoItem label="E-mail" value="eduardo@email.com" />
        <InfoItem label="Data Cadasstro" value="20/04/2025" />
      </View>

      
      <View style={styles.securityCard}>
        <Pressable
          style={styles.securityRow}
          onPress={() => console.log("Alterar senha")}
        >
          <View>
            <Text style={styles.securityTitle}>Senha</Text>
            <Text style={styles.securitySubtitle}>
              Alterar sua senha de acesso
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
      </View>
    
    </View>
  );
}

/* Componentes auxiliares */

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

/* Styles */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:50,
    
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color:"white",
    marginTop:20
  },

  card: {
    backgroundColor: "#2b2a2aff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  infoItem: {
    paddingVertical: 8,
  },

  label: {
    fontSize: 12,
    color: "#d8d8d8ff",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#6b6a6aff",
  },

  divider: {
    height: 1,
    backgroundColor: "#1d1d1dff",
    marginVertical: 6,
  },

  securityCard: {
    backgroundColor: "#2b2a2aff",
    borderRadius: 12,
  },

  securityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  securityTitle: {
    fontSize: 16,
    fontWeight: "500",
    color:"#d8d8d8ff"
  },

  securitySubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});
