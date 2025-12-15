import { View, Text, StyleSheet } from "react-native";

export type InsightType = "ALERTA" | "ATENCAO" | "POSITIVO";

export interface Insight {
  id: string;
  tipo: InsightType;
  mensagem: string;
}

interface Props {
  insight?: Insight | null;
  loading?: boolean;
}

export function InsightChip({ insight, loading }: Props) {
  
  if (loading) {
    return <View style={styles.skeleton} />;
  }

  // SEM INSIGHT → espaço vazio (mas EXISTE)
  if (!insight) {
    return <View style={styles.placeholder} />;
  }

  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{insight.mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    backgroundColor: "#313130ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginVertical: 30,
    minHeight: 40,
    justifyContent: "center",
  },

  text: {
    fontSize: 13,
    color: "#92400E",
    fontWeight: "bold",
    textAlign: "center",
  },

  skeleton: {
    alignSelf: "center",
    width: "90%",
    height: 40,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    marginVertical: 30,
  },

  placeholder: {
    height: 40,
    marginVertical: 20,
  },
});

