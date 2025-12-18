// app/(protected)/home.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import MesesCarousel from "@/components/MesesCarousel";
import BalancoSaldoBoxs from "@/components/BalancoSaldoBoxs";
import PrincipaisMovimentacoes from "@/components/PrincipaisMovimentacoes";
import { Insight, InsightChip } from "@/components/Insights";
import Metas from "@/components/Metas";
import { useAuth } from "@/context/AuthContext";
import MesesCarouselFull from "@/components/MesesCarouselFull";
import { LinearGradient } from 'expo-linear-gradient';

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

const metasMock = [
    {
      id: "1",
      nome: "Fundo de Emergência",
      valorAtual: 1200,
      valorMeta: 5000,
      prazo: "30/12/2025",
    },
    {
      id: "2",
      nome: "Viagem de Férias",
      valorAtual: 800,
      valorMeta: 3000,
      prazo: "15/01/2026",
    },
    {
      id: "3",
      nome: "Novo Celular",
      valorAtual: 400,
      valorMeta: 1500,
      prazo: "31/12/2025",
    },
  ];


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
  const {user} = useAuth()
  const hoje = new Date();
  const isMesAtual =
  mes.mes === hoje.getMonth() + 1 &&
  mes.ano === hoje.getFullYear();
  useEffect(() => {
  setLoading(true);
  setData(null); // <--- Adicione isso para forçar o skeleton
  
  fetchHomeMock(mes).then((response) => {
    setData(response);
    setLoading(false);
  });
}, [mes]);
  function saudacaoDoDia() {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#020202e0" }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      
      <LinearGradient
  colors={['#4e09a8ff', '#4e09a800']}
  style={styles.header}
>
 
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Pressable onPress={() => router.push("/profile")} style={styles.iconRow}>
            <Ionicons name="person-outline" size={28} color="#fff" />
          </Pressable>

          <Text style={{ paddingRight: 25, color: "#fff", fontWeight: "400" }}>
            {`Olá, ${user?.email}\n${saudacaoDoDia()} !`}
          </Text>

          <Pressable onPress={() => router.push("/profile")} style={{ paddingHorizontal: 10 }}>
            <Ionicons name="notifications" size={28} color="#fff" />
          </Pressable>
        </View>

        {/* Linha do carousel */}
        <View style={{ marginTop: 20 }}>
          <MesesCarousel
            mesAtual={mes}
            onChangeMes={setMes}
            receita={data?.receita ?? 0}
            despesa={data?.despesa ?? 0}
          />
        </View>
      </LinearGradient>

      <View style={{ minHeight: 100 }}>
          <InsightChip
            insight={data?.insight}
            loading={loading}
          />
        </View>
      
      <View style={styles.content}>
       <BalancoSaldoBoxs
          receita={data?.receita ?? 0}
          despesa={data?.despesa ?? 0}
          variacao={data?.variacao ?? 0}
          loading={loading}
        />

       
        
        <View style={{minHeight:100}}>


       
            <PrincipaisMovimentacoes
            items={data?.movimentacoes ?? []}
            loading={loading}
            isMesAtual={isMesAtual}
            />
         </View>

        <Metas metas={metasMock}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
   
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomEndRadius:10
  ,borderBottomStartRadius:20,minHeight: 150,
  },

  iconRow: {
    flexDirection: "row",
  
    alignItems: "center",
    justifyContent:"center",
    backgroundColor:"#473647ff",
    height:43,
    width:43,borderRadius:100
  },

  carouselWrapper: {
    marginTop: 1,
    marginHorizontal: 35,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
