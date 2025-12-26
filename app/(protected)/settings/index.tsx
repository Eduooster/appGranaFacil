import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function ConfiguracoesScreen() {
  const router = useRouter();

  
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} >
            <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>
      <Text style={styles.title}>Configurações</Text>

      <ConfigItem
        icon="options-outline"
        title="Preferências"
        description="Personalização · Aparência · Home"
        onPress={() => router.push("/configuracoes/preferencias")}
      />

      <Divider />

      <ConfigItem
        icon="notifications-outline"
        title="Notificações"
        description="Alertas · Sons · Avisos"
        onPress={() => router.push("/configuracoes/notificacoes")}
      />

      <Divider />

      <ConfigItem
        icon="lock-closed-outline"
        title="Segurança"
        description="Senha · Autenticação · Sessões"
        onPress={() => router.push("/configuracoes/seguranca")}
      />

      <Divider />

      <ConfigItem
        icon="sync-outline"
        title="Sincronização"
        description="Backup · Dados · Conta"
        onPress={() => router.push("/configuracoes/sincronizacao")}
      />
    </View>
  );
}

/* ITEM DE CONFIGURAÇÃO */
function ConfigItem({
  icon,
  title,
  description,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.6 },
      ]}
    >
      <Ionicons name={icon} size={22} color="#555" />

      <View style={styles.textArea}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />
    </Pressable>
  );
}

/* DIVISOR SUAVE */
function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  width: "100%",
  padding: 20,
  paddingTop: 50,
  
  
},
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 24,
    marginTop:23,
    color:"white"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    
  },
  textArea: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color:"white"
  },
  itemDesc: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 36, // alinha com o texto, não com o ícone
  },
});

