import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  receita: number;
  despesa: number;
  variacao: number;
  loading: boolean;
}

export default function BalancoSaldoBoxs({
  receita,
  despesa,
  variacao,
  loading,
}: Props) {
  const router = useRouter();

  function goToTopReceitas() {
    router.push("/top-receitas");
  }

 

  return (
    <View style={styles.summaryRow}>
      {/* Receita */}
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
        <Text style={[styles.value, { color: "green" }]}>
          R$ {receita.toFixed(2)}
        </Text>
      </Pressable>

      {/* Despesa */}
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
        <Text style={[styles.value, { color: "red" }]}>
          R$ {despesa.toFixed(2)}
        </Text>
      </Pressable>

      {/* Variação */}
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
            color={variacao >= 0 ? "green" : "red"}
            style={styles.icon}
          />
        </View>
        <Text style={[styles.value, { color: variacao >= 0 ? "green" : "red" }]}>
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
    marginTop: 20,
  },
  box: {
    width: "30%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  boxHeader: {
    flexDirection: "row",
    alignItems: "center",
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
});
