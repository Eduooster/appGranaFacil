import { View,Text ,Image} from "react-native";

 
               

export default function BalancoSaldo (){
    return (<>

        <View style={{
  flexDirection: "row",
  gap: 16,
  marginTop: 20,
  width: 375,
  alignSelf: "center",
  justifyContent: "space-between"
}}>

  {/* CARD 1 */}
  <View
    style={{
      width: 150,
      backgroundColor: "#4e09a8ff",
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 20,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ fontSize: 14, color: "white", marginRight: 4 ,fontWeight:"bold"}}>
        Receita
      </Text>

      <Image
        source={require("@/assets/images/arrows.png")}
        style={{ width: 38, height: 38, tintColor: "green" }}
      />
    </View>

    <Text
      style={{
        marginTop: 4,
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
      }}
    >
      R$ 1.200,00
    </Text>
  </View>

  {/* CARD 2 */}
  <View
    style={{
      width: 150,
      backgroundColor: "#4e09a8ff",
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 20,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ fontSize: 14, color: "white", marginRight: 4 ,fontWeight:"bold"}}>
        Despesa
      </Text>

      <Image
        source={require("@/assets/images/arrow-b.png")}
        style={{ width: 38, height: 38, tintColor: "red" }}
      />
    </View>

    <Text
      style={{
        marginTop: 4,
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
      }}
    >
      R$ 800,00
    </Text>
  </View>

</View>


    
    </>)
}