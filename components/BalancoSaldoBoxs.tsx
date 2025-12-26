import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  receita?: number | null;
  despesa?: number | null;
  variacao?: number | null;
  loading: boolean;
};


export default function BalancoSaldoBoxs({
  receita,
  despesa,
  variacao,
  loading,
}: Props) {
  const router = useRouter();
  const corVariacao =
  variacao !== null && variacao !== undefined && variacao >= 0
    ? "#6ece6ac0"
    : "#b63d3dea";

  if(loading){
    return (
    <View style={styles.boxHeader}>
      <View style={styles.boxSkeleton}>

      </View>
      <View style={styles.boxSkeleton}>
        
      </View>
      <View style={styles.boxSkeleton}>
        
      </View>

    </View>);
  }

  

  function goToTopReceitas() {
    router.push("/top-receitas");
  }

 

 

  return (
    <View style={styles.summaryRow}>
      
      <Pressable
        style={({ pressed }) => [
          styles.box,
          pressed && styles.pressed,
        ]}
        onPress={goToTopReceitas}
      >
        <View style={styles.boxHeader}>
          <Text style={styles.label}>Receita</Text>
          <Ionicons name="arrow-up" size={18} color="green" style={styles.icon} />
        </View>
        {receita !== null && receita !== undefined && (
        <Text style={[styles.value, { color: "#6ece6ac0" }]}>
          R$ {receita.toFixed(2)}
        </Text>
        
      )}
        
      </Pressable>

      
      <Pressable
        style={({ pressed }) => [
          styles.box,
          pressed && styles.pressed,
        ]}
        
      >
        <View style={styles.boxHeader}>
          <Text style={styles.label}>Despesa</Text>
          <Ionicons name="arrow-down" size={18} color="red" style={styles.icon} />
        </View>
        <Text style={[styles.value, { color: "#b63d3dea" }]}>
          R$ {despesa?.toFixed(2)}
        </Text>
      </Pressable>

     
      <Pressable
        style={({ pressed }) => [
          styles.box,
          pressed && styles.pressed,
        ]}
        
      >
        <View style={styles.boxHeader}>
          <Text style={styles.label}>Variação</Text>
          <Ionicons
            name="swap-vertical"
            size={18}
            color={corVariacao}
            style={styles.icon}
          />
        </View>
        <Text style={[styles.value, {color:corVariacao}]}>
          {variacao}%
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  box: {
    backgroundColor: "#111111de",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#69686893",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  boxHeader: {
    flexDirection: "row",
    alignItems: "center",
     marginTop: 20,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
  },
  icon: {
    marginLeft: 4, // seta colada do texto
  },
  value: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  skeleton: {
  backgroundColor: "#111111de",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#69686893",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 4,
  },
  boxSkeleton: {
    backgroundColor: "#111111de",
    borderRadius: 12,
    padding: 31,
    flex: 1,
    marginHorizontal: 4,
    
  
  }
});
