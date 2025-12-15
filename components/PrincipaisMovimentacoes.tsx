import { Movimentacao } from "@/app/(protected)/(tabs)/home";
import { View ,Text,Image,StyleSheet} from "react-native";



interface Props {
  items: Movimentacao[];
  loading: boolean;
  isMesAtual: boolean;
}

export default function MovimentacoesRecentes(
  {items,
  loading,
   isMesAtual
}: Props
){
    if (loading) {
    return <View style={styles.skeleton} />;
  }

  if (items.length === 0) {
    return (
      <Text style={{ color: "#aaa", marginTop: 16 }}>
        Nenhuma movimentação neste mês
      </Text>
    );
  }

    return (
      

     <View style={{ padding: 20, backgroundColor: "#252525ff", borderRadius: 20 }}>
      <Text
        style={{
          color: "white",
          marginTop: 30,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {isMesAtual ? "Movimentações recentes" : "Principais movimentações"}
      </Text>

      {items.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#8080805d",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 10 }}>
            <Image
              source={require("@/assets/images/image-removebg-preview (1).png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
              {item.tipo}
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 14, color: "white" }}>
              R$ {item.valor.toFixed(2)}
            </Text>
            <Text style={{ fontSize: 12, color: "#ddd" }}>{item.data}</Text>
          </View>

          <Image
            source={require("@/assets/images/chevron.png")}
            style={{ width: 30, height: 30, tintColor: "white", marginTop: 20 }}
          />
        </View>
      ))}
    </View>
    )
}

const styles = StyleSheet.create({

skeleton: {
    alignSelf: "center",
    width: "90%",
    height: 600,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    marginVertical: 30,
  }
})