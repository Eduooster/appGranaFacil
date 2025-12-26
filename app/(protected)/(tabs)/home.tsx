// app/(protected)/home.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import BalancoSaldoBoxs from "@/components/BalancoSaldoBoxs";
import { Insight, InsightChip } from "@/components/Insights";
import MesesCarousel from "@/components/MesesCarousel";
import Metas from "@/components/Metas";
import PluggyConnectScreen from "@/components/PluggyConnectionScreen";
import PrincipaisMovimentacoes from "@/components/PrincipaisMovimentacoes";
import { useAuth } from "@/context/AuthContext";
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



function fetchHomeMock({ mes }: MesContexto): Promise<HomeData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mes === 11) {
        resolve({
          receita: 0,
          despesa: 3100,
          variacao: 12,
          insight: null,
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
        receita: 0,
        despesa: 0,
        variacao: 5,
        insight: null,
        movimentacoes: [],
      });
    }, 600);
  });
}


export default function HomeScreen() {
  console.log("home renderizou")
  const router = useRouter();

  const [mes, setMes] = useState<MesContexto>(getMesAtual());
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth()
  const hoje = new Date();
  const [pluggyOptIn, setPluggyOptIn] = useState<boolean | undefined>(undefined);
  const isMesAtual =
  mes.mes === hoje.getMonth() + 1 &&
  mes.ano === hoje.getFullYear();
  const ultimoMesCarregado = useRef<MesContexto | null>(null);

      useEffect(() => {
         console.log("HOME MONTADA");
      if (
        ultimoMesCarregado.current?.mes === mes.mes &&
        ultimoMesCarregado.current?.ano === mes.ano
      ) {
        return () => console.log("HOME DESMONTADA");
      }

      setLoading(true);

      fetchHomeMock(mes).then((response) => {
        setData(response);
        setLoading(false);
        ultimoMesCarregado.current = mes;
      });
    }, [mes.mes, mes.ano]);
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
   function responderPluggy(optIn: boolean) {
    setPluggyOptIn(optIn);
    console.log("Usuário respondeu:", optIn ? "Aceitou conectar" : "Não quis conectar");
   
   
  }

 

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#020202e0" }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      
      <LinearGradient
  colors={['#4e09a8ff', 'rgba(74, 74, 75, 0)']}
  style={styles.header}
>
 
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Pressable onPress={() => router.navigate("/profile")} style={styles.iconRow}>
            <Ionicons name="person-outline" size={28} color="#fff" />
          </Pressable>

          <Text style={{ paddingRight: 25, color: "#fff", fontWeight: "400" }}>
            {`Olá, ${user?.email}\n${saudacaoDoDia()} !`}
          </Text>

          <Pressable onPress={() => router.push("/profile")} style={{ paddingHorizontal: 10 }}>
            <Ionicons name="notifications" size={28} color="#fff" />
          </Pressable>
        </View>

        <View style={{ marginTop: 20 }}>
          <MesesCarousel
            mesAtual={mes}
            onChangeMes={setMes}
            receita={data?.receita ?? 0}
            despesa={data?.despesa ?? 0}
          />
        </View>
      </LinearGradient>
      <View style={styles.container}>
          {pluggyOptIn === undefined && (
        <View style={styles.card}>
          <Text style={styles.text}>Quer conectar sua conta com a Pluggy? É seguro e rápido!</Text>
          <View style={styles.buttons}>
            
          
            <Pressable style={styles.button}onPress={()=> router.navigate("/pluggyInformations")}>
               <Text style={{color:'#f0f0f0ff'}}>Saiba mais</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=> responderPluggy(false)}>
              <Text style={{color:'#f0f0f0ff'}}>Não Obrigado! </Text>
            </Pressable>
          </View>
        </View>
      )}

    </View>

      <View style={{ minHeight: 62 }}>
          {data?.insight ? (
          <InsightChip
            insight={data.insight}
            loading={loading}
          />
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 1,color:"white" }}>
            Sem insights esse mês
          </Text>
        )}
        </View>
      
      <View style={styles.content}>
       <BalancoSaldoBoxs
        receita={data?.receita}
        despesa={data?.despesa}
        variacao={data?.variacao}
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
   container: { flex: 1, justifyContent: "center", padding: 24 },
  card: { padding: 16, margin: 16, backgroundColor: "#2b2b2bff", borderRadius: 8 },
  text: { fontSize: 16, marginBottom: 12,color:"#fff" },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  button:{
    backgroundColor: "#4e09a8ab",
  flexDirection: 'row',
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  
  }
});
