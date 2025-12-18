import { View, Text, StyleSheet, Pressable } from "react-native";

interface Meta {
  id: string;
  nome: string;
  valorAtual: number;
  valorMeta: number;
  prazo: string;
}

interface Props {
  metas: Meta[];
  onPressMeta?: (meta: Meta) => void;
}

export default function Metas({ metas, onPressMeta }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Metas</Text>

      {metas.map((item) => {
        const progresso = Math.min(item.valorAtual / item.valorMeta, 1);

        return (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => onPressMeta && onPressMeta(item)}
          >
            <Text style={styles.nome}>{item.nome}</Text>

            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progresso * 100}%` }
                ]}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.valor}>
                R$ {item.valorAtual.toFixed(2)} / R$ {item.valorMeta.toFixed(2)}
              </Text>
              <Text style={styles.prazo}>{item.prazo}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#313130ff",
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1b1b1be1",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  nome: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#555",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#600f70ff",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valor: {
    fontSize: 12,
    color: "#ddd",
  },
  prazo: {
    fontSize: 12,
    color: "#ddd",
  },
});