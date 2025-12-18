import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function PerfilScreen() {

   const { signOut, loading } = useAuth();

  function handleSignOut() {
    signOut()
    
  }

  return (
    <View style={styles.container}>
        <View style={styles.iconesContainer}>
           <Pressable onPress={() => router.replace("/")} >
            <Ionicons name="arrow-back" size={26} color="#fff" />
            </Pressable>
    
            <Pressable
              onPress={() => router.push("/settings")}
              
            >
              <Ionicons name="settings-outline" size={26} color="#fff" />
            </Pressable>

      </View>
        

      {/* PERFIL CENTRAL */}
      <View style={styles.profileCenter}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Eduardo Bindo</Text>
        <Text style={styles.plan}>Meu plano: Free</Text>
      </View>

       
      <View style={styles.actions}>
        
        <ProfileItem
          label="Meus dados pessoais"
          onPress={() => router.push("/perfil/dados")}
        />

         
        
        <ProfileItem
          label="Ver planos"
          onPress={() => router.push("/planos")}
        />
       

        <ProfileItem
          label="Sair"
          danger
          onPress={handleSignOut}
        />
        
      </View>
    </View>
  );
}

function ProfileItem({
  label,
  onPress,
  danger = false,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.6 },
      ]}
    >
      <Text style={[styles.itemText, danger && styles.dangerText]}>
        {label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={danger ? "#e53935" : "#999"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#000000e7",paddingTop:50
  },
  configBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  profileCenter: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color:"#fff"
  },
  plan: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  actions: {
    gap: 12,
  },
  item: {
    backgroundColor: "#22233665",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color:"white"
  },
  dangerText: {
    color: "#e53935",
    fontWeight: "500",
  },
  iconesContainer:{
    
    flexDirection: "row",
    justifyContent: "space-around",
    gap:250
  }
});
