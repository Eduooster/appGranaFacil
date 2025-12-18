import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatarMesAno } from "@/utils/formatarMesAno";

type MesContexto = {
  mes: number; // 1-12
  ano: number;
};

interface Props {
  mesAtual: MesContexto;
  onChangeMes: (novoMes: MesContexto) => void;
  receita:number,
  despesa: number;
}

export default function MesesCarousel({
  mesAtual,
  onChangeMes,
  receita,despesa
} : Props) {
  const fade = useRef(new Animated.Value(1)).current;
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  const handleChange = (direcao: "prev" | "next") => {
    let { mes, ano } = mesAtual;

    if (direcao === "prev") {
      mes--;
      if (mes === 0) {
        mes = 12;
        ano--;
      }
    }

    if (direcao === "next") {
      mes++;
      if (mes === 13) {
        mes = 1;
        ano++;
      }
    }

    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    onChangeMes({ mes, ano });
  };

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleChange("prev")}>
                    <Ionicons name="chevron-back-circle-outline" size={30} color="white" />
                </TouchableOpacity>

                <View style={styles.mesContainer}>
                    <Animated.Text style={[styles.mesTexto, { opacity: fade }]}>
                    {formatarMesAno(mesAtual)}
                    </Animated.Text>

                    <Text style={{color:"white",fontSize:30,fontWeight:"bold"}}>
                    R$ {receita}
                    </Text>

                    <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
                    <Ionicons
                        name={mostrarSaldo ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="white"
                    />
            </TouchableOpacity>
                </View>

            <TouchableOpacity onPress={() => handleChange("next")}>
                <Ionicons name="chevron-forward-circle-outline" size={30} color="white" />
            </TouchableOpacity>
       </View>

      <View style={styles.saldosContainer}>
        <View >
            <Text style={styles.textSaldo}>Receita
                <Ionicons name="arrow-up" size={18} color="green" />
                 </Text>
                <Text style={[styles.textSaldo,styles.textSaldoReceita]}>R$ {receita.toFixed(2)}</Text>
        </View>

       
        <View>
            <Text style={styles.textSaldo}>Despesa <Ionicons name="arrow-down" size={18} color="red" /></Text>
            <Text style={[styles.textSaldo,styles.textSaldoDespesa]}>R${despesa.toFixed(2)}</Text>
        </View>
        
      </View>

      
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,

  },
  mesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mesTexto: {
    fontSize: 20,
    fontWeight: "300",
    color: "white",
    marginBottom: 10,
  },
  saldo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginTop: 5,
  },
  saldosContainer:{
    marginTop:15,
    width:'100%',
    flexDirection:"row",
    justifyContent:"space-between"
  },
  textSaldo:{
    color:"white",fontWeight:"bold",fontSize:20
  },
  textSaldoReceita:{
        color:"green"
  },
  textSaldoDespesa:{
    color:"red"
  }
});
