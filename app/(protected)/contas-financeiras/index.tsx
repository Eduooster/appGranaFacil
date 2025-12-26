import { useAuth } from "@/context/AuthContext";
import { buscarContasFinanceiras } from "@/services/contaFinanceiraService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";

type ContaFinanceira = {
  id: string;
  name: string;
  balanceInCents: number;
  institutionName: string;
};

export default function ContasFinanceiras() {
  const [contas, setContas] = useState<ContaFinanceira[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function carregarContas() {
      try {
        if (!authToken) throw new Error("Token não encontrado");
        const data = await buscarContasFinanceiras(authToken);
        if (isMounted) setContas(data);
      } catch (err) {
        if (isMounted) setError("Não foi possível carregar suas contas");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    carregarContas();
    return () => { isMounted = false; };
  }, [authToken]);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Ionicons style={{ marginVertical: 30 }} name="arrow-back" size={26} color="#fff" />
        </Pressable>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.infoText}>Carregando contas...</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={[styles.infoText, { color: "#dc2626" }]}>{error}</Text>
          </View>
        ) : (
          contas.map((conta) => {
            const saldo = conta.balanceInCents / 100;
            const letraBanco = conta.name.charAt(0).toUpperCase();

            return (
              <View key={conta.id} style={styles.card}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{letraBanco}</Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.name}>{conta.name}</Text>
                  <Text style={styles.institution}>{conta.institutionName}</Text>
                </View>

                <Text style={[styles.balance, saldo < 0 ? styles.negative : styles.positive]}>
                  {saldo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  infoText: {
    color: "#fff",
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    borderRadius: 12,
    backgroundColor: "#1f2937",
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  institution: {
    fontSize: 13,
    color: "#9ca3af",
  },
  balance: {
    fontWeight: "600",
    fontSize: 16,
  },
  positive: {
    color: "#22c55e",
  },
  negative: {
    color: "#ef4444",
  },
});