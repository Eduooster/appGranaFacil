// app/(protected)/home.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import MesesCarousel from "@/components/MesesCarousel";
import BalancoSaldoBoxs from "@/components/BalancoSaldoBoxs";
import PrincipaisMovimentacoes from "@/components/PrincipaisMovimentacoes";
import { Insight, InsightChip } from "@/components/Insights";

type MesContexto = {
  mes: number;
  ano: number;
};

type HomeData = {
  receita: number;
  despesa: number;
  variacao: number;
  insight: Insight | null;
  movimentacoes: any[];
};

export type Movimentacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  data: string;
};

function getMesAtual(): MesContexto {
  const now = new Date();
  return {
    mes: now.getMonth() + 1,
    ano: now.getFullYear(),
  };
}

// MOCK (backend depois)
// home.mock.ts (ou dentro do home.tsx)
function fetchHomeMock({ mes }: MesContexto): Promise<HomeData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mes === 11) {
        resolve({
          receita: 5200,
          despesa: 3100,
          variacao: 12,
          insight: {
            id: "1",
            tipo: "ALERTA",
            mensagem: "Você já usou 82% do orçamento de Delivery este mês.",
          },
          movimentacoes: [
            {
              id: "1",
              descricao: "Salário",
              valor: 5200,
              tipo: "RECEITA",
              data: "2025-11-05",
            },
            {
              id: "2",
              descricao: "iFood",
              valor: -120,
              tipo: "DESPESA",
              data: "2025-11-10",
            },
            {
              id: "3",
              descricao: "Mercado",
              valor: -450,
              tipo: "DESPESA",
              data: "2025-11-18",
            },
          ],
        });
        return;
      }

      if (mes === 12) {
        resolve({
          receita: 7800,
          despesa: 6900,
          variacao: -8,
          insight: {
            id: "2",
            tipo: "ATENCAO",
            mensagem: "Gastos elevados em Dezembro devido a festas.",
          },
          movimentacoes: [
            {
              id: "4",
              descricao: "Freelance",
              valor: 1800,
              tipo: "RECEITA",
              data: "2024-12-03",
            },
            {
              id: "5",
              descricao: "Ceia de Natal",
              valor: -980,
              tipo: "DESPESA",
              data: "2024-12-24",
            },
            {
              id: "6",
              descricao: "Ceia de Natal",
              valor: -980,
              tipo: "DESPESA",
              data: "2024-12-24",
            },
            {
              id: "7",
              descricao: "Ceia de Natal",
              valor: -980,
              tipo: "DESPESA",
              data: "2024-12-24",
            }
          ],
        });
        return;
      }

      resolve({
        receita: 4100,
        despesa: 2700,
        variacao: 5,
        insight: {
          id: "3",
          tipo: "POSITIVO",
          mensagem: "Bom controle financeiro neste mês.",
        },
        movimentacoes: [],
      });
    }, 600);
  });
}


export default function HomeScreen() {
  const router = useRouter();

  const [mes, setMes] = useState<MesContexto>(getMesAtual());
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const hoje = new Date();
  const isMesAtual =
  mes.mes === hoje.getMonth() + 1 &&
  mes.ano === hoje.getFullYear();
  useEffect(() => {
    setLoading(true);

    fetchHomeMock(mes).then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [mes]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#000" }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconRow}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </View>

        <View style={styles.carouselWrapper}>
          <MesesCarousel
            mesAtual={mes}
            onChangeMes={setMes}
          />
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
       <BalancoSaldoBoxs
          receita={data?.receita ?? 0}
          despesa={data?.despesa ?? 0}
          variacao={data?.variacao ?? 0}
          loading={loading}
        />

        {/* Reserva espaço para não "pular" */}
        <View style={{ minHeight: 64 }}>
          <InsightChip
            insight={data?.insight}
            loading={loading}
          />
        </View>

        <PrincipaisMovimentacoes
         items={data?.movimentacoes ?? []}
        loading={loading}
        isMesAtual={isMesAtual}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4e09a8ff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  carouselWrapper: {
    marginTop: 12,
    marginHorizontal: 40,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
