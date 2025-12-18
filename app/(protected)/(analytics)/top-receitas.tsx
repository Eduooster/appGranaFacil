import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type ReceitaCategoria = {
  id: string;
  nome: string;
  total: number;
};

const MOCK_RECEITAS: ReceitaCategoria[] = [
  { id: "1", nome: "Salário", total: 5200 },
  { id: "2", nome: "Freelance", total: 1800 },
  { id: "3", nome: "Rendimentos", total: 600 },
  { id: "4", nome: "Reembolsos", total: 350 },
  { id: "5", nome: "Outros", total: 150 },
];

export default function TopReceitasScreen() {
  const router = useRouter();

  function goToHome(){
    router.push("/home")
  }

  const totalReceitas = MOCK_RECEITAS.reduce(
    (acc, item) => acc + item.total,
    0
  );

  return (
    <View style={styles.container}>
      

            <Pressable
        style={({ pressed }) => [
            styles.box,
            pressed && styles.pressed,
        ]}
        onPress={goToHome}
        >
        <Ionicons
            name="chevron-back"
            size={24}
            color="#fff"
        />
</Pressable>
     <Text style={styles.title}>Top Receitas do Mês</Text>
      <FlatList
        data={MOCK_RECEITAS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => {
          const percentual = Math.round(
            (item.total / totalReceitas) * 100
          );

          return (
            <View style={styles.row}>
              <View style={styles.rowHeader}>
                <Text style={styles.category}>{item.nome}</Text>
                <Text style={styles.value}>
                  R$ {item.total.toLocaleString("pt-BR")}
                </Text>
              </View>

              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${percentual}%` },
                  ]}
                />
              </View>

              <Text style={styles.percentual}>
                {percentual}% do total de receitas
              </Text>

              
            </View>

            

            
          );
        }}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
    alignSelf:"center"
  },
   box: {
  alignSelf: "flex-start",
  marginBottom: 30,
  paddingTop:32
  

  },

  pressed: {
    opacity: 0.7,
  },

  row: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 14,
  },

  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  category: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  value: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "600",
  },

  barBackground: {
    height: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 4,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#4ade80",
  },

  percentual: {
    marginTop: 6,
    fontSize: 12,
    color: "#aaa",
  },
});

