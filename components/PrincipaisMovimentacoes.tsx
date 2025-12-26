import { Movimentacao } from "@/app/(protected)/(tabs)/home";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

interface Props {
  items: Movimentacao[];
  loading: boolean;
  isMesAtual: boolean;
}

export default function MovimentacoesRecentes({
   items, loading, isMesAtual }: Props) {
  if (loading) {
    return <View style={styles.skeleton} />;
  }

  if (items.length === 0) {
    return <View style={styles.emptyText}>
      <Text style={{color:"white"}}>Nenhuma movimentação neste mês</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isMesAtual ? "Movimentações recentes" : "Principais movimentações"}
      </Text>

      {items.map((item, index) => (
        <Pressable key={index} style={({ pressed }) => [ pressed && styles.pressed]}>
          <View key={index} style={styles.item}>
            <Image source={require("@/assets/images/image-removebg-preview (1).png")} style={styles.itemImage} />
            
            <View style={styles.itemLeft}>
              
              <Text style={styles.itemTipo}>{item.tipo}</Text>
              <Text style={styles.itemDesc}>{item.descricao}</Text>
            </View>

            <View style={styles.itemRight}>
              <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
              <Text style={styles.itemData}>{item.data}</Text>
            </View>

            <Ionicons
            name="chevron-forward"   
            size={24}                 
            color="white"             
          />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    alignSelf: "center",
    width: "90%",
    height: 600,
    backgroundColor: "#252525ff",
    borderRadius: 20,
    marginVertical: 30,
  },
  emptyText: {
      color: "#fdfdfdff",
      width: "100%",
      height: 150,
      backgroundColor: "#313130ff",
      borderRadius: 20,
      marginVertical: 30,
      fontWeight:"bold",
      justifyContent: "center", 
      alignItems: "center",    
      display: "flex",
      textAlign: "center", 
      
  },
  container: {
    padding: 10,
    backgroundColor: "#313130ff",
    borderRadius: 20,
    marginVertical: 30,
  },
  title: {
    color: "white",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "900",
  },
  item: {
    backgroundColor: "#1b1b1be1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
    
  },
  itemLeft: {
    gap: 3,
  },
  itemImage: {
    width: 30,
    height: 30,
  },
  itemTipo: {
    fontSize: 12 ,
    color: "white",
    fontWeight: "bold",
  },
  itemRight: {
    gap: 3,
  },
  itemValor: {
    fontSize: 14,
    color: "white",
  },
  itemData: {
    fontSize: 12,
    color: "#7a7878ff",
  },
  itemChevron: {
    width: 30,
    height: 30,
    tintColor: "white",
    marginTop: 20,
  },
  itemDesc:{
    fontSize:10,color:"#7a7878ff"
  },
   pressed: {
    opacity: 0.7,
  },
  
});
