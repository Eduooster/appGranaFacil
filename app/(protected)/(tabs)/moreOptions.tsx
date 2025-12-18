import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function moreOptions(){
    return(
    <View style={styles.container}>
      
      <Text style={styles.title}>Mais opções</Text>

        <ConfigItem
       
        title="Gerenciar OpenFinance"
        description="Gerencie openfinacne"
        onPress={() => router.push("/configuracoes/preferencias")}
      />

      

      <Divider />
      <ConfigItem
       
        title="Cartões"
        description="Veja seus cartões"
        onPress={() => router.push("/configuracoes/preferencias")}
      />
       <Divider />
      <ConfigItem
       
        title="Importar CSV"
        description="Importar planilha"
        onPress={() => router.push("/configuracoes/preferencias")}
      />
       <Divider />

       <ConfigItem
       
        title="Exportar dados"
        description="Exporte seus dados"
        onPress={() => router.push("/configuracoes/preferencias")}
      />
      <Divider />
      <ConfigItem
       
        title="Ver minhas metas"
        description="Veja suas metas"
        onPress={() => router.push("/configuracoes/preferencias")}
      />
      <Divider />
    


      
    </View>
  );
}

function ConfigItem({
  
  title,
  description,
  onPress,
}: {
  
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
    padding: 20,
    paddingTop:50,
    backgroundColor:"#000000e7"
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
    marginBottom:20
    
  },
});

